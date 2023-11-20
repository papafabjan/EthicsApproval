import React, { useState } from 'react';

const SupervisorOptionsList = () => {
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [otherSupervisor, setOtherSupervisor] = useState('');

  const supervisors = [
    'Kostas Dimopoulos <k.dimopoulos@york.citycollege.eu>','Dimitris Dranidis <dranidis@york.citycollege.eu>','Odysseas Efremidis <oefremidis@athtech.gr>','Dimitris Irakleous <diracleous@athtech.gr>','Petros Kefalas <kefalas@york.citycollege.eu>',
    'Panagiotis Ketikidis <ketikidis@york.citycollege.eu>','Evi Mattheopoulou <emattheopoulou@york.citycollege.eu>','Ioannis Nikolakopoulos <jnikolakopoulos@athtech.gr>','Iraklis Paraskakis <paraskakis@york.citycollege.eu>','Anna Sotiriadou <sotiriadou@york.citycollege.eu>',
    'Ioanna Stamatopoulou <istamatopoulou@york.citycollege.eu>','Thomas Varsamidis <tvarsamidis@athtech.gr>','Simos Veloudis <s.veloudis@york.citycollege.eu>'
  ];

  const handleSupervisorChange = (supervisor) => {
    setSelectedSupervisor(supervisor);

    // If the selected supervisor is 'Other', clear the otherSupervisor state
    if (supervisor !== 'Other') {
      setOtherSupervisor('');
    }
  };

  const handleOtherSupervisorChange = (event) => {
    setOtherSupervisor(event.target.value);
  };

  return (
    <div>
      <ul className="list-group">
        {supervisors.map((supervisor) => (
          <li
            key={supervisor}
            className={`list-group-item ${selectedSupervisor === supervisor ? 'active' : ''}`}
            onClick={() => handleSupervisorChange(supervisor)}
          >
            {supervisor}
          </li>
        ))}
        <li
          className={`list-group-item ${selectedSupervisor === 'Other' ? 'active' : ''}`}
          onClick={() => handleSupervisorChange('Other')}
        >
          Other
        </li>
      </ul>

      {/* Show input field only if 'Other' is selected */}
      {selectedSupervisor === 'Other' && (
        <div className="mt-3">
          <label htmlFor="otherSupervisor">Enter other supervisor:</label>
          <input
            type="text"
            id="otherSupervisor"
            className="form-control"
            value={otherSupervisor}
            onChange={handleOtherSupervisorChange}
          />
        </div>
      )}

      <div className="mt-3">
        <p>
          Selected Supervisor:{' '}
          {selectedSupervisor === 'Other' ? otherSupervisor : selectedSupervisor}
        </p>
      </div>
    </div>
  );
};

export default SupervisorOptionsList;
