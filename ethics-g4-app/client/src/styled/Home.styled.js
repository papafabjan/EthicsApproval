import styled from "styled-components";

const Home = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .welcome {
    text-align: left;
    margin-top: 1rem;
    font-size: 18px;
    position: relative;
    z-index: 2;
    a {
      text-decoration: none;
      color: #e36402;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .user-profile {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 50%;
      width: 100%;
      max-width: 150px;
      height: auto;
      object-fit: cover;
    }

    h1 {
      margin-top: 1rem;
      font-size: 24px;
    }

    p {
      margin: 0.5rem 0;
      font-size: 16px;
    }
  }
`;

export default Home;
