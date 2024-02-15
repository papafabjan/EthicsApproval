import styled from "styled-components";

const AdminDashboard = styled.div`
  /* AdminDashboard component styling */
  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    margin-right: 20px;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #fa9a00;
    border-radius: 4px;
    outline: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  /* Table rows */
  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.6);
    margin-top: 8px;
    border-radius: 10px;
  }

  /* Table cells */
  td {
    flex-basis: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  /* Table header */
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #888;
  }

  /* Specific column classes */
  .username,
  .department,
  .role,
  .actions {
    flex-basis: 25%;
    text-align: center;
  }
.tabs{
  display: flex;
  justify-content: space-between;
}
.create-departments{
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
  align-items: center;
  .btn{
    width: 30%;
  }
}
.departments-table{
  thead tr{
    box-shadow:none;
  }
}
  .btn {
    background-color: #ffa07a;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 3px;
    width: 100%;
  }
`;

export default AdminDashboard;
