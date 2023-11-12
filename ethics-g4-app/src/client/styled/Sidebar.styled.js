import styled from "styled-components";

const Sidebar = styled.div`
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
  float: left;

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    margin-right: 8px;
    vertical-align: middle;
    align-items: left;
  }

  .nav-item a {
    font-weight: bold;
    color: black;
    text-decoration: none;
    position: relative;
    display: inline-block;
    z-index: 1;
  }

  .nav-item a::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    width: calc(100% + 20px);
    /* Adjust the width of the rectangle */
    height: 100%;
    /* Spread the rectangle to the full height of nav-item */
    background-color: rgba(255, 255, 255, 0.5);
    /* Adjust the opacity here */
    border-radius: 10px;
    /* Adjust the border-radius for rounded corners */
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    /* Add fade in/out effect */
    z-index: -1;
    /* Place the rectangle behind the text */
  }

  .nav-item a:hover::before {
    transform: translateX(-50%) scaleY(1);
    opacity: 1;
  }
  
`;

export default Sidebar;
