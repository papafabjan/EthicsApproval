import styled from "styled-components";

const MyApplications = styled.div`
  h1 {
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding: 10px;
    color: grey;
  }

  .table-container {
    margin-top: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
  }

  .application,
  .date,
  .status,
  .actions {
    flex-basis: 25%; /* Equal width for each column */
    text-align: center;
  }

  .btn {
    background-color: darkorange;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default MyApplications;