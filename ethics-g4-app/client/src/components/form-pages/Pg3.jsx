


function Pg3({ formik }) {
  const handleRadioChange = (e, radio) => {
    formik.handleChange(e);

  };
  
  return (
    <>
      <div className="form-group">
        <label htmlFor="AimsObjectives">
          Aims & Objectives <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Try to explain this in very simple terms. Do not copy-paste your
          research proposal
        </p>
        <input
          type="text"
          className="form-control"
          name="AimsObjectives"
          id="AimsObjectives"
          placeholder="Type here for Aims & Objectives"
          value={formik.values.AimsObjectives}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Methodology">
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
          name="Methodology"
          className="form-control"
          id="Methodology"
          placeholder="Type here about Methodology"
          value={formik.values.Methodology}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="form-group">
        <label htmlFor="SafetyConcerns">
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
          name="SafetyConcerns"
          id="SafetyConcerns"
          placeholder="type here about safety concerns"
          value={formik.values.SafetyConcerns}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    
      <div className="form-group">
        <label htmlFor="SensitiveTopics">
        Does the research involve potentially highly sensitive topics?<span style={{ color: "red" }}>*</span>
  
        </label>
        <p>
          e.g., it includes stimuli designed to be emotive or aversive; It
          requires participants to ingest substances (e.g., alcohol); It
          requires participants to give information of a personal nature (e.g.,
          ethnicity, religion, sexual orientation); it uses deception
        </p>

        <label>
          <input
            type="radio"
            name="SensitiveTopics"
            value="Yes"
            checked={formik.values.SensitiveTopics === "Yes"}
            onChange={(e) => handleRadioChange(e, "otherOption")}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="SensitiveTopics"
            value="No"
            checked={formik.values.SensitiveTopics === "No"}
            onChange={(e) => handleRadioChange(e)}
          />
          No
        </label>

      </div>
      
    </>
  );
}

export default Pg3;
