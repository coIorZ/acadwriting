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
  if(!this._el) return;
  if(val == null) return this._el.innerHTML;
  this._el.innerHTML = val;
  return this;
};

Editor.prototype.paste = function(e) {
  if(!this._el) return;
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
};

Editor.prototype.analyze = function() {
  if(!this._el) return;
  this.data = [];
  Array.from(this._el.children).forEach(node => {
    let para = node.textContent;
    let sentences = splitToSentences(para);
    sentences = sentences.map(text => ({
      text,
      html: `<span class='sentence'>${text.replace(
        /\b(researchers|research).* (address|addressed|addresses|aim|aims|aimed|analyse|analysed|analyses|analyze|analyzed|analyses|apply|applied|applies|assess|assessed|assesses|attempt to|attempted to|attempts to|carry out|carried out|carries out|classified|classifies|classify|compare|compared|compares|conceptualize|conceptualized|conceptualizes|conceptualise|conceptualised|conceptualises|concerned with|conduct|conducted|conducts|construct|constructed|constructs|cover|covered|covers|deal with|deals with|dealt with|describe|described|describes|develop|developed|develops|devise|devised|devises|estimate|estimated|estimates|evaluate|evaluated|evaluates|examine|examined|examines|explore|explored|explores|focus on|focused on|focuses on|formulate|formulated|formulates|implement|implemented|implements|introduce|introduced|introduces|investigate|investigated|investigates|look at|looked at|looks at|measure|measured|measures|propose|proposed|proposes|purses|pursue|pursued|re-examine|re-examined|re-examines|represent|represented|represents|seek to|seeks to|sought to|studied|studies|study|synthesize|synthesized|synthesizes|test|tested|tests)\b/g, 
        match => `<span class='marker'>${match}</span>`,
      )}</span>`,
      markId: 1,
    }));
    this.data.push(sentences);
    node.innerHTML = sentences.map(t => t.html).join('');
  });
};

Editor.prototype.clearAnalysis = function() {
  if(!this._el) return;
  Array.from(this._el.children).forEach(node => {
    node.innerHTML = node.textContent;
  });
};

Editor.prototype.click = function(e) {
  if(!this._el) return;
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
};
