import styled from "styled-components";

const Sidebar = styled.div`
  i {
    margin-right: 8px;
    vertical-align: middle;
    align-items: left;
  }

  background: linear-gradient(
    0deg,
    #f2edce,
    #ffa500,
    #ff6347
  ); /* temporarily */
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  height: 100%;
  max-width: 13%;
  min-width: 13%;
  float: left;

  /* .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
  } */
  /* 
  i {
    margin-right: 8px;
    vertical-align: middle;
    align-items: left;
  } */

  /* .nav-item a {
    
  } */

  .icon-title {
    display: flex;
    align-items: right;
    font-weight: bold;
    flex-direction: row;
    > a {
      color: black;
      text-decoration: none;
      position: relative;
      display: inline-block;
      z-index: 1;
    }
  }

  .icon {
  }

  .title {
  }

  .icon-title:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 51%;
    right: 51%;
    bottom: 0;
    background: #2098d1;
    height: 4px;
    -webkit-transition-property: left, right;
    transition-property: left, right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .icon-title:hover:before,
  .icon-title:focus:before,
  .icon-title:active:before {
    left: 0;
    right: 0;
  }
`;

export default Sidebar;
