import { colors } from './colors';
import { css, WebDimensions } from '@emotion/react';

export const webDimensions: WebDimensions = {
  maxPageWidth: 1440,
  navHeight: 64,
};

// todo: extend mui ThemeProvider with custom styles
export const defaultWebTheme = {
  colors,
  webDimensions,
  breakpoints: {
    desktop: '1279px',
    tablet: '880px',
    mobile: '425px',
  },
};

export const globalCss = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    color: ${colors.black};
    overflow-x: hidden;
    margin: 0;
    padding-top: ${webDimensions.navHeight}px;
  }

  input,
  input:focus,
  textarea,
  textarea:focus,
  textarea:focus-visible {
    outline: none;
  }

  a {
    color: ${colors.link};
  }

  img {
    border-style: none;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }
`;
