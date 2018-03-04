import { splitToSentences } from './utils';

let editors = {};

export default (id = 'editor') => {
  if(editors[id] && editors[id]._el) return editors[id];
  editors[id] = new Editor(document.querySelector(`#${id}`));
  return editors[id];
};

function Editor(el) {
  this._el = el;
  this.data = [];
}

Editor.prototype.html = function(val) {
  if(!this._el) return this;
  if(val == null) return this._el.innerHTML;
  this._el.innerHTML = val;
  return this;
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
  range.insertNode(document.createTextNode(textArr.pop()));
  textArr.forEach(t => {
    const node = document.createElement('p');
    node.appendChild(document.createTextNode(t));
    this._el.appendChild(node);
  });
  sel.empty();
  return this;
};

Editor.prototype.analyze = function(markers) {
  if(!this._el) return this;
  this.data = [];
  Array.from(this._el.children).forEach(node => {
    let para = node.textContent;
    let sentences = splitToSentences(para);
    sentences = sentences.map(text => {
      let matches = [];
      let html = '';
      Object.keys(markers).forEach(key => {
        const { id, fullMarker, confidence } = markers[key];
        const regex = new RegExp(fullMarker, 'i');
        if(regex.test(text)) {
          matches.push({ id, confidence });
        }
      });
      matches.sort((a, b) => b.confidence - a.confidence);
      if(matches[0]) {
        const { id, fullMarker } = markers[matches[0].id];
        html = `<span class='sentence' data-marker-id='${id}'>${text.replace(new RegExp(fullMarker, 'i'), match => `<span class='marker'>${match}</span>`)}</span>`;
      } else {
        html = `<span class='sentence'>${text}</span>`;
      }
      return {
        matches,
        html,
      };
    });
    this.data.push(sentences);
    node.innerHTML = sentences.map(t => t.html).join('');
  });
  return this;
};

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
  if(node.classList.contains('marker')) {
    node = node.parentNode;
  }
  if(!node.classList.contains('sentence')) return;
  Array.from(this._el.children).forEach(pNode => {
    Array.from(pNode.children).forEach(sNode => {
      sNode.classList.remove('active');
    });
  });
  node.classList.add('active');
  return this;
};
