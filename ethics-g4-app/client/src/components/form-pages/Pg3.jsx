import { useState, useEffect } from "react";
import Comment from "../Comment";
import { useParams } from "react-router-dom";

function Pg3({ formik, emphasizeFields, mode }) {
  const { applicationId } = useParams();
  // Get the file names from formik values
  const [initialSensitiveTopicsFilesNames, setInitialSensitiveTopicsFilesNames] =
    useState(null);

  useEffect(() => {
    // Set initial file names when component mounts
    setInitialSensitiveTopicsFilesNames(
      formik.values.SensitiveTopicsFilesFileNames
    );
  }, []);
  // Function to generate links for uploaded files
  const generateFileLinks = (fileNames) => {
    // Check if fileNames is undefined or null
    if (!fileNames) {
      return null; // or handle the case in an appropriate way
    }

    const links = fileNames.split(",").map((fileName, index) => (
      <div key={index}>
        <a
          href={
            applicationId
              ? `${import.meta.env.VITE_SERVER_URL
              }/submitFiles/application_id_${applicationId}/${fileName}`
              : ""
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {fileName}
        </a>
      </div>
    ));
    return links;
  };

  const handleFilesChange = (event, initialValuesName) => {
    const files = event.target.files;

    if (files.length === 0) {
      // No files selected
      console.log("No files selected");
    } else {
      // Files selected
      console.log("Files selected:", files);
    }


    formik.setFieldValue(initialValuesName, files);

    // Update file names array
    const fileNames = Array.from(files).map((file) => file.name);
    formik.setFieldValue(`${initialValuesName}FileNames`, fileNames);

  };

  return (
    <>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="AimsObjectives">
            Aims & Objectives <span style={{ color: "red" }}>*</span>
          </label>
          <p>
            Try to explain this in very simple terms. Do not copy-paste your
            research proposal
          </p>
          <textarea
            type="text"
            className="form-control"
            name="AimsObjectives"
            id="AimsObjectives"
            placeholder="Type here for Aims & Objectives"
            value={formik.values.AimsObjectives}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // style={{
            //   borderColor:
            //     emphasizeFields?.AimsObjectives &&
            //       formik.touched?.AimsObjectives
            //       ? "red"
            //       : "",
            //       resize: "none"
            // }}
            disabled={mode === "review" || mode === "view"}
            rows={6} 
            cols={50} 
          />

          {/* {formik.touched.AimsObjectives && formik.errors.AimsObjectives && (
            <div style={{ color: "red" }}>{formik.errors.AimsObjectives}</div>
          )} */}

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

        </div>

        <div className="form-group">
          <label htmlFor="Methodology">
            Methodology <span style={{ color: "red" }}>*</span>
          </label>
          <p>
            What will the participant have to do? Provide a very brief outline
            of the procedure. Also provide an estimate of how long you expect a
            typical testing session to last. If the study involves potentially
            sensitive materials make sure you attach them to your submission
          </p>
          <textarea
            type="text"
            name="Methodology"
            className="form-control"
            id="Methodology"
            placeholder="Type here about Methodology"
            value={formik.values.Methodology}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // style={{
            //   borderColor:
            //     emphasizeFields?.Methodology && formik.touched?.Methodology
            //       ? "red"
            //       : "",
            //       resize: "none"
            // }}
            disabled={mode === "review" || mode === "view"}
            rows={6} 
            cols={50} 
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
          {/* {formik.touched.Methodology && formik.errors.Methodology && (
            <div style={{ color: "red" }}>{formik.errors.Methodology}</div>
          )} */}
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
          <textarea
            type="text"
            className="form-control"
            name="SafetyConcerns"
            id="SafetyConcerns"
            placeholder="type here about safety concerns"
            value={formik.values.SafetyConcerns}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // style={{
            //   borderColor:
            //     emphasizeFields?.SafetyConcerns &&
            //       formik.touched?.SafetyConcerns
            //       ? "red"
            //       : "",
            //       resize: "none"
            // }}
            disabled={mode === "review" || mode === "view"}
            rows={6} 
            cols={50} 
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
          {/* {formik.touched.SafetyConcerns && formik.errors.SafetyConcerns && (
            <div style={{ color: "red" }}>{formik.errors.SafetyConcerns}</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="SensitiveTopics">
            Does the research involve potentially highly sensitive topics?
            <span style={{ color: "red" }}>*</span>
          </label>
          <p>
            e.g., it includes stimuli designed to be emotive or aversive; It
            requires participants to ingest substances (e.g., alcohol); It
            requires participants to give information of a personal nature
            (e.g., ethnicity, religion, sexual orientation); it uses deception
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
          {/* {formik.touched.SensitiveTopics && formik.errors.SensitiveTopics && (
            <div style={{ color: "red" }}>{formik.errors.SensitiveTopics}</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="SensitiveTopicsFiles">
            Sensitive Material/tools<span style={{ color: "red" }}>*</span>
          </label>

          {(mode === "apply" || mode === "edit") && (
            <input
              type="file"
              multiple
              name="SensitiveTopicsFiles"
              className="form-control"
              id="SensitiveTopicsFiles"
              onChange={(e) => handleFilesChange(e, "SensitiveTopicsFiles")}
              disabled={mode === "review" || mode === "view"}
            />
          )}

          {mode !== "apply" && initialSensitiveTopicsFilesNames && (
            <>
              <h4>Uploaded Files:</h4>
              {mode === "edit" && (
                <h6>
                  Keep in mind this is only a preview of what was uploaded
                  originally. Please re-upload the files using the file inputs
                  if you wish to modify your application
                </h6>
              )}
              {generateFileLinks(initialSensitiveTopicsFilesNames)}
            </>
          )}

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


          {/* {formik.touched.SensitiveTopicsFiles &&
            formik.errors.SensitiveTopicsFiles && (
              <div style={{ color: "red" }}>
                {formik.errors.SensitiveTopicsFiles}
              </div>
            )} */}

        </div>
      </div>
    </>
  );
}

export default Pg3;
