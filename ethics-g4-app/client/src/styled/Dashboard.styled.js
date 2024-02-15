import styled from "styled-components";

const StyledDashboard = styled.div`
  .dashboard-container {
    display: flex;
    justify-content: space-between; /* Aligns items with space between them */
    align-items: center;
  }

  .dashboard-title {
    margin-right: auto; /* Pushes the title to the left as much as possible */
  }

  .options-container {
    margin-left: 10px; /* Adjust spacing between title and selection */
  }

  .options-select {
    width: auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #fa9a00;
    border-radius: 4px;
    outline: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.6);
    margin-top: 8px;
    border-radius: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #888;
  }
  .application,
  .date,
  .status,
  .actions {
    flex-basis: 25%;
    text-align: center;
  }

  .btn {
    background-color: #ffa07a;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
    width: 75px;
    height: fit-content;
  }

  .btn_appro {
    background-color: #29a329 !important;
    &:hover {
      background-color: #28d128 !important;
    }
  }

  .btn_delete {
    background-color: #b30000 !important;
    &:hover {
      background-color: #d40202 !important;
    }
  }

  @media (max-width: 768px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default StyledDashboard;
