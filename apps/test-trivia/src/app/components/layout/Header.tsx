import React from 'react';
import Styled from '@emotion/styled';

const HeaderStyles = Styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(0, 189, 89, 1);
  padding: 10px;
  background-image: url();

  h1 {
    margin: auto;
  }
  img {
    position: absolute;
    top: 16px;
    let: 20px;
  }
`;
export const Header = () => {
  return (
    <HeaderStyles>
      <img src="./assets/logo.svg" alt="Finno" width="180px" />
      <h1>Welcome to Trivia Quiz exercise!</h1>
    </HeaderStyles>
  );
};
