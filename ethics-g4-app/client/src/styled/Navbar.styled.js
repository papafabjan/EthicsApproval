import styled from "styled-components";

const Navbar = styled.div`
  /* border: 3px solid red; */
  overflow: hidden;
  float: top;
  height: 50%;
  align-items: center;
  a {
    text-decoration: none;
  }
  .navbar-text {
    margin-right: 10vh;
    font-size: 3vh;
  }

  .d-flex {
    margin-left: 10vh;
  }

  img {
    border: 2px solid #050906;
    margin-right: 0.5rem;
  }
  i {
    margin-left: 1rem;
  }
`;

export default Navbar;
