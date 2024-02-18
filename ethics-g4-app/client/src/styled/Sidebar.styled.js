import styled from "styled-components";

const Sidebar = styled.div`
  background: linear-gradient(45deg, #ffc003 0%, #ffaa33 100%);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  height: 100%;
  width: 19vw;
  min-width: 19vw;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 50%;
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .container,
  .icon-titles-container {
    display: flex;
    flex-direction: column;
    align-items: stretch; 
    justify-content: center; 
    flex: 1; 
  }

  .icon-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    height: 20%;
    white-space: nowrap;
    margin-left: 10px;

    .fa-solid,
    .fa,
    .fa-table-columns,
    .fa-pen-to-square {
      margin-right: 1.5rem;
    }
  }

  .icon-title > a {
    color: #333;
    text-decoration: none;
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 90%;
    text-overflow: ellipsis;
    text-align: justify;
    white-space: normal;
  }

  .icon-title > a:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: darkorange;
    height: 0.2rem; 
    width: 0;
    transition: transform 0.3s ease-out;
  }

  .icon-title > a:focus:after,
  .icon-title > a:hover:after {
    width: 100%;
    left: 0%;
  }
  
  .icon-title > a:after {
    content: "";
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 3px;
    background-color: darkorange;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }

`;

export default Sidebar;
