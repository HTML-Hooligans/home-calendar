import '@emotion/react';
import { colors } from '../theme/colors';

declare module '@emotion/react' {
  export type WebDimensions = {
    maxPageWidth: number;
    navHeight: number;
  };

  export interface Theme {
    colors: typeof colors;
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    webDimensions: WebDimensions;
  }
}
