import styled from "styled-components";

const Home = styled.div`
  font-family: "Montserrat", sans-serif;

  h1 {
    text-align: center;
    color: #333;
  }

  div {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 50%;
      width: 100%; /* Make the image width 100% of the container */
      max-width: 150px; /* Set a maximum width to avoid stretching on larger screens */
      height: auto; /* Maintain aspect ratio */
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
