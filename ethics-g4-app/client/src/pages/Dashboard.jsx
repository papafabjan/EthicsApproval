import React, { useState, useEffect, useContext } from "react";
import StyledDashboard from "../styled/Dashboard.styled";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AssignReviewers from "../components/AssignReviewers";
import { UserContext } from "../components/UserContext";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0); // New state to trigger fetch
  const navigate = useNavigate();
  const [showAssignReviewers, setShowAssignReviewers] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const sessionUser = useContext(UserContext);

  if (sessionUser.role === "staff") {
    // Fetch applications from the API
    useEffect(() => {
      const fetchSupervisorAndReviewerApplications = async () => {
        try {
          // Fetch supervisor applications
          const supervisorResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/supervisor/applications/${
              sessionUser.id
            }`
          );
          if (!supervisorResponse.ok) {
            throw new Error(
              `Error fetching supervisor applications: ${supervisorResponse.statusText}`
            );
          }
          const supervisorData = await supervisorResponse.json();

          // Fetch reviewer applications
          const reviewerResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/reviewer/applications/${
              sessionUser.id
            }`
          );
          if (!reviewerResponse.ok) {
            throw new Error(
              `Error fetching reviewer applications: ${reviewerResponse.statusText}`
            );
          }
          const reviewerData = await reviewerResponse.json();

          // Update state with combined data
          setApplications([...supervisorData, ...reviewerData]);

          // Fetch and store applicant names for the supervisor applications
          const namesPromises = [...supervisorData, ...reviewerData].map(
            async (application) => {
              const applicantName = await fetchApplicantName(
                application.applicant_id
              );
              setApplicantNames((prevNames) => ({
                ...prevNames,
                [application.applicant_id]: applicantName,
              }));
            }
          );

          // Wait for all names to be fetched
          await Promise.all(namesPromises);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchSupervisorAndReviewerApplications();
    }, [sessionUser.role, fetchTrigger]);
  }

  //fetch applications where user is a supervisor

  if (sessionUser.role === "admin") {
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
    }, [sessionUser.role, fetchTrigger]);
  }

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

  const deleteApplication = async (applicationId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/applications/delete/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting application: ${response.statusText}`);
      }
      // Set fetchTrigger to trigger re-fetch when Approve is clicked
      setFetchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting application:", error.message);
    }
  };

  const approve = async (applicationId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/applications/update-status/${applicationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Approved",
            user: sessionUser,
          }),
        }
      );

      // Set fetchTrigger to trigger re-fetch when Approve is clicked
      setFetchTrigger((prev) => prev - 1);
      const data = await response.json();

      if (data.success) {
        // Update successful
        console.log(data.message);
      } else {
        // Handle the case where the action is not possible
        console.error(data.message);
      }
    } catch (error) {
      // Handle error or show notification to the user
      console.error(error.message);
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
            className="form-control me-2"
            type="text"
            placeholder="Search by applicant name"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div>
            <div className="header">
              <p className="application">Applicant Name</p>
              <p className="date">Date of submission</p>
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
                          {sessionUser.role === "admin" && (
                            <button
                              className="btn"
                              onClick={() => {
                                setShowAssignReviewers((prev) => !prev);
                                setSelectedApplicationId(application.id);
                                // Set fetchTrigger to trigger re-fetch when Assign Reviewers is clicked
                                setFetchTrigger((prev) => prev + 1);
                              }}
                              disabled={
                                !(application.status ===
                                "Approved by supervisor, pending reviewers addition") && !(application.status === "Reviewers Assigned")
                              }
                            >
                              Assign Reviewers
                            </button>
                          )}
                          <button
                            className="btn"
                            onClick={() => approve(application.id)}
                          >
                            Approve
                          </button>
                          {sessionUser.role === "admin" && (
                            <button
                              className="btn"
                              onClick={() => deleteApplication(application.id)}
                            >
                              Delete Application
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        {showAssignReviewers &&
                          selectedApplicationId === application.id && (
                            <AssignReviewers applicationId={application.id} />
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
