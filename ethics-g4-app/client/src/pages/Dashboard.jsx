import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledDashboard from "../styled/Dashboard.styled";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import MyForm from "../components/form-pages/Form";

// {navigate('../pages/Application.jsx', element={<Application/>}, {replace: true})}
const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

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
      console.log(applicantId);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/userID/${applicantId}`
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
  <MyForm showComments={showComments} />
  const handleComment = (applicationId) => {
    // Redirect to the application page with the application ID and showComments prop
    navigate(`/Application`, { state: { showComments: true } });
    setShowComments(true);
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
          <h1>Dashboard</h1>
          <input
            type="text"
            placeholder="Search by applicant name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div>
            <div className="header">
              <p className="application">Applicant Name</p>
              <p className="date">Date</p>
              <p className="status">Status</p>
              <p className="actions">Actions</p>
            </div>
            <table>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="row">
                        <div className="application">
                          <p>{applicantNames[application.applicant_id]}</p>
                        </div>
                        <div className="date">
                          <p>
                            {format(new Date(application.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="status">
                          <p>{application.status}</p>
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
