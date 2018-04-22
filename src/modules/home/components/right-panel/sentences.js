import React, { Component } from 'react';
import { connect } from '98k';
import styled, { css } from 'styled-components';
import { textToClipboard } from '../../../../lib/utils';
import rr from '../../../../lib/replace-react';
import Pagination from '../../../../components/pagination';

const COUNT_PER_PAGE = 10;

const Container = styled.div`
`;

const SentenceGroup = styled.div`
  height: calc(100vh - 10rem);
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
  height: 2rem;
  padding: 0 .5rem;
`;

const BreadcrumbSeparator = () => (
  <div>&nbsp;&rsaquo;&nbsp;</div>
);

const BreadcrumbItem = styled.div`
  max-width: 45%;
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
    const { label1, label2 } = this.props;

    return (
      <BreadcrumbContainer>
        <BreadcrumbItem onClick={this.back}>{label1}</BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem onClick={this.back}>{label2}</BreadcrumbItem>
      </BreadcrumbContainer>
    );
  }

  back = () => {
    this.props.onBack();
  }
}

const Sentence = ({ sentence, index }) => {
  if(!sentence.match) {
    return (
      <StyledSentence>{index}. {sentence.text}</StyledSentence>
    );
  }
  const length = sentence.match.length;
  const i = sentence.text.indexOf(sentence.match);
  return (
    <StyledSentence>
      {index}. 
      <NotMatch>{sentence.text.substring(0, i)}</NotMatch>
      <Match>{sentence.match}</Match>
      <NotMatch>{sentence.text.substr(i + length)}</NotMatch>
    </StyledSentence>
  );
};

class MarkerDropDown extends Component {
  render() {
    const { marker } = this.props;

    return (
      <div id='mdd' style={{ height: '2rem' }}>
        {rr(marker.substr(2, marker.length - 4).replace(/\.\*/g, '...'), /\(([^)]+)\)/g, (match, index) => {
          const options = match.split('|');
          if(options.length == 1) return match;
          return (
            <select key={index}>
              {options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          );
        })}
        <button onClick={this.copy}>copy</button>
      </div>
    );
  }

  copy = () => {
    const container = document.querySelector('#mdd');
    const selects = container.querySelectorAll('select');
    const str = Array.from(selects).map(s => s.value).join(' ');
    textToClipboard(str);
  }
}

class Sentences extends Component {
  state = {
    currentIndex: 0,
  }

  render() {
    const { 
      writingModelId, subjectAreaId, sectionId,
      moves, steps, markers, sentences, currentMarkerId, currentMoveId, currentStepId,
      rsTypes, rsSteps, rsMarkers, rsSentences, currentRsTypeId, currentRsStepId, currentRsMarkerId,
      mdCodes, mdSubCodes, mdMarkers, mdSentences, currentMdCodeId, currentMdSubCodeId, currentMdMarkerId,
    } = this.props;

    let sentencesByMarkerId = null;
    let label1;
    let label2;
    if(writingModelId == 1) {
      sentencesByMarkerId = sentences[currentMarkerId];
      label1 = moves[currentMoveId].label;
      label2 = steps[currentStepId].label;
    }
    if(writingModelId == 2) {
      sentencesByMarkerId = currentRsMarkerId < 0 ? rsSentences.step[currentRsTypeId] : rsSentences.marker[currentRsMarkerId];
      label1 = rsTypes[currentRsTypeId].label;
      label2 = rsSteps[currentRsStepId].label;
    } else if(writingModelId == 3) {
      sentencesByMarkerId = mdSentences[currentMdCodeId];
      label1 = mdCodes[currentMdCodeId].label;
      label2 = mdSubCodes[currentMdSubCodeId].label;
    }

    if(!sentencesByMarkerId) return <div>loading sentences...</div>;

    const { currentIndex } = this.state;
    const sentenceIds = Object.keys(sentencesByMarkerId).filter(sentenceId => {
      const sentence = sentencesByMarkerId[sentenceId];
      return (!sentence.sectionId || (sentence.sectionId === sectionId)) && sentence.subjectId === subjectAreaId;
    });
    const pageNum = Math.ceil(sentenceIds.length / COUNT_PER_PAGE);

    return (
      <Container>
        <Breadcrumb label1={label1} label2={label2} onBack={this.back}/>
        {writingModelId == 1 && (
          <MarkerDropDown marker={markers[currentMarkerId].fullMarker}/>
        )}
        <SentenceGroup>
          {sentenceIds.slice(currentIndex * COUNT_PER_PAGE, (currentIndex + 1) * COUNT_PER_PAGE).map((sentenceId, index) => {
            const sentence = sentencesByMarkerId[sentenceId];
            return <Sentence key={sentenceId} sentence={sentence} index={currentIndex * COUNT_PER_PAGE + index + 1}/>;
          })}
        </SentenceGroup>
        <PaginationContainer>
          <Pagination length={pageNum} onClick={this.turnPage}/>
        </PaginationContainer>
      </Container>
    );
  }

  back = () => {
    this.props.dispatch({ type: 'home/saveGuideFlag', payload: 1 });
  }

  turnPage = index => {
    this.setState(() => ({
      currentIndex: index,
    }));
  }
}

export default connect(state => state.home)(Sentences);
