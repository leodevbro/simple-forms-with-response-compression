import { createGlobalStyle } from 'styled-components';
import { IBM_Plex_Mono } from 'next/font/google';

export const IBM_Plex_Mono_using = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const GlobalStyles = createGlobalStyle`
  body {
    /* background-color: gray; */
  }

  :root {
    --scrollbar-width: 0px;

    --scroll-track-color: rgba(0, 0, 0, 0);


    --scroll-color1: linear-gradient(
                        0deg,
                        rgba(82, 148, 111, 0.404) 0%,
                        rgba(75, 155, 128, 0.397) 80%
                      );


    --scroll-color2: linear-gradient(
                        0deg,
                        rgba(77, 167, 116, 0.671) 0%,
                        rgba(67, 165, 109, 0.603) 80%
                      );

    overflow-wrap: anywhere;
  }




  /* scrollbar custom */

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--scroll-color1);
  }

  /* Works on Chrome */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: var(--scroll-track-color);
    border-radius: 100px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 100px;
    // border: 5px solid transparent;
    // background-clip: content-box;
    // background-color: rgb(49, 152, 221);
    background: var(--scroll-color1);

    &:hover {
      background: var(--scroll-color2);
    }
  }
`;
