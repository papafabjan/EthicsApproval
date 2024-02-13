import styled from "styled-components";

const AdminDashboard = styled.div`
  h1 {
    margin-bottom: 10px;
    color: #333;    
    position: relative;
    display: inline-block;
  }

  h1::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fa9a00; 
    bottom: 0;
    left: 0;
    opacity: 0.5; 
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #fa9a00; 
    border-radius: 4px;
    outline: none; 
  }
`;

export default AdminDashboard;
