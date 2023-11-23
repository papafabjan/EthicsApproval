import React, { useState } from 'react';

export const Pg3 = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const handleRadioChange = (event) => {
    if (event.target.value === 'other') {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherValue('');
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="ResearchProject">Title of the research project <span style={{ color: 'red' }}>*</span></label>
          <input type="text" className="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site" />
        </div>
        <div className="htmlForm-group">
                <label htmlFor="CoApplicantName">Co-Applicant Name(s)</label>    
                <p>If there are others who will do the research with you, coma separated</p>
                <input type="text" className="htmlForm-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="CoApplicantEmail">Co-Applicant email address(es)</label>
                <p>If there are others who will do the research with you, coma separated</p>
                <input type="text" className="htmlForm-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="StartDate">Proposed start date of the data collection <span style={{ color: 'red' }}>*</span></label>
                <input type="date" className="htmlForm-control" id="StartDate"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="EndDate">Anticipated end date of the data collection <span style={{ color: 'red' }}>*</span></label>
                <input type="date" className="htmlForm-control" id="EndDate" />
            </div>
            <div className="htmlForm-group">
                <label htmlFor="Fund">Is the project externally funded? <span style={{ color: 'red' }}>*</span></label>
                <p>If <strong>YES</strong>, please specify the funding body</p>
                <input type="text" className="htmlForm-control" id="Fund" placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="ProjectPlace">Where does the project take place? <span style={{ color: 'red' }}>*</span></label>
                <p>Select all that apply. If the country(ies) is not listed, please add them at the end</p>
                <input type="text" className="htmlForm-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
        
        <div className="form-group">
          <label htmlFor="HealthSocialCare">Is it a health and/or social care human-interventional study?<span style={{ color: 'red' }}>*</span></label>
          <div>
            <label>
              <input type="radio" name="HealthSocialCare" value="Yes" onChange={handleRadioChange} /> Yes
            </label>
            <label>
              <input type="radio" name="HealthSocialCare" value="No" onChange={handleRadioChange} /> No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="AnotherInstitution">Is it led by an institution other than the University of York Europe Campus?<span style={{ color: 'red' }}>*</span></label>
          <div>
            <label>
              <input type="radio" name="AnotherInstitution" value="Yes" onChange={handleRadioChange} /> No
            </label>
            <label>
              <input type="radio" name="AnotherInstitution" value="other" onChange={handleRadioChange} /> Other
            </label>
            {showOtherInput && (
              <div>
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherValue}
                  onChange={handleOtherInputChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="htmlForm-group">
                <label htmlFor="ProjectPlace">Involves human tissue?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="htmlForm-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="ProjectPlace">Clinical trial or a medical device study?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="htmlForm-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="htmlForm-group">
                <label htmlFor="ProjectPlace">Involves social care services provided by a local authority?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="htmlForm-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
        
      </form>
    </>
  );
};

export default Pg3;
