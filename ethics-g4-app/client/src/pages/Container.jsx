import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import StyledSidebar from "../styled/Sidebar.styled";
import Navbar from "../components/Navbar";
import StyledNavbar from "../styled/Navbar.styled";
import StyledContainer from "../styled/Container.styled";
import StyledContent from "../styled/Content.styled";
import StyledContentContainer from "../styled/ContentContainer.styled";
import backgroundImage from "/assets/images/welcome-bg.png";

const Container = () => {
  // Use location to get the current pathname
  const location = useLocation();

  // Define an array of paths where you want to show the background image
  const pathsToShowBackground = [
    "/",
    // "/application", bring back if can make it scrollable
    "/contact",
    "/guides",
    "/document_templates",
  ];

  // Check if the current path is in the array of paths to show the background
  const shouldShowBackground = pathsToShowBackground.includes(
    location.pathname
  );

  return (
    <StyledContainer>
      <StyledSidebar>
        <Sidebar />
      </StyledSidebar>
      <StyledContentContainer>
        <StyledNavbar>
          <Navbar />
        </StyledNavbar>
        <StyledContent
          background={shouldShowBackground ? backgroundImage : null}
        >
          <Outlet />
        </StyledContent>
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default Container;
