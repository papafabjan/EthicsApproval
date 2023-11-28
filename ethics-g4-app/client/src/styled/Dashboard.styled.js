import styled from "styled-components";

const Dashboard = styled.div`

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: grey; 
  }

  .header p {
    margin: 0;
  }

  .table-container {
    margin-top: 20px; /* Adjust as needed */
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .application {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .applicant {
    flex-grow: 1;
  }

  .status-date {
    display: flex;
    justify-content: space-between;  /* Adjusted to space-between */
    flex-direction: column;
    align-items: flex-end;
  }

  .status,
  .date {
    margin-bottom: 5px;
  }

  .btn {
    background-color: darkorange;
    color: #fff;
    padding: 8px 16px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default Dashboard;

