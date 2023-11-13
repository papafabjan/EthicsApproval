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
import LoginPage from "./pages/LoginPage";
import Guides from "./pages/Guides";
import Applicant from "./pages/Applicant";
import Supervisor from "./pages/Supervisor";
import Reviewer from "./pages/Reviewer";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
          <StyledApp>
            <Router>
              <Routes>
                <Route path="/" element={<Container />}>
                  <Route index element={<Home />} />
                  <Route path="usersdemo" element={<UsersDemo />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="guides" element={<Guides />} />
                  <Route path="applicant" element={<Applicant />} />
                  <Route path="supervisor" element={<Supervisor />} />
                  <Route path="reviewer" element={<Reviewer />} />
                  <Route path="loginpage" element={<LoginPage />} />
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </Router>
          </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;
