import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext');

  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    min-height: 0;
    min-width: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html, body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    overflow-y: hidden;
    background: #1E1D22;
    color: #eee;
  }

  #__next,
  #__layout {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    outline: none;
  }

  .rc-dropdown {
    position: absolute;
    z-index: 1070;
  }

  .rc-dropdown-hidden {
    display: none;
  }
`;
