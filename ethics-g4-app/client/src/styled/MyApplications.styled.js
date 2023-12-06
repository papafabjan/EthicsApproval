import styled from "styled-components";


const MyApplications = styled.div`
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
    flex-grow: 1;
    padding: 10px;
    color: grey;
  }

  .header p {
    margin: 0;
  }

  .table-container {
    margin-top: 20px;
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
    flex-basis: 30%;
  }

  .status-date,
  .actions {
    flex-basis: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status,
  .date {
    text-align: center;
  }

  .btn {
    background-color: darkorange;
    color: #fff;
    padding: 8px 16px;
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

  @media (max-width: 768px) {
    .applicant,
    .status-date,
    .actions {
      flex-basis: 100%;
    }
  }
`;

export default MyApplications;