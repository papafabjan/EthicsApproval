// Guides.styled.js
import styled from "styled-components";

const Guides = styled.div`
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  .card {
    margin-top: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    h5 {
      color: #333;
    }

    p {
      color: #555;
    }

    &:hover {
      transform: scale(1.05);
    }

    @media (min-width: 768px) {
      width: calc(50% - 20px);
    }

    @media (min-width: 1200px) {
      width: calc(33.333% - 20px);
    }
  }

  .btn {
    background-color: #ffa07a;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    display: inline-block;
  }
`;

export default Guides;
