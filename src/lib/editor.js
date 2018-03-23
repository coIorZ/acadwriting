/*
 * This file manually manipulate DOM of contenteditable div '#editor'.
 * The reason behind this is that everytime user types a word and React rerenders the contenteditable, the caret jumps to the start.
 * One solution is to stop rerendering when user inputs, but only allows rerendering if the content changes programmatically.
 * In other words, leave user input to DOM and stay out of the way.
 * It works if all you need is simply typing words.
 * However, our editor here is not just about typing words, but should be able to reformat and highlight text inside it.
 * So the problem here is: how to make children of contenteditable React components while enabling normal user input.
 * Unfortunately I could not find a way to achieve it. If you have any ideas, please let me know :).
 *
 * I wrote this file to encapsulate all the methods needed to manipulate editor DOM and put all the side-effects here,
 * so that components do not have to know about this, they dispatch actions just like before.
 * The rest of the website is still controlled by React.
 *
 */
import { splitToSentences } from './utils';

const MAX_MARKER_LENGTH = 120;

// collections of editors, if you somehow need multiple editors.
let editors = {};

// export the instance of editor
// DOM may not be ready when called, check if the contenteditable actually exists
export default (id = 'editor') => {
  if(editors[id] && editors[id]._el) return editors[id];
  editors[id] = new Editor(document.querySelector(`#${id}`));
  return editors[id];
};

function Editor(el) {
  this._el = el;
}

Editor.prototype.html = function(val) {
  if(!this._el) return this;
  if(val == null) return this._el.innerHTML;
  this._el.innerHTML = val || '<p><br></p>';
  return this;
};

Editor.prototype.text = function() {
  if(!this._el) return this;
  return this._el.textContent;
};

// If text is empty, add <p><br></p>
// This is the most tricky part in contenteditable.
// User input will be nicely formatted in <p> and you basically need to do nothing.
// Otherwise, it will cost you quite some effort to do the formatting yourself.
Editor.prototype.safe = function() {
  if(!this._el) return this;
  if(!this.text()) {
    this.html('<p><br></p>');
  }
};

// when user pastes a blob of words with styles
// the styles will also be pasted in contenteditable, which I definitely do not want
// prevent this default DOM behaviour, then insert and format clipboard text manually
Editor.prototype.paste = function(e) {
  if(!this._el) return this;
  e.preventDefault();
  const text = e.clipboardData.getData('text');
  if(!text) return;
  const textArr = text.split('\n').filter(Boolean);
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(textArr.shift()));
  textArr.forEach(t => {
    const node = document.createElement('p');
    node.appendChild(document.createTextNode(t));
    this._el.appendChild(node);
  });
  sel.empty();
  return this;
};

// will analyze all the sections of the document
// output of analysis will be 
// 1. id relations between matched sentences, markers, moves and steps, which will be stored in Redux.
// 2. actual HTML strings to be displayed on page(underlined match, highlighted key words)
Editor.prototype.analyze = function({ markers, moves, document, sectionId }) {
  if(!this._el) return this;
  let resBody = {}, resAnalysis = {};
  const { body } = document;
  const range = new window.Range();
  Object.keys(body).forEach(key => {
    const node = range.createContextualFragment(body[key]);
    const res = _analyze({ node, markers, moves, sectionId: key });
    resBody[key] = res.html;
    resAnalysis[key] = res.analysis;
  });
  this.html(resBody[sectionId]);
  return {
    analysis : resAnalysis,
    body     : resBody,
  };
};

function _analyze({ node, markers, moves, sectionId }) {
  let analysis = {
    sentences : {},
    moves     : {},
    steps     : {},
    markers   : {},
  };
  let html = '';
  let sentenceId = 1;
  Array.from(node.children).forEach(n => {
    let para = n.textContent;
    let sentences = splitToSentences(para);
    sentences = sentences.map(text => {
      let matches = [];
      let htmlStr = '';
      Object.keys(moves).forEach(moveId => {
        const move = moves[moveId];
        if(move.sectionId != sectionId) return;
        Object.keys(move.steps).forEach(stepId => {
          const step = move.steps[stepId];
          Object.keys(step.markers).forEach(markerId => {
            const { fullMarker, confidence } = markers[markerId];
            if(isMatch(text, fullMarker)) {
              matches.push({ markerId, stepId, moveId, confidence });
              analysis.markers[markerId] = analysis.markers[markerId] || [];
              !analysis.markers[markerId].includes(sentenceId) && analysis.markers[markerId].push(sentenceId);
              analysis.moves[moveId] = analysis.moves[moveId] || [];
              !analysis.moves[moveId].includes(sentenceId) && analysis.moves[moveId].push(sentenceId);
              analysis.steps[stepId] = analysis.steps[stepId] || [];
              !analysis.steps[stepId].includes(sentenceId) && analysis.steps[stepId].push(sentenceId);
            }
          });
        });
      });
      matches.sort((a, b) => b.confidence - a.confidence);
      if(matches.length) {
        const { fullMarker, id } = markers[matches[0].markerId];
        htmlStr = generateSentenceHtml(text, fullMarker, id, sentenceId);
        analysis.sentences[sentenceId] = matches;
      } else {
        htmlStr = `<span class='sentence' data-sentence-id='${sentenceId}'>${text}</span>`;
      }
      sentenceId++;
      return htmlStr;
    });
    html += `<p>${sentences.join('')}</p>`;
  });
  return { analysis, html };
}

function isMatch(text, marker) {
  const regex = new RegExp(marker, 'i');
  const match = text.match(regex);
  return match && match[0] && match[0].length <= MAX_MARKER_LENGTH;
}

function generateSentenceHtml(str, regStr, markerId, sentenceId) {
  var match = str.match(new RegExp(regStr, 'i'));
  var { index, input, ...captures } = match;
  var matchLen = captures['0'].length;
  var matchStr = str.substr(index, matchLen);
  Object.keys(captures).forEach(k => {
    if(k == 0) return;
    const keyword = captures[k];
    if(!keyword) return;
    if(k == 1) {
      matchStr = matchStr.replace(keyword, m => `<span class='marker' data-marker-id='${markerId}'>${m}</span>`);
    } else {
      //matchStr = matchStr.replace(new RegExp(captures[k]), m => `<span class='marker' data-marker-id='${markerId}'>${m}</span>`);
      matchStr = replaceKeyword(matchStr, keyword, markerId);
    }
  });
  return `<span class='sentence' data-sentence-id='${sentenceId}' data-marker-id='${markerId}'>${str.substr(0, index)}<span class='match'>${matchStr}</span>${str.substr(index + matchLen, str.length - index - matchLen)}</span>`;
}

function replaceKeyword(str, keyword, markerId) {
  const index = str.lastIndexOf(keyword);
  const keywordLen = keyword.length;
  return `${str.substr(0, index)}<span class='marker' data-marker-id='${markerId}'>${keyword}</span>${str.substr(index + keywordLen, str.length - index - keywordLen)}`;
}

Editor.prototype.clearAnalysis = function() {
  if(!this._el) return this;
  Array.from(this._el.children).forEach(node => {
    node.innerHTML = node.textContent;
  });
  return this;
};

Editor.prototype.click = function(e) {
  if(!this._el) return this;
  const sentenceId = this.sentenceId(e);
  if(!sentenceId) return this;
  Array.from(this._el.children).forEach(pNode => {
    Array.from(pNode.children).forEach(sNode => {
      const id = Number(sNode.getAttribute('data-sentence-id'));
      if(sentenceId === id) {
        sNode.classList.add('active');
      } else {
        sNode.classList.remove('active');
      }
    });
  });
  return this;
};

Editor.prototype.sentenceId = function(e) {
  const node = e.target;
  if(node.classList.contains('sentence')) return Number(node.getAttribute('data-sentence-id'));
  if(node.classList.contains('match')) return Number(node.parentNode.getAttribute('data-sentence-id'));
  if(node.classList.contains('marker')) return Number(node.parentNode.parentNode.getAttribute('data-sentence-id'));
};

Editor.prototype.highlightSentences = function(ids) {
  if(!this._el) return this;
  Array.from(this._el.children).forEach(pNode => {
    Array.from(pNode.children).forEach(sNode => {
      if(ids.includes(Number(sNode.getAttribute('data-sentence-id')))) {
        sNode.classList.add('active');
      } else {
        sNode.classList.remove('active');
      }
    });
  });
};
