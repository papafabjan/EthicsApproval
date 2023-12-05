import styled from "styled-components";

const Content = styled.div`
  overflow-y: scroll;
  height: 140vh;
  width: 95%;
  margin: 0 auto;
  margin-top: 9vh;
  margin-bottom: 9vh;
  background: linear-gradient(rgb(255, 255, 255) 0%, rgb(191, 191, 191) 100%);
  color: black;
  border-radius: 24px;
  box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.6);
  padding: 30px;

  &:hover {
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
  &::-webkit-scrollbar-thumb:active{
    
    background: rgba(255, 183, 0, 0.841);
  }
  
  .underlined {
    text-decoration: underline;
  }
`;

export default Content;
