import styled from "styled-components";

const StyledDashboard = styled.div`
  h1 {
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #FFA07A; /* Light Dark Orange */
    border-radius: 4px;
    outline: none; /* Remove default input focus outline */
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #888; /* Slightly muted color */
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
    margin-top: 8px;
  }

  .application,
  .date,
  .status,
  .actions {
    flex-basis: 25%;
    text-align: center;
  }

  .btn {
    background-color: #FFA07A; /* Light Dark Orange */
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default StyledDashboard;
