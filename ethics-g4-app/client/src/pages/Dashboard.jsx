import React, { useState, useEffect, useContext } from "react";
import StyledDashboard from "../styled/Dashboard.styled";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AssignReviewers from "../components/AssignReviewers";
import ApplicationHistory from "../components/ApplicationHistory";
import { UserContext } from "../components/UserContext";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0); // New state to trigger fetch
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [showAssignReviewers, setShowAssignReviewers] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const sessionUser = useContext(UserContext);
  const adminOfDepartment = sessionUser?.admin_of_department;
  const userGoogleId = sessionUser?.id;

  useEffect(() => {
    if (sessionUser.loggedIn) {
      // Fetch departments from API
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/departments`)
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data);
          setSelectedDepartment(adminOfDepartment ? adminOfDepartment : null);
        })
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, []);

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

          // Combine supervisor and reviewer applications while ensuring uniqueness
          const combinedApplications = [
            ...supervisorData,
            ...reviewerData.filter(
              (reviewerApp) =>
                !supervisorData.some(
                  (supervisorApp) => supervisorApp.id === reviewerApp.id
                )
            ),
          ];
          // Update state with combined data
          setApplications(combinedApplications);

          // Fetch and store applicant names for the combined applications
          const namesPromises = combinedApplications.map(
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
      console.log("Applicant ID:", applicantId);
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
      // Set fetchTrigger to trigger re-fetch when Delete is clicked
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
        }/api/applications/approve/${applicationId}`,
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

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Filter applications based on search term and selected department
  const filteredApplications = applications.filter((application) => {
    const applicantName = applicantNames[application.applicant_id];
    return (
      (!selectedDepartment ||
        application.department_code === selectedDepartment) &&
      applicantName &&
      applicantName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusPriority = (status) => {
    switch (status) {
      case "Pending supervisor's admission":
        return 1;
      case "Approved by supervisor, pending reviewers addition":
        return 2;
      case "Reviewers assigned by Ethics Admin":
        return 3;
      case "Reviewer approval complete, pending ethics admin's approval":
        return 4;
      default:
        return 5;
    }
  };

  const sortedApplications = filteredApplications.sort((a, b) => {
    const priorityA = getStatusPriority(a.status);
    const priorityB = getStatusPriority(b.status);

    // Sort in ascending order of priority
    return priorityA - priorityB;
  });

  return (
    <>
      <StyledDashboard>
        <div>
          <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="options-container">
              {/* Display the options list under the dashboard title */}
              {departments.length > 0 && (
                <>
                  <select
                    title="Filter through departments"
                    className="options-select form-control"
                    onChange={handleDepartmentChange}
                    value={selectedDepartment}
                  >
                    <option value="">All Departments</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.code}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </>
              )}
            </div>
          </div>
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
              <p className="date">Submission</p>
              <p className="status">Status</p>
              <p className="actions">Actions</p>
            </div>
            <table>
              <tbody>
                {sortedApplications.map((application, index) => (
                  <tr key={index}>
                    <td>
                      <div className="row">
                        <div className="application">
                          <p title={"Application ID: " + application.id}>
                            {applicantNames[application.applicant_id]}
                          </p>
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
                            title="View/Comment"
                            className="btn"
                            onClick={() =>
                              navigate(`/application/${application.id}`, {
                                state: { mode: "review" },
                              })
                            }
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          {sessionUser.role === "admin" && (
                            <button
                              title="Assign Reviewers"
                              className="btn"
                              onClick={() => {
                                setShowAssignReviewers((prev) => !prev);
                                setSelectedApplicationId(application.id);
                                // Set fetchTrigger to trigger re-fetch when Assign Reviewers is clicked
                                setFetchTrigger((prev) => prev + 1);
                              }}
                              disabled={
                                !(
                                  application.status ===
                                  "Approved by supervisor, pending reviewers addition"
                                ) 
                                &&
                                !(application.status === "Reviewers assigned by Ethics Admin")
                                || (
                                showHistory ||
                                (selectedApplicationId !== application.id &&
                                  showAssignReviewers))
                              }
                            >
                              <i className="fa-solid fa-users"></i>
                            </button>
                          )}
                          {sessionUser.role === "admin" && (
                            <button
                              title="Application History"
                              className="btn"
                              onClick={() => {
                                setShowHistory((prev) => !prev);
                                setSelectedApplicationId(application.id);
                                // setFetchTrigger((prev) => prev + 1);
                                console.log(selectedApplicationId);
                              }}
                              disabled={showAssignReviewers}
                            >
                              <i className="fa-solid fa-clock"></i>
                            </button>
                          )}
                          <button
                            title="Approve"
                            className="btn btn_appro"
                            onClick={() => approve(application.id)}
                            disabled={
                              application.status ===
                              "Comments added, awaiting review by applicant"
                            }
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          {sessionUser.role === "admin" && (
                            <button
                              title="Delete"
                              className="btn btn_delete"
                              onClick={() => deleteApplication(application.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        {showAssignReviewers &&
                          selectedApplicationId === application.id && (
                            <AssignReviewers
                              applicationId={application.id}
                              userGoogleId={userGoogleId}
                            />
                          )}
                      </div>
                      <div>
                        {showHistory &&
                          selectedApplicationId === application.id && (
                            <ApplicationHistory
                              applicationId={application.id}
                            />
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
