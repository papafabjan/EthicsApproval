


function Pg3({ formik }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="ResearchProject">
          Aims & Objectives <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Try to explain this in very simple terms. Do not copy-paste your
          research proposal
        </p>
        <input
          type="text"
          className="form-control"
          id="ResearchProject"
          placeholder="e.g. Ethics web-site"
        />
      </div>
      <div className="form-group">
        <label htmlFor="CoApplicantName">
          Methodology <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          What will the participant have to do? Provide a very brief outline of
          the procedure. Also provide an estimate of how long you expect a
          typical testing session to last. If the study involves potentially
          sensitive materials make sure you attach them to your submission
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApllicantName"
          placeholder="e.g. Kostas Dimopoulos"
        />
      </div>
      <div className="form-group">
        <label htmlFor="CoApplicantEmail">
          Safety concerns <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Who will be testing the participants? Raises personal safety issues
          for the researcher/s? If yes, how will this be managed to ensure
          appropriate protection and well-being of the researcher/s?
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantEmail"
          placeholder="eg. kdimopoulos@york.citycollege.eu"
        />
      </div>
      <div className="form-group">
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
          e.g., it includes stimuli designed to be emotive or aversive; It
          requires participants to ingest substances (e.g., alcohol); It
          requires participants to give information of a personal nature (e.g.,
          ethnicity, religion, sexual orientation); it uses deception
        </p>
        <input type="text" className="form-control" id="StartDate" />
      </div>
      <div className="form-group">
        <label htmlFor="StartDate">
          Sensitive Material/tools <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Upload up to 5 files (photos, questionnaires, interview questions
          etc.) in any format
        </p>
        <input type="file" className="form-control" id="StartDate" />
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
    </>
  );
}

export default Pg3;
