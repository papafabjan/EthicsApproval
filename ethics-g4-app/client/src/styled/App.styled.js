import styled from "styled-components";

const App = styled.div`
   min-height: 100vh;
  overflow: scroll;
  border: 10px solid grey;
  background: linear-gradient(
    0deg,
    #ff7f50, 
    #ffcc80 
  );
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  font-family: 'Roboto', sans-serif; 

  i {
    margin-right: 8px;
    vertical-align: middle;
    align-items: left;
  }

  button.btn {
    background-color: darkorange;
    color: #fff;
    padding: 8px 16px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export default App;
