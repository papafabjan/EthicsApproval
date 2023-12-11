import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";
import StyledMyApplications from "../styled/MyApplications.styled";
import { format } from "date-fns";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [applicationTitles, setApplicationTitles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const sessionUser = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = sessionUser.id;

  // Fetch applications from your API
  useEffect(() => {
    wait = async() =>{
      fetchUserData();
    }
    
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

        // Filter applications that belong to the logged-in user
        const userApplications = data.filter(
          (application) => application.applicant_id === userData.user_id
        );

        setApplications(userApplications);

        // Fetch and store titles
        const titlesPromises = userApplications.map(async (application) => {
          const title = await fetchApplicationTitle(application.id);
          setApplicationTitles((prevTitles) => ({
            ...prevTitles,
            [application.id]: title,
          }));
        });

        // Wait for all titles to be fetched
        await Promise.all(titlesPromises);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchApplications();
    console.log(userData);
  }, [userId]);

  const fetchApplicationTitle = async (applicationId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/applications/title/${applicationId}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching title: ${response.statusText}`);
      }

      const data = await response.json();
      return data.title;
    } catch (error) {
      console.error(error.message);
      return "Unknown";
    }
  };

  // Function to handle search term changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter((application) => {
    const applicationTitle = applicationTitles[application.id];
    return (
      applicationTitle &&
      applicationTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // Function to fetch user data by user ID
  const fetchUserData = async () => {
    try {
      console.log(userId);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const user = await response.json();
      setUserData(user); // Set the user data in the state
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors as needed
    }
  };

  

  return (
    <>
      <StyledMyApplications>
        <div>
          <h1>My Applications</h1>
          <input
            type="text"
            placeholder="Search applications"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div>
            <div className="header">
              <p className="application">Application Name</p>
              <p className="date">Submission Date</p>
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
                          <p>{applicationTitles[application.id]}</p>
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
                            onClick={() => console.log("View Application")}
                          >
                            View Application
                          </button>
                          <button
                            className="btn"
                            onClick={() => console.log("Edit Application")}
                          >
                            Edit Application
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
      </StyledMyApplications>
    </>
  );
};

export default MyApplications;
