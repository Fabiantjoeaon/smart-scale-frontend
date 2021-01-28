import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import "./global.css";
import { Navigation } from "./components/Navigation";
import { useWindowSize } from "./hooks";
import { Header } from "./components/Header";

export default function MyApp({ Component, pageProps }) {
  const { width, height } = useWindowSize();
  return (
    <ThemeProvider
      theme={{
        innerWidth: "80%",
      }}
    >
      <Wrapper maxHeight={height}>
        <GlobalStyle />
        <Header></Header>
        <Component {...pageProps} />
        <Navigation />
      </Wrapper>
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0px;
    padding: 0px;
    overflow: hidden;

    font-family: "Work Sans", sans-serif;
  }
`;

const Wrapper = styled.div`
  max-width: 414px;

  height: ${({ maxHeight }) => maxHeight}px;
`;
