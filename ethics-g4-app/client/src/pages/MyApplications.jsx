import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledMyApplications from '../styled/MyApplications.styled';

const MyApplications = () =>{
  const [applications, setApplications] = useState([]);
  const [applicantNames, setApplicantNames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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
                  <p>ㅤ</p>
                  <p>Status</p>
                  <p>Sub Date</p>
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