import React, { Component } from "react";
import { connect } from "98k";
import styled, { css } from "styled-components";

import { LinkButton } from "../../../../components/button";

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  padding: 1rem;
`;

const MatchGroup = styled.div`
  margin: 1rem 0;
`;

const StyledMatch = styled.div`
  margin: 1rem 0;
  padding: 10px 10px 10px 10px;
  border-style:solid;
  border-color:transparent;
  &:hover {
    border-style:solid;
    border-color:#5fc7a4;
  }
`;

const Td1 = styled.td`
padding-left: 5px;
padding-right: 5px;
padding-top:3px;
padding-bottom:3px;
text-align:center;
vertical-align: middle;
`;

const Td2 = styled.td`
padding-left: 5px;
padding-right: 5px;
padding-top:3px;
padding-bottom:3px;
text-align:left;
vertical-align: middle;
`;

const Td3 = styled.td`
padding-left: 5px;
padding-right: 5px;
padding-top:3px;
padding-bottom:3px;
text-align:left;
vertical-align: middle;
text-decoration: underline;
text-color:#0000FF;
&:hover {
  text-color:	#00BFFF;
}
`;

const Match = ({ index, matched, moves, steps, markers, onClick }) => {
  const { markerId, stepId, moveId } = matched;
  return (
    <StyledMatch>
      <h4 style={{textAlign:'center'}}>pattern: {index}</h4>
      <table border="1" style={{ borderCollapse: "collapse", width:'100%'}}>
        <tr>
          <Td1>
            move
          </Td1>
          <Td2>
            {moves[moveId].label}
          </Td2>
        </tr>
        <tr>
          <Td1>step</Td1>
          <Td2>
            {steps[stepId].label}
          </Td2>
        </tr>
        <tr>
          <Td1>pattern</Td1>
          <Td2 onClick={onClick}>
            {markers[markerId].label}
          </Td2>
        </tr>
      </table>
    </StyledMatch>
  );
};

class SentenceAnalysis extends Component {
  render() {
    const {
      analysisSentenceId,
      analysis,
      sectionId,
      moves,
      steps,
      markers
    } = this.props;

    const matches = analysis[sectionId].sentences[analysisSentenceId];

    return (
      <Container>
        <LinkButton onClick={this.back}>Back to overview</LinkButton>
        {matches && matches.length ? (
          <MatchGroup>
            {matches.map((match, index) => (
              <Match
                key={index}
                index={index + 1}
                matched={match}
                moves={moves}
                steps={steps}
                markers={markers}
                onClick={this.gotoSentence.bind(this, match)}
              />
            ))}
          </MatchGroup>
        ) : (
          <MatchGroup>No matches</MatchGroup>
        )}
      </Container>
    );
  }

  gotoSentence = ({ moveId, stepId, markerId }) => {
      this.props.dispatch({ type: 'home/saveRightPanelTab', payload: 1 });
      this.props.dispatch({ type: 'home/saveGuideFlag', payload: 2 });
      this.props.dispatch({ type: 'home/saveCurrentMarkerId', payload: markerId });
      this.props.dispatch({ type: 'home/saveCurrentMoveId', payload: this.props.steps[stepId].moveId });
      this.props.dispatch({ type: 'home/saveCurrentStepId', payload: stepId });
      if(!this.props.sentences[markerId]) {
        this.props.dispatch({ type: 'home/fetchSentencesByMarkerId', payload: markerId });
      }
  }

  back = () => {
    this.props.dispatch({ type: "home/saveAnalysisFlag", payload: 1 });
  };
}

export default connect(
  ({
    home: { moves, steps, markers, analysis, sectionId, sentences, analysisSentenceId }
  }) => ({
    moves,
    steps,
    markers,
    analysis,
    sentences,
    sectionId,
    analysisSentenceId
  })
)(SentenceAnalysis);
