import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
}
*::selection{
  background: pink;
  color: whitesmoke;
}

body {
  
  color: ${({ theme }) => theme.text};
  margin: 0;
  background: linear-gradient(
    45deg,
    rgb(248, 94, 0) 0%,
    rgb(249, 212, 35) 100%
  );
  font-family: "Montserrat", 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fikura Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}


@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    /* stack components vertically on small screens */
  }

}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}


`;

export default GlobalStyle;
