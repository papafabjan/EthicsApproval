import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
}

body {
  
  color: ${({ theme }) => theme.text};
  margin: 0;
  background-color: ${({ theme }) => theme.body};
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
