import styled from "styled-components";

const Navbar = styled.div`
  /* border: 3px solid red; */
  overflow: auto;
  float: top;
  height: 20%;
  align-items: center;

  .navbar-text {
    margin-right: 10vh;
    font-size: 3vh;
  }

  .d-flex {
    margin-left: 10vh;
  }

  button[type="submit"] {
    background-color: whitesmoke;
  }

  button[type="submit"]:hover {
    background-color: aliceblue;
    color: black;
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
