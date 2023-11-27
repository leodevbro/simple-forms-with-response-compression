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



    /* --scroll-color1: rgba(240, 167, 9, 0.4); */
    --scroll-color1: linear-gradient(
                        0deg,
                        #ff8800cf 0%,
                        #ffe600a7 50%,
                        #ff8800cf 80%
                      );



    /* --scroll-color2: rgba(238, 176, 7, 0.6); */
    --scroll-color2: linear-gradient(
                        0deg,
                        #ff8800 0%,
                        #ffe600 50%,
                        #ff8800 80%
                      );;



    

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
