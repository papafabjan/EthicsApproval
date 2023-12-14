import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledDashboard from "../styled/Dashboard.styled";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import MyForm from "../components/form-pages/Form";
import AssignReviewers from "./AssignReviewers";

// {navigate('../pages/Application.jsx', element={<Application/>}, {replace: true})}
const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showAssignReviewers, setShowAssignReviewers] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

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
  const approve = async (applicationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/applications/update-status/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }), // Update the status as needed
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error updating status: ${response.statusText}`);
      }
  
      // Assuming the status is updated successfully, update the UI accordingly
      const updatedApplications = applications.map((app) =>
        app.id === applicationId ? { ...app, status: "Approved" } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error.message);
      // Handle error or show notification to the user
    }
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
                              onClick={() =>
                                navigate(`/application/${application.id}`, {
                                  state: { mode: "view" },
                                })
                              }
                            >
                              View/Comment
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                setShowAssignReviewers((prev) => !prev);
                                setSelectedApplicationId(application.id);
                              }}
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

                        <div className="actions">
                          <button
                            className="btn"
                            onClick={() =>
                              navigate(`/application/${application.id}`, {
                                state: { mode: "view" },
                              })
                            }
                          >
                            View/Comment
                          </button>

                          <button
                            className="btn"
                         onClick={() => approve(application.id)}
                          >
                            Approve
                          </button>

                        <div>
                          {showAssignReviewers &&
                            selectedApplicationId === application.id && (
                              <AssignReviewers applicationId={application.id}/>
                              )}

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
