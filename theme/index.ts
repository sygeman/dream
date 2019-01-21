import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  dark1Color: string;
  dark2Color: string;
  accent1Color: string;
  accent2Color: string;
  main1Color: string;
  main2Color: string;
  text1Color: string;
}

const GlobalStyle = `
  @import url('https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css');

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

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #fff;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #fff, 0 0 5px #fff;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Collection default theme */

  .ReactVirtualized__Collection {
  }

  .ReactVirtualized__Collection__innerScrollContainer {
  }

  /* Grid default theme */

  .ReactVirtualized__Grid {
  }

  .ReactVirtualized__Grid__innerScrollContainer {
  }

  /* Table default theme */

  .ReactVirtualized__Table {
  }

  .ReactVirtualized__Table__Grid {
  }

  .ReactVirtualized__Table__headerRow {
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .ReactVirtualized__Table__row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .ReactVirtualized__Table__headerTruncatedText {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .ReactVirtualized__Table__headerColumn,
  .ReactVirtualized__Table__rowColumn {
    margin-right: 10px;
    min-width: 0px;
  }
  .ReactVirtualized__Table__rowColumn {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ReactVirtualized__Table__headerColumn:first-of-type,
  .ReactVirtualized__Table__rowColumn:first-of-type {
    margin-left: 10px;
  }
  .ReactVirtualized__Table__sortableHeaderColumn {
    cursor: pointer;
  }

  .ReactVirtualized__Table__sortableHeaderIconContainer {
    display: flex;
    align-items: center;
  }
  .ReactVirtualized__Table__sortableHeaderIcon {
    flex: 0 0 24px;
    height: 1em;
    width: 1em;
    fill: currentColor;
  }

  /* List default theme */

  .ReactVirtualized__List {
  }
`;

export default styled;
export { css, GlobalStyle, keyframes, ThemeProvider };
