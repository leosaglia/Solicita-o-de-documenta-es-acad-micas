import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 12px;

  display: flex;
  align-items: center;

  border: 1px solid rgba(75, 88, 94, 0.5);
  border-radius: 8px;

  color: rgba(75, 88, 94, 0.6);
  background: #fff;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 1.6rem;
    font-weight: 500;
    color: rgba(75, 88, 94, 1);

    &::placeholder {
      color: rgba(75, 88, 94, 0.7);
      font-weight: 400;
      font-size: 1.4rem;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  z-index: 100;
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
