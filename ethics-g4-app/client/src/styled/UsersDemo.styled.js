//template file used only to keep the form css until the application form is made
import styled from "styled-components";


const UsersDemo = styled.div`
  /* Button */
  button[type="submit"] {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }

  button[type="submit"]:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    color: #fff;
  }

  /* Adjust the input width */
  .form-control {
    width: 100%;
    max-width: 300px;
    margin-right: auto;
    margin-left: auto;
  }
`;


export default UsersDemo;