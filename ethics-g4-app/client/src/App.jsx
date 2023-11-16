import StyledApp from "./styled/App.styled";
import GlobalStyle from "./styled/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UsersDemo from "./pages/UsersDemo";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Container from "./pages/Container";
// import LoginPage from "./pages/LoginPage";
import Guides from "./pages/Guides";
import Document_Templates from "./pages/Document_Templates";
import Applicant from "./pages/Applicant";
import Supervisor from "./pages/Supervisor";
import Reviewer from "./pages/Reviewer";
import Application from "./pages/Application";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";

function App() {

  const user = useContext(UserContext);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <StyledApp>
          {user?.loggedIn === null ? (
            ""
          ) : user?.loggedIn === true ? (
            "logged in"
          ) : (
            
          <Router>
            <Routes>
              <Route path="/" element={<Container />}>
                <Route index element={<Home />} />
                <Route path="usersdemo" element={<UsersDemo />} />
                <Route path="contact" element={<Contact />} />
                <Route path="guides" element={<Guides />} />
                <Route path="application" element={<Application />} />
                <Route
                  path="Document_Templates"
                  element={<Document_Templates />}
                />
                <Route path="applicant" element={<Applicant />} />
                <Route path="supervisor" element={<Supervisor />} />
                <Route path="reviewer" element={<Reviewer />} />
                {/* <Route path="loginpage" element={<LoginPage />} /> */}
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </Router>
          )}
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;
