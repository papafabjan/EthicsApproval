import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
  const filteredApplications = applications.filter((application) =>
    applicantNames[application.applicant_id]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Link to={`${import.meta.env.VITE_SERVER_URL}/api/applications`}>
          <h1>General Dashboard</h1>
        </Link>
        <input
          type="text"
          placeholder="Search by applicant name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul>
          {filteredApplications.map((application) => (
            <li key={application.id}>
              <div>
                <p>Applicant: {applicantNames[application.applicant_id]}</p>
                <p>Status: {application.status}</p>
                <p>Date of Submission: {application.date}</p>
                <button onClick={() => console.log("Comment")}>Comment</button>
                <button onClick={() => console.log("Assign Reviewers")}>
                  Assign Reviewers
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
    // <div>
    //   <h1>Applicant Dashboard</h1>
    //   <input
    //     type="text"
    //     placeholder="Search by name"
    //     value={searchTerm}
    //     onChange={handleSearch}
    //   />
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Status</th>
    //         <th>Date</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredApplicants.map((applicant) => (
    //         <tr key={applicant.id}>
    //           <td>{applicant.name}</td>
    //           <td>{applicant.status}</td>
    //           <td>{applicant.dateOfSubmission}</td>
    //         </tr>
    //       ))}
    //       z
    //     </tbody>
    //   </table>
    // </div>

    // {/* <button onClick={() => /* Handle comment functionality */}>
    //                   Comment
    //                 </button>
    //                 <button onClick={() => /* Handle assigning reviewers functionality */}>
    //                   Assign Reviewers
    //                 </button> */}
  );
};

export default Dashboard;
