import { useState } from "react";
import Comment from "../Comment";

export const Pg5 = ({ formik, mode }) => {
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
      {formik.values.VulnerableParticipants === "YesChildren_adolescents" ? (
        <>
          <h5>YesChildren got selected</h5>
          <div className="form-group">
            <label htmlFor="ParentalConsent">
              <h2>
                Parental Consent Form <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload a doc, docx or pdf. A template is available at this link.{" "}
              <strong>NOTE:</strong> If you edit your response & resubmit please
              name the new document indicating the new version (e.g.,
              title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="ParentalConsent"
              onChange={(e) => handleFileChange(e, "ParentalConsent")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ParentalConsent" field */}
            {mode === "review" && (
              <Comment
                fieldName="ParentalConsent"
                comment={formik.values.ParentalConsentComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
            
          </div>

          <div className="form-group">
            <label htmlFor="ParentalInformation">
              <h2>
                Parental Information Form{" "}
                <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload a doc, docx or pdf. A template is available at this link.{" "}
              <strong>NOTE:</strong> If you edit your response & resubmit please
              name the new document indicating the new version (e.g.,
              title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="ParentalInformation"
              onChange={(e) => handleFileChange(e, "ParentalInformation")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ParentalInformation" field */}
            {mode === "review" && (
              <Comment
                fieldName="ParentalInformation"
                comment={formik.values.ParentalInformationComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>

          <div className="form-group">
            <label htmlFor="ChildInformation">
              <h2>
                Child/Adolescent Information & Consent/Assent Form (optional)
              </h2>
            </label>
            <p>
              It is strongly recommended that if possible (depending on the
              child's competence) the child`s or under-age person`s free and
              voluntary informed consent/assent to participate is obtained. A
              template is available at this link. <strong>NOTE:</strong> If you
              edit your response & resubmit please name the new document
              indicating the new version (e.g., title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="ChildInformation"
              onChange={(e) => handleFileChange(e, "ChildInformation")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ChildInformation" field */}
            {mode === "review" && (
              <Comment
                fieldName="ChildInformation"
                comment={formik.values.ChildInformationComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>

          <div className="form-group">
            <label htmlFor="HeadTeacherConsent">
              <h2>Head Teacher Consent Form (optional)</h2>
            </label>
            <p>
              Upload a doc, docx or pdf. A template is available at this link.{" "}
              <strong>NOTE:</strong> If you edit your response & resubmit please
              name the new document indicating the new version (e.g.,
              title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="HeadTeacherConsent"
              onChange={(e) => handleFileChange(e, "HeadTeacherConsent")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "HeadTeacherConsent" field */}
            {mode === "review" && (
              <Comment
                fieldName="HeadTeacherConsent"
                comment={formik.values.HeadTeacherConsentComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>

          <div className="form-group">
            <label htmlFor="HeadteacherInformation">
              <h2>Head Teacher Information Form (optional)</h2>
            </label>
            <p>
              Upload a doc, docx, pdf, video or audio file. A template is
              available at this link. <strong>NOTE:</strong> If you edit your
              response & resubmit please name the new document indicating the
              new version (e.g., title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="HeadteacherInformation"
              onChange={(e) => handleFileChange(e, "HeadteacherInformation")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "HeadteacherInformation" field */}
            {mode === "review" && (
              <Comment
                fieldName="HeadteacherInformation"
                comment={formik.values.HeadteacherInformationComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>
        </>
      ) : formik.values.VulnerableParticipants === "YesAdultsMental" ? (
        <>
          <h5>YesAdultsMental got selected</h5>

          <div className="form-group">
            <label htmlFor="AccessibleConsentMaterial">
              <h2>
                `Accessible` Consent and Information Material{" "}
                <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload `accessible` consent and information material (e.g.,
              videos, diagrams/pictures), in any format, explaining the research
              for people who may struggle to understand some of the vocabulary
              used by researchers in spoken explanations or may be unable to
              read or write. <strong>NOTE:</strong> If you edit your response &
              resubmit please name the new document indicating the new version
              (e.g., title_v2.doc)
            </p>
            <input
              type="file"
              name="AccessibleConsentMaterial"
              className="form-control"
              id="AccessibleConsentMaterial"
              onChange={(e) => handleFileChange(e, "AccessibleConsentMaterial")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "AccessibleConsentMaterial" field */}
            {mode === "review" && (
              <Comment
                fieldName="AccessibleConsentMaterial"
                comment={formik.values.AccessibleConsentMaterialComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>

          <div className="form-group">
            <label htmlFor="ProxyConsentProcedures">
              <h2>
                Proxy or surrogate consent procedures{" "}
                <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload Proxy or Surrogate consent procedures, make sure that you
              have checked the legal framework in the country where you are
              conducting the research. <strong>NOTE:</strong> If you edit your
              response & resubmit please name the new document indicating the
              new version (e.g., title_v2.doc)
            </p>
            <input
              type="file"
              name="ProxyConsentProcedures"
              className="form-control"
              id="ProxyConsentProcedures"
              onChange={(e) => handleFileChange(e, "ProxyConsentProcedures")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ProxyConsentProcedures" field */}
            {mode === "review" && (
              <Comment
                fieldName="ProxyConsentProcedures"
                comment={formik.values.ProxyConsentProceduresComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>
        </>
      ) : formik.values.VulnerableParticipants === "" ? (
        <h1>You didn't select VulnerableParticipants</h1>
      ) : (
        <>
          <h5>NoAdults/Other Participants got selected</h5>

          <div className="form-group">
            <label htmlFor="ParticipantInformation">
              <h2>
                Participant Information Form{" "}
                <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload a doc, docx or pdf. A template of the Adult Information
              Form is available at this link. For EEG studies the additional
              information template form can be found at this link.{" "}
              <strong>NOTE:</strong> If you edit your response & resubmit please
              name the new document indicating the new version (e.g.,
              title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="ParticipantInformation"
              onChange={(e) => handleFileChange(e, "ParticipantInformation")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ParticipantInformation" field */}
            {mode === "review" && (
              <Comment
                fieldName="ParticipantInformation"
                comment={formik.values.ParticipantInformationComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ParticipantConsent">
              <h2>
                Participant Consent Form <span style={{ color: "red" }}>*</span>
              </h2>
            </label>
            <p>
              Upload a doc, docx or pdf. A template is available at this link.{" "}
              <strong>NOTE:</strong> If you edit your response & resubmit please
              name the new document indicating the new version (e.g.,
              title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="ParticipantConsent"
              onChange={(e) => handleFileChange(e, "ParticipantConsent")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ParticipantConsent" field */}
            {mode === "review" && (
              <Comment
                fieldName="ParticipantConsent"
                comment={formik.values.ParticipantConsentComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>

          <div className="form-group">
            <label htmlFor="ParticipantDebriefing">
              <h2>Debriefing Form (optional)</h2>
            </label>
            <p>
              If applicable, e.g., the study involves deception or may
              potentially cause stress or confusion. A template is available at
              this link. <strong>NOTE:</strong> If you edit your response &
              resubmit please name the new document indicating the new version
              (e.g., title_v2.doc){" "}
            </p>
            <input
              type="file"
              className="form-control"
              id="ParticipantDebriefing"
              onChange={(e) => handleFileChange(e, "ParticipantDebriefing")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "ParticipantDebriefing" field */}
            {mode === "review" && (
              <Comment
                fieldName="ParticipantDebriefing"
                comment={formik.values.ParticipantDebriefingComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
            
          </div>

          <div className="form-group">
            <label htmlFor="AccessibilityLetter">
              <h2>Accessibility Letter (Optional)</h2>
            </label>
            <p>
              Upload a doc, docx or pdf. <strong>NOTE:</strong> If you edit your
              response & resubmit please name the new document indicating the
              new version (e.g., title_v2.doc)
            </p>
            <input
              type="file"
              className="form-control"
              id="AccessibilityLetter"
              onChange={(e) => handleFileChange(e, "AccessibilityLetter")}
              disabled={mode === "review" || mode === "view"}
            />

            {/* Comment component for the "AccessibilityLetter" field */}
            {mode === "review" && (
              <Comment
                fieldName="AccessibilityLetter"
                comment={formik.values.AccessibilityLetterComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}

          </div>
        </>
      )}
    </>
  );
};

export default Pg5;
