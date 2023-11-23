import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch applicants from an API
  const fetchApplicants = async () => {
    try {
      const response = await fetch('API_ENDPOINT/applicants');
      if (response.ok) {
        const data = await response.json();
        setApplicants(data); // Assuming the data is an array of applicant objects
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []); // Fetch applicants on component mount

  // Function to handle search term changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtering applicants based on search term
  const filteredApplicants = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Applicant Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>
              <td>{applicant.status}</td>
              <td>{applicant.dateOfSubmission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
