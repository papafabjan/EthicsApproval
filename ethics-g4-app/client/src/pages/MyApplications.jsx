import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import StyledMyApplications from "../styled/MyApplications.styled";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";


const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [applicationTitles, setApplicationTitles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const sessionUser = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = sessionUser.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`
          );

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const user = await userResponse.json();
          setUserData(user);

          const applicationsResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/applications`
          );

          if (!applicationsResponse.ok) {
            throw new Error(
              `Error fetching applications: ${applicationsResponse.statusText}`
            );
          }

          const data = await applicationsResponse.json();
          const userApplications = data.filter(
            (application) => application.applicant_id === user.user_id
          );

          setApplications(userApplications);

          const titlesPromises = userApplications.map(async (application) => {
            const title = await fetchApplicationTitle(application.id);
            setApplicationTitles((prevTitles) => ({
              ...prevTitles,
              [application.id]: title,
            }));
          });

          await Promise.all(titlesPromises);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredApplications = applications.filter((application) => {
    const applicationTitle = applicationTitles[application.id];
    return (
      applicationTitle &&
      applicationTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <StyledMyApplications>
        <div>
          <h1>My Applications</h1>
          <input
            className="form-control me-2"
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
            <div>
              {filteredApplications.map((application) => (
                <div className="row" key={application.id}>
                  <div className="application">
                    <p>{applicationTitles[application.id]}</p>
                  </div>
                  <div className="date">
                    <p>{format(new Date(application.date), "dd/MM/yyyy")}</p>
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
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        navigate(`/application/${application.id}`, {
                          state: { mode: "edit" },
                        })
                      }
                      disabled={
                        application.status !==
                          "Pending supervisor's admission" &&
                        application.status !==
                          "Comments added, awaiting review by applicant"
                      }
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StyledMyApplications>
    </>
  );
};

export default MyApplications;
