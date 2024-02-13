import styled from "styled-components";

const MyApplications = styled.div`
  h1 {
    margin-bottom: 10px;
    font-family: "Montserrat", sans-serif;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ffa07a; /* Light Dark Orange */
    border-radius: 4px;
    outline: none;
    width: 100%; /* Make input full width */
  }

  .header {
    display: none; /* Hide header on small screens */
  }

  .row {
    display: flex;
    flex-direction: column; /* Stack elements vertically on small screens */
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
    background-color: #ffa07a; /* Light Dark Orange */
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
  }

  @media (min-width: 768px) {
    .row {
      flex-direction: row;
      align-items: center;
    }

    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color: #888; /* Slightly muted color */
    }
  }
`;

export default MyApplications;
