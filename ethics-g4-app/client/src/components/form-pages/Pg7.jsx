import Dropzone from "react-dropzone";
import Thumb from "../Thumb";
import React, { useState } from "react";
import Comment from "../Comment";

const dropzoneStyle = {
  width: "100%",
  minHeight: "100px",
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export const Pg7 = ({ formik, mode }) => {
  const [comment, setComment] = useState("");

  const handleCommentSave = (fieldName) => {
    // Save the comment to formik or perform any other actions as needed
    formik.setValues({
      ...formik.values,
      [fieldName]: comment,
    });
  };
  const handleFileChange = (event, initialValuesName) => {
    const file = event.target.files[0];
    formik.setFieldValue(initialValuesName, file);
    console.log(file);
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
          disabled={mode === "review"}
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
        <Thumb file={formik.values.ListofQuestions} />
      </div>

      <div className="form-group">
        <label htmlFor="AdditionalForms">
          Any additional forms /documents you need to submit (optional)
        </label>

        <Dropzone
          style={dropzoneStyle}
          disabled={mode === "review"}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles);

            if (acceptedFiles.length === 0) {
              return;
            }

            formik.setFieldValue(
              "AdditionalForms",
              formik.values.AdditionalForms.concat(acceptedFiles)
            );
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Upload up to 10 files (e.g., questionnaires, photos,
                  interreview questions, etc) in any format.
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        {/* {formik.values.AdditionalForms.map((file, i) => (
          <Thumb key={i} file={file} />
        ))} */}
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
