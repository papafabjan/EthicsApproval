import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import StyledContainer from "../styled/Container.styled";
import StyledContent from "../styled/Content.styled";
import StyledSidebar from "../styled/Sidebar.styled";

const Container = () => {
  return (
    <StyledContainer>
      <StyledSidebar>
        <Sidebar />
      </StyledSidebar>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledContainer>
  );
};

export default Container;
