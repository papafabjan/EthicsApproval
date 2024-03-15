import React, { useState } from "react";
import Comment from "../Comment";

export const Pg6 = ({ formik, emphasizeFields, mode }) => {
  return (
    <>
    <div className="form-container">

      <div className="form-group">
        <label htmlFor="DataProcessing">
          Data Processing <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Will you be processing (i.e. collecting, recording, storing, or
          otherwise using) personal data as part of this project? (Personal data
          is any information relating to an identified or identifiable living
          person). If the intention is to record the participants' voice, or
          make a photographic record of the participants (either still images or
          video recordings) then further details on what will be recorded and
          how they will be managed are required.
        </p>
        <input
          type="text"
          name="DataProcessing"
          className="form-control"
          id="DataProcessing"
          value={formik.values.DataProcessing}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Write your answer"
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "DataProcessing" field */}
        {mode === "review" && (
          <Comment
            fieldName="DataProcessing"
            comment={formik.values.DataProcessingComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="DataConfidentiality">
          Data Confidentiality <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          What measures will be put in place to ensure confidentiality of
          personal data, where appropriate?{" "}
        </p>
        <input
          type="text"
          name="DataConfidentiality"
          className="form-control"
          id="DataConfidentiality"
          value={formik.values.DataConfidentiality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Write your answer"
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "DataConfidentiality" field */}
        {mode === "review" && (
          <Comment
            fieldName="DataConfidentiality"
            comment={formik.values.DataConfidentialityComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="DataStorageandSecurity">
          Data Storage and Security <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Who will have access to the data generated at each stage of the
          research, and in what form? What steps will be taken to ensure the
          security of data processed during the project, including any
          identifiable personal data, other than those already described earlier
          in this form? Indicate if, and when, all identifiable personal data
          will be destroyed once the project has ended.
        </p>
        <input
          type="text"
          name="DataStorageandSecurity"
          className="form-control"
          id="DataStorageandSecurity"
          value={formik.values.DataStorageandSecurity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Write your answer"
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "DataStorageandSecurity" field */}
        {mode === "review" && (
          <Comment
            fieldName="DataStorageandSecurity"
            comment={formik.values.DataStorageandSecurityComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>
    </div>
    </>
  );
};
export default Pg6;
