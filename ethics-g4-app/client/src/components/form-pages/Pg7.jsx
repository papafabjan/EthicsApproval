import { useState } from "react";
export const Pg7 = ({ formik, mode }) => {
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
        <label htmlFor="ListofQuestions">
          List of questions <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Upload your proposed list of questions (e.g., questionnaires, photos,
          interreview questions, etc) in any format.
        </p>
        <input
          type="file"
          name="ListofQuestions"
          className="form-control"
          id="ListofQuestions"
          onChange={(e) => handleFileChange(e, "ListofQuestions")}
          disabled={mode === "review" || mode === "view"}
        />

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

        <input
          type="file"
          multiple
          name="AdditionalForms"
          className="form-control"
          id="AdditionalForms"
          onChange={(e) => handleFilesChange(e, "AdditionalForms")}
        />

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
