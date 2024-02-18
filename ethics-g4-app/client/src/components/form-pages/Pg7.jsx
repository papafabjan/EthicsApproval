import { useState, useEffect } from "react";

import Comment from "../Comment";
import { useParams } from "react-router-dom";

export const Pg7 = ({ formik, emphasizeFields, mode }) => {
  const { applicationId } = useParams();
  // Get the file names from formik values
  const [initialListofQuestionsFileNames, setInitialListofQuestionsFileNames] =
    useState(null);
  const [initialAdditionalFormsFileNames, setInitialAdditionalFormsFileNames] =
    useState(null);

  useEffect(() => {
    // Set initial file names when component mounts
    setInitialListofQuestionsFileNames(formik.values.ListofQuestionsFileNames);
    setInitialAdditionalFormsFileNames(formik.values.AdditionalFormsFileNames);
  }, []);
  const generateFileLinks = (fileNames) => {
    if (!fileNames) {
      return null;
    }
    const links = fileNames.split(",").map((fileName, index) => (
      <div key={index}>
        <a
          href={
            applicationId
              ? `${
                  import.meta.env.VITE_SERVER_URL
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

  const handleFileChange = (event, initialValuesName) => {
    const file = event.target.files[0];
    formik.setFieldValue(initialValuesName, file);

    // Update file names array
    formik.setFieldValue(`${initialValuesName}FileNames`, [file.name]);
  };

  const handleFilesChange = (event, initialValuesName) => {
    const files = event.target.files;
    formik.setFieldValue(initialValuesName, files);

    // Update file names array
    const fileNames = Array.from(files).map((file) => file.name);
    formik.setFieldValue(`${initialValuesName}FileNames`, fileNames);
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="ListofQuestions">
          List of questions <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Upload your proposed list of questions (e.g., questionnaires, photos,
          interreview questions, etc) in any format.
        </p>
        {(mode === "apply" || mode === "edit") && (
          <input
            type="file"
            name="ListofQuestions"
            className="form-control"
            id="ListofQuestions"
            onChange={(e) => handleFileChange(e, "ListofQuestions")}
            disabled={mode === "review" || mode === "view"}
          />
        )}

        {mode !== "apply" && initialListofQuestionsFileNames && (
          <>
            <h4>Uploaded Files:</h4>
            {mode === "edit" && (
              <h6>
                Keep in mind this is only a preview of what was uploaded
                originally. Please re-upload the files using the file inputs if
                you wish to modify your application
              </h6>
            )}
            {generateFileLinks(initialListofQuestionsFileNames)}
          </>
        )}
        {/* Comment component for the "ListofQuestions" field */}
        {mode === "review" && (
          <Comment
            fieldName="ListofQuestions"
            comment={formik.values.ListofQuestionsComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="AdditionalForms">
          Any additional forms /documents you need to submit (optional)
        </label>
        {(mode === "apply" || mode === "edit") && (
          <input
            type="file"
            multiple
            name="AdditionalForms"
            className="form-control"
            id="AdditionalForms"
            onChange={(e) => handleFilesChange(e, "AdditionalForms")}
            disabled={mode === "review" || mode === "view"}
          />
        )}

        {mode !== "apply" &&
          initialAdditionalFormsFileNames && (
            <>
              <h4>Uploaded Files:</h4>
              {mode === "edit" && (
                <h6>
                  Keep in mind this is only a preview of what was uploaded
                  originally. Please re-upload the files using the file inputs
                  if you wish to modify your application
                </h6>
              )}
              {generateFileLinks(initialAdditionalFormsFileNames)}
            </>
          )}

        {/* Comment component for the "AdditionalForms" field */}
        {mode === "review" && (
          <Comment
            fieldName="AdditionalForms"
            comment={formik.values.AdditionalFormsComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>
    </>
  );
};
export default Pg7;
