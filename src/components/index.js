import styled, { css } from 'styled-components';

export const Grid = styled.div`
  display: grid;
  ${p => p.col && css`
    grid-template-columns: ${p.col}
  `}
  ${p => p.row && css`
    grid-template-rows: ${p.row}
  `}
`;

export const Flex = styled.div`
  display: flex;
  ${p => p.center && css`
    justify-content: center;
  `}
  ${p => p.middle && css`
    align-items: center;
  `}
  ${p => p.align && css`
    justify-content: center;
    align-items: center;
  `}
`;

