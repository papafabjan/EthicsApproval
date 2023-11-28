import styled from "styled-components";

const Home = styled.div`
  
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  font-family: 'Roboto', sans-serif; 

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
      width: 150px;
      height: 150px;
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