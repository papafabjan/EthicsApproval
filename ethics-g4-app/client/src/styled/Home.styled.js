import styled from "styled-components";
import backgroundImage from "../../public/assets/images/welcome-bg.png";
const Home = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  height: 100%;
  .welcome {
    text-align: left;
    margin-top: 1rem;
    font-size: 18px;
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
