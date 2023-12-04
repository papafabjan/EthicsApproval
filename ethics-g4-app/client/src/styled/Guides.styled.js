import styled from "styled-components";

const Guides = styled.div`
  background: linear-gradient(0deg, #fdd5b1, #fff);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;

  h2 {
    text-align: center;
    color: #333;
  }

  .card {
    margin-top: 2rem;

    h5 {
      color: #333;
    }

    p {
      color: #555;
    }

    .btn-primary {
      background-color: #ffa500;
      color: #fff;
    }
  }
`;

export default Guides;
