import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    /* background: linear-gradient(180deg, #FFFFFF 41.77%, rgba(175, 175, 175, 0.2) 99.32%); */
    background-attachment: fixed;
    color: #424242;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 500 1.6rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  p {
    margin-bottom: 0;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;
