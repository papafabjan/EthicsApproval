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
    position: relative;
    overflow: hidden;
    color: #fff;
    padding: 12px 24px;
    margin: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    &:hover::before {
      content: "";
      display: block;
      width: 0px;
      height: 50%;
      position: absolute;
      top: 0%;
      left: 0%;
      opacity: 0;
      background: #fff;
      box-shadow: 0 0 50px 30px #fff;
      -webkit-transform: skewX(-20deg);
      -moz-transform: skewX(-20deg);
      -ms-transform: skewX(-20deg);
      -o-transform: skewX(-20deg);
      transform: skewX(-20deg);
      -webkit-animation: sh02 0.5s 0s linear;
      -moz-animation: sh02 0.5s 0s linear;
      animation: sh02 0.5s 0s linear;
    }
    &:hover {
      background-color: #fc9c00;
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.4);
      transform: translateY(-2px);
    }
    &:focus {
      color: #fff;
      background-color: #fc9c00;
    }

    @keyframes sh02 {
      from {
        opacity: 0;
        left: 0%;
      }

      50% {
        opacity: 1;
      }

      to {
        opacity: 0;
        left: 100%;
      }
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
