import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Pagination from '../../../../components/pagination';

const COUNT_PER_PAGE = 10;

const Container = styled.div`
`;

const SentenceGroup = styled.div`
  height: calc(100vh - 9rem);
  overflow: auto;
  padding: 1rem;
`;

const StyledSentence = styled.div`
  margin-bottom: 1rem;
`;

const NotMatch = styled.span``;

const Match = styled.span`
  color: #4c7af1;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0 .5rem;
`;

const BreadcrumbSeparator = () => (
  <div>&nbsp;&rsaquo;&nbsp;</div>
);

const BreadcrumbItem = styled.div`
  max-width: 30%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${p => !p.last && css`
    color: #4c7af1;
    cursor: pointer;
  `}
`;

class Breadcrumb extends Component {
  render() {
    const {
      moves, currentMoveId,
      steps, currentStepId,
      markers, currentMarkerId,
    } = this.props;

    return (
      <BreadcrumbContainer>
        <BreadcrumbItem onClick={this.back}>{moves[currentMoveId].label}</BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem onClick={this.back}>{steps[currentStepId].label}</BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem last>{markers[currentMarkerId].label}</BreadcrumbItem>
      </BreadcrumbContainer>
    );
  }

  back = () => {
    this.props.setGuideFlag(1);
  }
}

class Sentence extends Component {
  render() {
    const {
      sentence,
    } = this.props;

    const length = sentence.match.length;
    const index = sentence.text.indexOf(sentence.match);

    return (
      <StyledSentence>
        <NotMatch>{sentence.text.substring(0, index)}</NotMatch>
        <Match>{sentence.match}</Match>
        <NotMatch>{sentence.text.substr(index + length)}</NotMatch>
      </StyledSentence>
    );
  }
}

export default class Sentences extends Component {
  state = {
    currentIndex: 0,
  }

  render() {
    const {
      sentences,
      currentMarkerId,
    } = this.props;

    const sentencesByMarkerId = sentences[currentMarkerId];

    if(!sentencesByMarkerId) return <div>loading sentences...</div>;
    const { currentIndex } = this.state;
    const pageNum = Math.ceil(Object.keys(sentencesByMarkerId).length / COUNT_PER_PAGE);

    return (
      <Container>
        <Breadcrumb {...this.props}/>
        <SentenceGroup>
          {Object.keys(sentencesByMarkerId).slice(currentIndex * COUNT_PER_PAGE, (currentIndex + 1) * COUNT_PER_PAGE).map(sentenceId => {
            const sentence = sentencesByMarkerId[sentenceId];
            return <Sentence sentence={sentence}/>;
          })}
        </SentenceGroup>
        <PaginationContainer>
          <Pagination length={pageNum} onClick={this.turnPage}/>
        </PaginationContainer>
      </Container>
    );
  }

  turnPage = index => {
    this.setState(() => ({
      currentIndex: index,
    }));
  }
}
