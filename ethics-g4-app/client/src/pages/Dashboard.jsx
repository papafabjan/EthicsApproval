import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledDashboard from "../styled/Dashboard.styled";
import { useNavigate } from "react-router-dom";


// {navigate('../pages/Application.jsx', element={<Application/>}, {replace: true})}
const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Fetch applications from your API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/applications`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching applications: ${response.statusText}`
          );
        }
        const data = await response.json();
        setApplications(data);

        // Fetch and store applicant names
        const namesPromises = data.map(async (application) => {
          const applicantName = await fetchApplicantName(
            application.applicant_id
          );
          setApplicantNames((prevNames) => ({
            ...prevNames,
            [application.applicant_id]: applicantName,
          }));
        });

        // Wait for all names to be fetched
        await Promise.all(namesPromises);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchApplications();
  }, []);

  const fetchApplicantName = async (applicantId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${applicantId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      const userData = await response.json();
      return userData.username;
    } catch (error) {
      console.error(error.message);
      return "Unknown";
    }
  };
  const handleComment = () => {
    // Redirect to the application page
    navigate(`/UsersApplication`);
  };

  // Function to handle search term changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter((application) => {
    const applicantName = applicantNames[application.applicant_id];
    return (
      applicantName &&
      applicantName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <StyledDashboard>
        <div>
          <Link to={`${import.meta.env.VITE_SERVER_URL}/api/applications`}>
            <h1>Dashboard</h1>
          </Link>
          <input
            type="text"
            placeholder="Search by applicant name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div>
            <div className="header">
              <p>Applicant Name</p>
              <p>Status</p>
              <p>Date</p>
              <p className="actions">Actions</p>
            </div>
            <table>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="application">
                        <div className="applicant">
                          <p>{applicantNames[application.applicant_id]}</p>
                        </div>
                        <div className="status-date">
                          <div className="status">
                            <span>{application.status}</span>
                          </div>
                          <div className="date">
                            <span>{application.date}</span>
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            className="btn"
                            onClick={() => handleComment(application.id)}
                          >
                            View/Comment
                          </button>
                          <button
                            className="btn"
                            onClick={() => console.log("Assign Reviewers")}
                          >
                            Assign Reviewers
                          </button>

                          
                          <button
                            className="btn"
                            onClick={() => console.log("Approve")}
                          >
                            Approve
                          </button>
                          
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </StyledDashboard>
    </>
  );
};

export default Dashboard;
