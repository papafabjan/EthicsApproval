import styled from "styled-components";

const MyApplications = styled.div`
  h1 {
    margin-bottom: 10px;
    font-family: "Montserrat", sans-serif;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ffa07a; 
    border-radius: 4px;
    outline: none;
    width: 100%;
  }

  .header {
    display: none; 
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
      color: #888; 
    }
  }
`;

export default MyApplications;
