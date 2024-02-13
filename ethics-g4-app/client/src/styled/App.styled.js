import styled from "styled-components";

const App = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #333333 0%, #454545 100%);
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #333; /* Dark grey text color */
  button.btn {
    background-color: #ff7518; /* Adjusted orange color */
    color: #fff;
    padding: 12px 24px;
    margin: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease; /* Added transform transition */

    &:hover {
      background-color: #fc9c00; /* Adjusted hover color */
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.4);
      transform: scale(1.05); /* Scale the button on hover */
    }
    &:focus {
      color: #fff;
      background-color: #ff7518; /* Adjusted hover color */
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      color: #333; /* Dark grey text color */
      margin-bottom: 8px;
    }
  }
`;

export default App;
