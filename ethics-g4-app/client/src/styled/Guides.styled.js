import styled from "styled-components";

const Guides = styled.div`

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .card {
    margin: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    width: 300px;

    h5 {
      color: #333;
    }

    p {
      color: #555;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default Guides;
