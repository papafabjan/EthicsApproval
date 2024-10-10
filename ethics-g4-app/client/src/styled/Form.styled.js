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
  }
  strong {
    font-weight: 600;
  }
  .notes ul li {
    margin: 0 auto;
    font-size: 16px;
    color: #000;
  }
  .form-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns of equal width */
    grid-column-gap: 10px; /* Add some spacing between columns */
  }

  .form-group {
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin: 5px;
    position: relative;
  }

  .form-control {
    max-width: 400px;
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
