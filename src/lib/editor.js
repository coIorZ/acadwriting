import { splitToSentences } from './utils';

let editors = {};

export default (id = 'editor') => {
  if(editors[id] && editors[id]._el) return editors[id];
  editors[id] = new Editor(document.querySelector(`#${id}`));
  return editors[id];
};

function Editor(el) {
  this._el = el;
  this.selectedSentence = null;
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

// if text is empty, add <p><br></p> to contenteditable
Editor.prototype.safe = function() {
  if(!this._el) return this;
  if(!this.text()) {
    this.html('<p><br></p>');
  }
};

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
  this.selectedSentence = null;
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
            const regex = new RegExp(fullMarker, 'i');
            if(regex.test(text)) {
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
        const { fullMarker } = markers[matches[0].markerId];
        htmlStr = `<span class='sentence' data-sentence-id='${sentenceId}'>${text.replace(new RegExp(fullMarker, 'i'), match => `<span class='sentence-match'>${match}</span>`)}</span>`;
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

Editor.prototype.clearAnalysis = function() {
  if(!this._el) return this;
  Array.from(this._el.children).forEach(node => {
    node.innerHTML = node.textContent;
  });
  return this;
};

Editor.prototype.click = function(e) {
  if(!this._el) return this;
  let node = e.target;
  if(node.classList.contains('match')) {
    node = node.parentNode;
  }
  if(!node.classList.contains('sentence')) return this;
  Array.from(this._el.children).forEach(pNode => {
    Array.from(pNode.children).forEach(sNode => {
      sNode.classList.remove('active');
    });
  });
  node.classList.add('active');
  this.selectedSentence = node;
  return this;
};

Editor.prototype.selectedSentenceId = function() {
  return this.selectedSentence && this.selectedSentence.getAttribute('data-sentence-id');
};
