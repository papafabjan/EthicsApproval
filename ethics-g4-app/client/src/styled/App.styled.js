import styled from "styled-components";

const App = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #333333 0%, #454545 100%);
  padding: 2em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #333; 
  button.btn {
    background-color: #ff7518; 
    color: #fff;
    padding: 12px 24px;
    margin: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease; 

    &:hover {
      background-color: #fc9c00; 
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.4);
      transform: scale(1.05); 
    }
    &:focus {
      color: #fff;
      background-color: #ff7518; 
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      color: #333; 
      margin-bottom: 8px;
    }
  }
`;

export default App;
