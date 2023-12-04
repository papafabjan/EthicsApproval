import styled from "styled-components";

const Document_Templates = styled.div`
  background: linear-gradient(0deg, #fdd5b1, #fff);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;

  h1 {
    text-align: center;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-top: 1rem;
      font-size: 18px;
      color: #555;

      a {
        color: #ffa500;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
export default Document_Templates;
