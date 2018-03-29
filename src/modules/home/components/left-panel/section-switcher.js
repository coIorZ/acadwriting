import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import shouldUpdate from '../../../../lib/shouldUpdate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
`;

const Switch = styled.div`
  writing-mode: vertical-lr;
  padding: 1rem 0.3rem 1rem .1rem;
  width: 1.7rem;
  border: 1px solid #888;
  border-left: none;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
  opacity: 0.3;
  background-color: #fff;
  ${p => p.active && css`
    opacity: 1;
    background-color: #ccc;
  `}
`;

export default class SectionSwitcher extends Component {
  shouldComponentUpdate(nextProps) {
    return shouldUpdate([
      'sections', 'sectionId',
    ], this.props, nextProps);
  }

  render() {
    const {
      sections = {},
      sectionId,
    } = this.props;

    return (
      <Container>
        {Object.keys(sections).map(key => {
          const { id, label } = sections[key];
          return (
            <Switch
              key={id}
              active={sectionId === id}
              onClick={this.setSection.bind(this, id)}
            >
              {label}
            </Switch>
          );
        })}
        <div onClick={this.showPopUp}>?</div>
      </Container>
    );
  }

  setSection = val => {
    this.props.setSectionId(val);
  }

  showPopUp = () => {
    this.props.setPopUpActive(true);
  }
}
