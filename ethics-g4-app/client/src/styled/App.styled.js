import styled from "styled-components";

const App = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    45deg,
    rgb(248, 94, 0) 0%,
    rgb(249, 212, 35) 100%
  );

  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;

  button.btn {
    background-color: darkorange;
    color: #fff;
    padding: 8px 16px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }

  button.btn:hover {
    background-color: orange;
    color: #fff;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.4);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      color: #555;
    }
  }
`;

export default App;
