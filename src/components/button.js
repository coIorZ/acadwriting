import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  display: inline-block;
  color: #ffffff;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: #21cca3;
  padding: 0.3rem 3rem;
  border-radius: 1rem;
  text-transform: uppercase;
  letter-spacing: .05rem;
  font-weight: 400;
  font-size: .6875rem;
  cursor: pointer;
  box-shadow: 0 .2rem .5rem #bff2e6;
  transition: background-color .2s;
  &:hover {
    background-color: #2cd7b0;
  }
`;

export default ({ label, onClick }) => (
  <StyledButton onClick={onClick}>{label}</StyledButton>
);

const StyledLinkButton = styled.div`
  display: inline-block;
  color: #4c7af1;
  text-transform: uppercase;
  letter-spacing: .05rem;
  font-weight: 400;
  font-size: .6875rem;
  cursor: pointer;
`;

export const LinkButton = ({ label, onClick }) => (
  <StyledLinkButton onClick={onClick}>{label}</StyledLinkButton>
);
