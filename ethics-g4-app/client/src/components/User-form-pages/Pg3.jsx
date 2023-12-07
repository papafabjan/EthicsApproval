function Pg3({ formik }) {

  const handleFileChange = (event, initialValuesName) => {
    const file = event.target.files[0];
    formik.setFieldValue(initialValuesName, file);
    console.log(file)
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
        {formik.touched.AimsObjectives && formik.errors.AimsObjectives && (
          <div style={{ color: "red" }}>{formik.errors.AimsObjectives}</div>
        )}
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
        {formik.touched.Methodology && formik.errors.Methodology && (
          <div style={{ color: "red" }}>{formik.errors.Methodology}</div>
        )}
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
        {formik.touched.SafetyConcerns && formik.errors.SafetyConcerns && (
          <div style={{ color: "red" }}>{formik.errors.SafetyConcerns}</div>
        )}
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
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="SensitiveTopics"
                value="Yes"
                checked={formik.values.SensitiveTopics === "Yes"}
                onChange={formik.handleChange}
              />
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="SensitiveTopics"
                value="No"
                checked={formik.values.SensitiveTopics === "No"}
                onChange={formik.handleChange}
              />
              No
            </label>
          </li>
        </ul>
        {formik.touched.SensitiveTopics && formik.errors.SensitiveTopics && (
          <div style={{ color: "red" }}>{formik.errors.SensitiveTopics}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="SensitiveTopicsFiles">
          Sensitive Material/tools<span style={{ color: "red" }}>*</span>
        </label>
        <p>
        Upload up to 5 files (photos, questionnaires, interview questions etc.)  in any format
        </p>

        <label>
          <input
            type="file"
            name="SensitiveTopicsFiles"
            id="SensitiveTopicsFiles"
            onChange={(e) => handleFileChange(e, "SensitiveTopicsFiles")}
          />
        </label>
        {formik.touched.SensitiveTopicsFiles &&
          formik.errors.SensitiveTopicsFiles && (
            <div style={{ color: "red" }}>
              {formik.errors.SensitiveTopicsFiles}
            </div>
          )}
      </div>
      
    </>
  );
}

export default Pg3;
