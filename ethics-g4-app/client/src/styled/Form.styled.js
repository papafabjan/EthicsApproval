import styled from "styled-components";

const Form = styled.div`
  .notes {
    .underlined {
      text-decoration: underline;
    }
    a {
      text-decoration: none;
      color: #e36402;
    }
    strong{
      font-weight: 600;
    }
  }
  .notes ul li {
    margin: 0 auto;
    font-size: 16px;
    color: #000;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled.button`
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Form;
