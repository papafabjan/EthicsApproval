import StyledApp from "./styled/App.styled";
import GlobalStyle from "./styled/GlobalStyles.styled";
import { ThemeProvider } from "styled-components";
import { cityTheme } from "./themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Container from "./pages/Container";
import Guides from "./pages/Guides";
import Document_Templates from "./pages/Document_Templates";
import Applicant from "./pages/Applicant";
import Supervisor from "./pages/Supervisor";
import Reviewer from "./pages/Reviewer";
import Form from "./components/form-pages/Form";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";

function App() {
  const user = useContext(UserContext);
  const loggedIn = user && user.loggedIn;
  const isAdmin = user && user.role === "admin";
  const showDashboard =
    user && (user.role === "admin" || user.role === "staff");
  return (
    <>
      <ThemeProvider theme={cityTheme}>
        <GlobalStyle />
        <StyledApp>
          <Router>
            <Routes>
              <Route path="/" element={<Container />}>
                <Route path="application" element={<Form />} />
                <Route path="contact" element={<Contact />} />
                <Route path="guides" element={<Guides />} />
                <Route
                  path="document_templates"
                  element={<Document_Templates />}
                />
                <Route index element={<Home />} />
                {isAdmin && (
                  <Route path="admindashboard" element={<AdminDashboard />} />
                )}
                <Route path="/application/:applicationId" element={<Form />} />
                <Route path="guides/applicant" element={<Applicant />} />
                <Route path="guides/supervisor" element={<Supervisor />} />
                <Route path="guides/reviewer" element={<Reviewer />} />
                {showDashboard && (
                  <Route path="dashboard" element={<Dashboard />} />
                )}
                {loggedIn && (
                  <Route path="myapplications" element={<MyApplications />} />
                )}
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
