
function Pg3({ formik, emphasizeFields, mode }) {
  const [comment, setComment] = useState("");

  const handleCommentSave = (fieldName) => {
    // Save the comment to formik or perform any other actions as needed
    formik.setValues({
      ...formik.values,
      [fieldName]: comment,
    });
  };
  
   const handleFilesChange = (event, initialValuesName) => {
    const files = event.target.files;
    formik.setFieldValue(initialValuesName, files);
    console.log(files);
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
          style={{
            borderColor:
              emphasizeFields?.AimsObjectives && formik.touched?.AimsObjectives
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "AimsObjectives" field */}
        {mode === "review" && (
          <Comment
            fieldName="AimsObjectives"
            comment={formik.values.AimsObjectivesComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
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
          style={{
            borderColor:
              emphasizeFields?.Methodology && formik.touched?.Methodology
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "Methodology" field */}
        {mode === "review" && (
          <Comment
            fieldName="Methodology"
            comment={formik.values.MethodologyComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
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
          style={{
            borderColor:
              emphasizeFields?.SafetyConcerns && formik.touched?.SafetyConcerns
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "SafetyConcerns" field */}
        {mode === "review" && (
          <Comment
            fieldName="SafetyConcerns"
            comment={formik.values.SafetyConcernsComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
        {formik.touched.SafetyConcerns && formik.errors.SafetyConcerns && (
          <div style={{ color: "red" }}>{formik.errors.SafetyConcerns}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="SensitiveTopics">
          Does the research involve potentially highly sensitive topics?
          <span style={{ color: "red" }}>*</span>
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
                disabled={mode === "review" || mode === "view"}
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
                disabled={mode === "review" || mode === "view"}
              />
              No
            </label>
          </li>
          {/* Comment component for the "SensitiveTopics" field */}
          {mode === "review" && (
            <Comment
              fieldName="SensitiveTopics"
              comment={formik.values.SensitiveTopicsComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
        {formik.touched.SensitiveTopics && formik.errors.SensitiveTopics && (
          <div style={{ color: "red" }}>{formik.errors.SensitiveTopics}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="SensitiveTopicsFiles">
          Sensitive Material/tools<span style={{ color: "red" }}>*</span>
        </label>

        <input
          type="file"
          multiple
          name="SensitiveTopicsFiles"
          className="form-control"
          id="SensitiveTopicsFiles"
          onChange={(e) => handleFilesChange(e, "SensitiveTopicsFiles")}
        />

        {/* Comment component for the "SensitiveMaterialFiles" field */}
        {mode === "review" && (
          <Comment
            fieldName="SensitiveMaterialFiles"
            comment={formik.values.SensitiveMaterialFilesComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}

        {formik.touched.SensitiveMaterialFiles &&
          formik.errors.SensitiveMaterialFiles && (
            <div style={{ color: "red" }}>
              {formik.errors.SensitiveMaterialFiles}
            </div>
          )}
      </div>
    </>
  );
}

export default Pg3;
