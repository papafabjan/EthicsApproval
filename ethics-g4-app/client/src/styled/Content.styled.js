import styled from "styled-components";

const Content = styled.div`
  overflow-y: scroll;
  height: 150em;
  width: 93%;
  margin: 0 auto;
  margin-top: 3vh;
  margin-bottom: 3vh;
  background: #f8f9f9;
  color: black;
  border-radius: 24px;
  box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.6);
  padding: 30px;
  h1 {
    margin-bottom: 10px;
    color: #333;
    position: relative;
    display: inline-block;
  }

  h1::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fa9a00;
    bottom: 0;
    left: 0;
    opacity: 0.5;
  }

  .btn_appro {
    background-color: #29a329 !important;
    &:hover {
      background-color: #28d128 !important;
    }
  }

  .btn_delete {
    background-color: #b30000 !important;
    &:hover {
      background-color: #d40202 !important;
    }
  }

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
    position: absolute;
    right: 0;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:active {
    background: rgba(255, 183, 0, 0.841);
  }
`;

export default Content;
