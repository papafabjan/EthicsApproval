import DisplayUsers from "../components/DisplayUsers";
import RemoveUsers from "../components/RemoveUsers";
import AddUsers from "../components/AddUsers";
import StyledUsersDemo from "../styled/UsersDemo.styled";

const UsersDemo = () => {
  return (
    <>
      <StyledUsersDemo>
        <h1>Users Demo</h1>
        <DisplayUsers />
        <AddUsers />
        <RemoveUsers />
      </StyledUsersDemo>
    </>
  );
};

export default UsersDemo;
