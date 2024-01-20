// Document_Templates.styled.js
import styled from "styled-components";

const Document_Templates = styled.div`
  h1 {
    color: #333;
    font-size: 35px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-top: 1rem;
      display: flex;
      align-items: center; /* Align text and button vertically */

      .btn {
        margin-left: 1rem;
      }
    }
  }
`;

export default Document_Templates;
