import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import StyledSidebar from "../styled/Sidebar.styled";
import Navbar from "../components/Navbar";
import StyledNavbar from "../styled/Navbar.styled";
import StyledContainer from "../styled/Container.styled";
import StyledContent from "../styled/Content.styled";
import StyledContentContainer from "../styled/ContentContainer.styled";
import { UserContext } from "../components/UserContext";

const Container = () => {
  const user = useContext(UserContext);
  return (
    <StyledContainer>
      <StyledSidebar>
        <Sidebar />
      </StyledSidebar>
      <StyledContentContainer>
        <StyledNavbar>
          <Navbar />
        </StyledNavbar>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default Container;
