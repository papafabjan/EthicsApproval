import React, { useState } from 'react';

const OptionsList = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [otherInput, setOtherInput] = useState('');

  const options = ['MSc Business Informatics and Management (MBIT)', 'MSc in Web and Mobile Development', 'MSc in Software Development', 'MSc in AI and Data Science', 'MSc in Advanced Software Engineering', 'BSc (any track)'];

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    // If the selected option is 'Other', clear the otherInput state
    if (option === 'BSc (any track)') {
      setOtherInput('');
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherInput(event.target.value);
  };

  return (
    <div>
      <ul className="list-group">
        {options.map((option) => (
          <li
            key={option}
            className={`list-group-item ${selectedOption === option ? 'active' : ''}`}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Show input field only if 'Other' is selected */}
      {selectedOption === 'BSc (any track)' && (
        <div className="mt-3">
          <label htmlFor="otherInput">Enter what track you are in:</label>
          <input
            type="text"
            id="otherInput"
            className="form-control"
            value={otherInput}
            onChange={handleOtherInputChange}
          />
        </div>
      )}

      <div className="mt-3">
        <p>Selected Option: {selectedOption === 'BSc (any track)' ? otherInput : selectedOption}</p>
      </div>
    </div>
  );
};

export default OptionsList;