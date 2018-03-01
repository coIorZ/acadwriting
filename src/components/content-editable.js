import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
    this.emitPaste = this.emitPaste.bind(this);
  }

  render() {
    /*eslint-disable no-unused-vars*/
    const { tagName, html, ...props } = this.props;
    /*eslint-enable no-unused-vars*/

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref             : (e) => this.htmlEl = e,
        onInput         : this.emitChange,
        onPaste         : this.emitPaste,
        onBlur          : this.props.onBlur || this.emitChange,
        contentEditable : !this.props.disabled,
        //dangerouslySetInnerHTML : { __html: html },
      },
      this.props.children);
  }

  shouldComponentUpdate(nextProps) {
    const { props, htmlEl } = this;

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl) {
      return true;
    }

    // Rerender if it is empty
    if (!nextProps.html) {
      return true;
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (nextProps.html !== htmlEl.innerHTML && nextProps.html !== props.html) {
      return true;
    }

    const optional = ['style', 'className', 'disable', 'tagName'];

    // Handle additional properties
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      //Perhaps React (whose VDOM gets outdated because we often prevent
      //rerendering) did not update the DOM. So we update it manually now.
      //this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    const html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }

  emitPaste(evt) {
    evt.preventDefault(); // Do not paste
    if (!this.htmlEl) return;
    const text = evt.clipboardData.getData('text');
    if(!text) return;
    const textArr = text.split('\n').filter(Boolean);
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    range.deleteContents();
    textArr.forEach((t, i) => {
      let node;
      if(i === 0) {
        node = document.createTextNode(t);
      } else {
        node = document.createElement('p');
        node.appendChild(document.createTextNode(t));
      }
      range.insertNode(node);
      range.setStartAfter(node.parentNode);
    });
    sel.empty();
    if (this.props.onChange) {
      evt.target = { value: this.htmlEl.innerHTML };
      this.props.onChange(evt);
    }
    this.lastHtml = this.htmlEl.innerHTML;
  }
}
