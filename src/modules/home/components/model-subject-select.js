import React from 'react';
import styled from 'styled-components';

import { Flex } from '../../../components';

const Container = styled(Flex)`
  font-size: 0.8rem;
`;

const Selection = ({ label, options = {}, onSelect = null }) => (
  <div>
    <label>{label}:</label>
    <select>
      {Object.keys(options).map(k => (
        <option value={options[k].id} key={options[k].id}>{options[k].text}</option>
      ))}
    </select>
  </div>
);

export default ({ writingModels, subjectAreas }) => (
  <Container>
    <Selection label='Writing Model' options={writingModels}/>
    <Selection label='Subject Area' options={subjectAreas}/>
  </Container>
);
