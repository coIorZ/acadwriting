import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Pagination from '../../../../components/pagination';

const COUNT_PER_PAGE = 10;

const Container = styled.div``;

const Sentence = styled.div`
  margin: 1rem 0;
`;

const BreadcrumbContainer = styled.div``;

const BreadcrumbItem = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  max-width: 25%;
  white-space: nowrap;
  overflow: hidden;
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
        &gt;
        <BreadcrumbItem onClick={this.back}>{steps[currentStepId].label}</BreadcrumbItem>
        &gt;
        <BreadcrumbItem>{markers[currentMarkerId].label}</BreadcrumbItem>
      </BreadcrumbContainer>
    );
  }

  back = () => {
    this.props.setGuideFlag(1);
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
    console.log(Object.keys(sentencesByMarkerId).length);
    const { currentIndex } = this.state;

    return (
      <Container>
        <Breadcrumb {...this.props}/>
        {Object.keys(sentencesByMarkerId).slice(currentIndex * COUNT_PER_PAGE, (currentIndex + 1) * COUNT_PER_PAGE).map(sentenceId => {
          const sentence = sentencesByMarkerId[sentenceId];
          return <Sentence>{sentence.text}</Sentence>;
        })}
        <Pagination length={(Object.keys(sentencesByMarkerId).length / COUNT_PER_PAGE | 0) + 1} onClick={this.turnPage}/>
      </Container>
    );
  }

  turnPage = index => {
    this.setState(() => ({
      currentIndex: index,
    }));
  }
}
