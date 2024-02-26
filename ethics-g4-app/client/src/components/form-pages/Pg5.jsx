import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment";

export const Pg5 = ({ formik, emphasizeFields, mode }) => {
  const { applicationId } = useParams();

  // Get the file names from formik values
  const [initialParentalConsent, setInitialParentalConsent] = useState(null);
  const [initialParentalInformation, setInitialParentalInformation] =
    useState(null);
  const [initialChildInformation, setInitialChildInformation] = useState(null);
  const [initialHeadTeacherConsent, setInitialHeadTeacherConsent] =
    useState(null);
  const [initialHeadteacherInformation, setInitialHeadteacherInformation] =
    useState(null);
  const [
    initialAccessibleConsentMaterial,
    setInitialAccessibleConsentMaterial,
  ] = useState(null);
  const [initialProxyConsentProcedures, setInitialProxyConsentProcedures] =
    useState(null);
  const [initialParticipantInformation, setInitialParticipantInformation] =
    useState(null);
  const [initialParticipantConsent, setInitialParticipantConsent] =
    useState(null);
  const [initialParticipantDebriefing, setInitialParticipantDebriefing] =
    useState(null);
  const [initialAccessibilityLetter, setInitialAccessibilityLetter] =
    useState(null);

  useEffect(() => {
    // Set initial file names when component mounts
    setInitialParentalConsent(formik.values.ParentalConsentFileNames);
    setInitialParentalInformation(formik.values.ParentalInformationFileNames);
    setInitialChildInformation(formik.values.ChildInformationFileNames);
    setInitialHeadTeacherConsent(formik.values.HeadTeacherConsentFileNames);
    setInitialHeadteacherInformation(
      formik.values.HeadteacherInformationFileNames
    );
    setInitialAccessibleConsentMaterial(
      formik.values.AccessibleConsentMaterialFileNames
    );
    setInitialProxyConsentProcedures(
      formik.values.ProxyConsentProceduresFileNames
    );
    setInitialParticipantInformation(
      formik.values.ParticipantInformationFileNames
    );
    setInitialParticipantConsent(formik.values.ParticipantConsentFileNames);
    setInitialParticipantDebriefing(
      formik.values.ParticipantDebriefingFileNames
    );
    setInitialAccessibilityLetter(formik.values.AccessibilityLetterFileNames);
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

  return (
    <>
      {formik.values.VulnerableParticipants === "YesChildren_adolescents" ? (
        <>
          <h5>Children or adolescents got selected</h5>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="ParentalConsent">
                <h2>
                  Parental Consent Form <span style={{ color: "red" }}>*</span>
                </h2>
              </label>
              <p>
                Upload a doc, docx or pdf. A template is available at this link.{" "}
                <strong>NOTE:</strong> If you edit your response & resubmit
                please name the new document indicating the new version (e.g.,
                title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="ParentalConsent"
                onChange={(e) => handleFileChange(e, "ParentalConsent")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialParentalConsent && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialParentalConsent)}
                </>
              )}
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
                <strong>NOTE:</strong> If you edit your response & resubmit
                please name the new document indicating the new version (e.g.,
                title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="ParentalInformation"
                onChange={(e) => handleFileChange(e, "ParentalInformation")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialParentalInformation && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialParentalInformation)}
                </>
              )}
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
                template is available at this link. <strong>NOTE:</strong> If
                you edit your response & resubmit please name the new document
                indicating the new version (e.g., title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="ChildInformation"
                onChange={(e) => handleFileChange(e, "ChildInformation")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialChildInformation && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialChildInformation)}
                </>
              )}
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
                <strong>NOTE:</strong> If you edit your response & resubmit
                please name the new document indicating the new version (e.g.,
                title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="HeadTeacherConsent"
                onChange={(e) => handleFileChange(e, "HeadTeacherConsent")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialHeadTeacherConsent && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialHeadTeacherConsent)}
                </>
              )}
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
              {mode !== "apply" && initialHeadteacherInformation && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialHeadteacherInformation)}
                </>
              )}
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
          </div>
        </>
      ) : formik.values.VulnerableParticipants === "YesAdultsMental" ? (
        <>
          <h5>Adults with mental disabilities got selected</h5>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="AccessibleConsentMaterial">
                <h2>
                  `Accessible` Consent and Information Material{" "}
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </label>
              <p>
                Upload `accessible` consent and information material (e.g.,
                videos, diagrams/pictures), in any format, explaining the
                research for people who may struggle to understand some of the
                vocabulary used by researchers in spoken explanations or may be
                unable to read or write. <strong>NOTE:</strong> If you edit your
                response & resubmit please name the new document indicating the
                new version (e.g., title_v2.doc)
              </p>
              <input
                type="file"
                name="AccessibleConsentMaterial"
                className="form-control"
                id="AccessibleConsentMaterial"
                onChange={(e) =>
                  handleFileChange(e, "AccessibleConsentMaterial")
                }
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialAccessibleConsentMaterial && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialAccessibleConsentMaterial)}
                </>
              )}
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
              {mode !== "apply" && initialProxyConsentProcedures && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialProxyConsentProcedures)}
                </>
              )}
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
          </div>
        </>
      ) : formik.values.VulnerableParticipants === "" ? (
        <h1>You didn't select VulnerableParticipants</h1>
      ) : (
        <>
          <h5>Healthy adults or other participants got selected</h5>
          <div className="form-container">
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
                <strong>NOTE:</strong> If you edit your response & resubmit
                please name the new document indicating the new version (e.g.,
                title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="ParticipantInformation"
                onChange={(e) => handleFileChange(e, "ParticipantInformation")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialParticipantInformation && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialParticipantInformation)}
                </>
              )}
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
                  Participant Consent Form{" "}
                  <span style={{ color: "red" }}>*</span>
                </h2>
              </label>
              <p>
                Upload a doc, docx or pdf. A template is available at this link.{" "}
                <strong>NOTE:</strong> If you edit your response & resubmit
                please name the new document indicating the new version (e.g.,
                title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="ParticipantConsent"
                onChange={(e) => handleFileChange(e, "ParticipantConsent")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialParticipantConsent && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialParticipantConsent)}
                </>
              )}
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
                potentially cause stress or confusion. A template is available
                at this link. <strong>NOTE:</strong> If you edit your response &
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
              {mode !== "apply" && initialParticipantDebriefing && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialParticipantDebriefing)}
                </>
              )}
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
                Upload a doc, docx or pdf. <strong>NOTE:</strong> If you edit
                your response & resubmit please name the new document indicating
                the new version (e.g., title_v2.doc)
              </p>
              <input
                type="file"
                className="form-control"
                id="AccessibilityLetter"
                onChange={(e) => handleFileChange(e, "AccessibilityLetter")}
                disabled={mode === "review" || mode === "view"}
              />
              {mode !== "apply" && initialAccessibilityLetter && (
                <>
                  <h3>Uploaded Files:</h3>
                  {mode === "edit" && (
                    <h6>
                      Keep in mind this is only a preview of what was uploaded
                      originally. Please re-upload the files using the file
                      inputs if you wish to modify your application
                    </h6>
                  )}
                  {generateFileLinks(initialAccessibilityLetter)}
                </>
              )}
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
          </div>
        </>
      )}
    </>
  );
};

export default Pg5;
