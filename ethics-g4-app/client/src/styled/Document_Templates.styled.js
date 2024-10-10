// Document_Templates.styled.js
import styled from "styled-components";

const Document_Templates = styled.div`
  h1 {
    color: #333;
    font-size: 35px;
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-top: 1rem;

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
          margin-left: 1rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    li div {
      flex-direction: column;
      align-items: flex-start;

      .btn {
        margin-top: 1rem;
        margin-left: 0;
      }
    }
  }
`;

export default Document_Templates;
