export const Pg5 = ({ formik }) => {
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
              value={formik.values.ParentalConsent}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ParentalInformation}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ChildInformation}
              onChange={formik.handleChange}
            />
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
              value={formik.values.HeadTeacherConsent}
            />
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
              value={formik.values.HeadteacherInformation}
              onChange={formik.handleChange}
            />
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
              value={formik.values.AccessibleConsentMaterial}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ProxyConsentProcedures}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ParticipantInformation}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ParticipantConsent}
              onChange={formik.handleChange}
            />
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
              value={formik.values.ParticipantDebriefing}
              onChange={formik.handleChange}
            />
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
              value={formik.values.AccessibilityLetter}
              onChange={formik.handleChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Pg5;
