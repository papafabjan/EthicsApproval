import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const ApplicationHistory = ({ applicationId }) => {
  // State to store the fetched data
  const [historyData, setHistoryData] = useState([]);
  // State to store success or failure message
  const [message, setMessage] = useState("");

 useEffect(() => {
   const fetchHistory = async () => {
     try {
       const url = `${
         import.meta.env.VITE_SERVER_URL
       }/api/applications/${parseInt(applicationId)}/history`;

       const response = await fetch(url);

       if (!response.ok) {
         setMessage(response.statusText);
         throw new Error(`Error fetching history: ${response.statusText}`);
       }

       const data = await response.json();
       setHistoryData(data.history);
     } catch (error) {
       console.error(error.message);
       return "Unknown";
     }
   };
   fetchHistory();
 }, [applicationId]);


  return (
    <div>
      <h2>Application History</h2>
      {message && <p>{message}</p>}
      {historyData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Date / Time</th>
              <th>Status</th>
              <th>Actor ID</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.application_id}</td>
                <td> {format(new Date(entry.date), "dd/MM/yyyy, HH:mm:ss")}</td>
                <td>{entry.status}</td>
                <td>{entry.actor_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ApplicationHistory;
