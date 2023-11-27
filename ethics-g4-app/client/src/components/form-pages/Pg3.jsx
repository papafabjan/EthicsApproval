import { Button } from "../../styled/Form.styled";
import React, { useState } from "react";



function Pg3({ formik }) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showOtherCheckBoxInput, setShowOtherCheckBoxInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [otherCheckBoxValue, setOtherCheckBoxValue] = useState("");

  const handleRadioChange = (event) => {
    if (event.target.value === "other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherValue("");
    }
  };

  const handleCheckBoxChange = (event) => {
    if (event.target.value === "other" && event.target.checked) {
      setShowOtherCheckBoxInput(true);
    } else {
      setShowOtherCheckBoxInput(false);
      setOtherCheckBoxValue("");
    }
  };

  const handleOtherCheckBoxInputChange = (event) => {
    setOtherCheckBoxValue(event.target.value);
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="ResearchProject">
          Title of the research project <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="ResearchProject"
          placeholder="e.g. Ethics web-site"
        />
      </div>
      <div className="htmlForm-group">
        <label htmlFor="CoApplicantName">Co-Applicant Name(s)</label>
        <p>
          If there are others who will do the research with you, coma separated
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApllicantName"
          placeholder="e.g. Kostas Dimopoulos"
        />
      </div>
      <div className="htmlForm-group">
        <label htmlFor="CoApplicantEmail">Co-Applicant email address(es)</label>
        <p>
          If there are others who will do the research with you, coma separated
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantEmail"
          placeholder="eg. kdimopoulos@york.citycollege.eu"
        />
      </div>
      <div className="htmlForm-group">
        <label htmlFor="StartDate">
          Proposed start date of the data collection{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <input type="date" className="form-control" id="StartDate" />
      </div>
      <div className="htmlForm-group">
        <label htmlFor="EndDate">
          Anticipated end date of the data collection{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <input type="date" className="form-control" id="EndDate" />
      </div>
      <div className="htmlForm-group">
        <label htmlFor="Fund">
          Is the project externally funded?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          If <strong>YES</strong>, please specify the funding body
        </p>
        <li>
          <label>
            <input
              type="radio"
              name="Fund"
              value="Yes"
              onChange={handleRadioChange}
            />{" "}
            No Funding
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="Fund"
              value="other"
              onChange={handleRadioChange}
            />{" "}
            Other
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
        </li>
      </div>
      <div className="htmlForm-group">
        <label htmlFor="ProjectPlace">
          Where does the project take place?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Select all that apply. If the country(ies) is not listed, please add
          them at the end
        </p>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                className="htmlForm-control"
                value="Bulgaria"
              />
              Bulgaria
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                className="htmlForm-control"
                id="ProjectPlace"
              />
              Greece
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                className="htmlForm-control"
                id="Project"
              />
              Romania
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                className="htmlForm-control"
                value="other"
                onChange={handleCheckBoxChange}
              />
              Other
            </label>
            {showOtherCheckBoxInput && (
              <div>
                <input
                  type="text"
                  className="htmlForm-control"
                  value={otherCheckBoxValue}
                  onChange={handleOtherCheckBoxInputChange}
                  placeholder="Please specify other countries"
                />
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="form-group">
        <label htmlFor="HealthSocialCare">
          Is it a health and/or social care human-interventional study?
          <span style={{ color: "red" }}>*</span>
        </label>
        <div>
          <li>
            <label>
              <input
                type="radio"
                name="HealthSocialCare"
                value="Yes"
                onChange={handleRadioChange}
              />{" "}
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="HealthSocialCare"
                value="No"
                onChange={handleRadioChange}
              />{" "}
              No
            </label>
          </li>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="AnotherInstitution">
          Is it led by an institution other than the University of York Europe
          Campus?<span style={{ color: "red" }}>*</span>
        </label>
        <div>
          <li>
            <label>
              <input
                type="radio"
                name="AnotherInstitution"
                value="Yes"
                onChange={handleRadioChange}
              />{" "}
              No
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="AnotherInstitution"
                value="other"
                onChange={handleRadioChange}
              />{" "}
              Other
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
          </li>
        </div>
      </div>
      <div className="htmlForm-group">
        <label htmlFor="HumanTissue">
          Involves human tissue?<span style={{ color: "red" }}>*</span>
        </label>
        <li>
          <label>
            <input
              type="radio"
              name="HumanTissue"
              value="Yes"
              onChange={handleRadioChange}
            />{" "}
            Yes
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="HumanTissue"
              value="No"
              onChange={handleRadioChange}
            />{" "}
            No
          </label>
        </li>
      </div>
      <div className="htmlForm-group">
        <label htmlFor="ClinicalMedical">
          Clinical trial or a medical device study?
          <span style={{ color: "red" }}>*</span>
        </label>
        <li>
          <label>
            <input
              type="radio"
              name="ClinicalMedical"
              value="Yes"
              onChange={handleRadioChange}
            />{" "}
            Yes
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="ClinicalMedical"
              value="No"
              onChange={handleRadioChange}
            />{" "}
            No
          </label>
        </li>
      </div>
      <div className="htmlForm-group">
        <label htmlFor="SocialCareServices">
          Involves social care services provided by a local authority?
          <span style={{ color: "red" }}>*</span>
        </label>
        <li>
          <label>
            <input
              type="radio"
              name="SocialCareServices"
              value="Yes"
              onChange={handleRadioChange}
            />{" "}
            Yes
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="SocialCareServices"
              value="No"
              onChange={handleRadioChange}
            />{" "}
            No
          </label>
        </li>
      </div>
      <Button onClick={formik.handleSubmit}>Back</Button>
      <Button onClick={formik.handleSubmit}>Next</Button>
    </>
  );
}

export default Pg3;
