import React, { useState } from "react";
import Comment from "../Comment";

function Pg2({ formik, emphasizeFields, mode }) {
  const [comment, setComment] = useState("");

  const handleCommentSave = (fieldName) => {
    // Save the comment to formik or perform any other actions as needed
    formik.setValues({
      ...formik.values,
      [fieldName]: comment,
    });
  };
  const handleRadioChange = (e, radio) => {
    formik.handleChange(e);

    // Reset otherOption when a different radio option is selected
    if (e.target.value !== "Other") {
      formik.setFieldValue(radio, "");
    }
  };

  const handleCheckboxChange = (e, checkbox) => {
    formik.handleChange(e);
    if (!e.target.checked) {
      formik.setFieldValue(checkbox, "");
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="ResearchProject">
          Title of the research project <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="ResearchProject"
          name="ResearchProject"
          className="form-control"
          placeholder="ResearchProject"
          value={formik.values.ResearchProject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            borderColor:
              emphasizeFields?.ResearchProject &&
              formik.touched?.ResearchProject
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "ResearchProject" field */}
        {mode === "review" && (
          <Comment
            fieldName="ResearchProject"
            comment={formik.values.ResearchProjectComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
        {formik.touched.ResearchProject && formik.errors.ResearchProject && (
          <div style={{ color: "red" }}>{formik.errors.ResearchProject}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="CoApplicantName">
          Co-Applicant Name(s) If there are others who will do the research with
          you, comma-separated
        </label>
        <input
          type="text"
          id="CoApplicantName"
          name="CoApplicantName"
          className="form-control"
          placeholder="CoApplicantName"
          value={formik.values.CoApplicantName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            borderColor:
              emphasizeFields?.CoApplicantName &&
              formik.touched?.CoApplicantName
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "CoApplicantName" field */}
        {mode === "review" && (
          <Comment
            fieldName="CoApplicantName"
            comment={formik.values.CoApplicantNameComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
        {formik.touched.ResearchProject && formik.errors.ResearchProject && (
          <div style={{ color: "red" }}>{formik.errors.ResearchProject}</div>
        )}
        {formik.touched.CoApplicantName && formik.errors.CoApplicantName && (
          <div style={{ color: "red" }}>{formik.errors.CoApplicantName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="CoApplicantEmail">Co-Applicant email address(es)</label>
        <p>
          If there are others who will do the research with you, comma-separated
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantEmail"
          placeholder="e.g. kdimopoulos@york.citycollege.eu"
          value={formik.values.CoApplicantEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            borderColor:
              emphasizeFields?.CoApplicantEmail &&
              formik.touched?.CoApplicantEmail
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "CoApplicantEmail" field */}
        {mode === "review" && (
          <Comment
            fieldName="CoApplicantEmail"
            comment={formik.values.CoApplicantEmailComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
        {formik.touched.CoApplicantEmail && formik.errors.CoApplicantEmail && (
          <div style={{ color: "red" }}>{formik.errors.CoApplicantName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="StartDate">
          Proposed start date of the data collection{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          className="form-control"
          id="StartDate"
          value={formik.values.StartDate}
          onChange={formik.handleChange}
          name="StartDate"
          style={{
            borderColor:
              emphasizeFields?.StartDate && formik.touched?.StartDate
                ? "red"
                : "",
          }}
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "StartDate" field */}
        {mode === "review" && (
          <Comment
            fieldName="StartDate"
            comment={formik.values.StartDateComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
        {formik.touched.StartDate && formik.errors.StartDate && (
          <div style={{ color: "red" }}>{formik.errors.StartDate}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="EndDate">
          Anticipated end date of the data collection{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          className="form-control"
          id="EndDate"
          value={formik.values.EndDate}
          onChange={formik.handleChange}
          name="EndDate"
          disabled={mode === "review" || mode === "view"}
        />
        {/* Comment component for the "EndDate" field */}
        {mode === "review" && (
          <Comment
            fieldName="EndDate"
            comment={formik.values.EndDateComment}
            onCommentSave={(fieldName, comment) =>
              formik.setFieldValue(`${fieldName}Comment`, comment)
            }
          />
        )}
      </div>

      <div className="form-group">
        <label>
          Is the project externally funded?{" "}
          <span style={{ color: "red" }}>*</span>
          <p>
            If <strong>YES</strong>, please specify the funding body
          </p>
        </label>
        <ul>
          <li>
            <label>
              <input
                disabled={mode === "review" || mode === "view"}
                type="radio"
                name="Funding"
                value="Other"
                checked={formik.values.Funding === "Other"}
                onChange={(e) => handleRadioChange(e, "FundingOther")}
              />{" "}
              Yes
            </label>
            {formik.values.Funding === "Other" && (
              <input
                type="text"
                name="FundingOther"
                placeholder="Enter other option"
                value={formik.values.FundingOther}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    emphasizeFields?.FundingOther &&
                    formik.touched?.FundingOther
                      ? "red"
                      : "",
                }}
              />
            )}
            {formik.values.Funding === "Other" &&
              formik.touched.FundingOther &&
              formik.errors.FundingOther && (
                <div style={{ color: "red" }}>{formik.errors.FundingOther}</div>
              )}
          </li>
          <li>
            <label>
              <input
                disabled={mode === "review" || mode === "view"}
                type="radio"
                name="Funding"
                value="No"
                checked={formik.values.Funding === "No"}
                onChange={(e) => handleRadioChange(e, "FundingOther")}
              />{" "}
              No Funding
            </label>
          </li>
          {/* Comment component for the "Funding" field */}
          {mode === "review" && (
            <Comment
              fieldName="Funding"
              comment={formik.values.FundingComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="form-group">
        <label>
          Where does the project take place?{" "}
          <span style={{ color: "red" }}>*</span>
          <p>
            Select all that apply. If the country(ies) is not listed, please add
            them at the end
          </p>
        </label>

        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                name="Country"
                value="Greece"
                checked={formik.values.Country.includes("Greece")}
                onChange={formik.handleChange}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Greece
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="Country"
                value="Bulgaria"
                checked={formik.values.Country.includes("Bulgaria")}
                onChange={formik.handleChange}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Bulgaria
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="Country"
                value="Romania"
                checked={formik.values.Country.includes("Romania")}
                onChange={formik.handleChange}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Romania
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="Country"
                value="Other"
                checked={
                  Array.isArray(formik.values.Country) &&
                  formik.values.Country.includes("Other")
                }
                onChange={(e) => handleCheckboxChange(e, "OtherCountry")}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Other
            </label>

            {formik.values.Country.includes("Other") && (
              <input
                type="text"
                name="OtherCountry"
                placeholder="Enter other option"
                value={formik.values.OtherCountry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    emphasizeFields?.OtherCountry &&
                    formik.touched?.OtherCountry
                      ? "red"
                      : "",
                }}
              />
            )}
            {formik.values.Country.includes("Other") &&
              formik.touched.OtherCountry &&
              formik.errors.OtherCountry && (
                <div style={{ color: "red" }}>{formik.errors.OtherCountry}</div>
              )}
          </li>
          {/* Comment component for the "Country" field */}
          {mode === "review" && (
            <Comment
              fieldName="Country"
              comment={formik.values.CountryComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="form-group">
        <label>
          Is it a health and/or social care human-interventional study?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                id="HealthSocialCareYes"
                name="HealthSocialCare"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.HealthSocialCare === "Yes"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                id="HealthSocialCareNo"
                name="HealthSocialCare"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.HealthSocialCare === "No"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              No
            </label>
          </li>
          {/* Comment component for the "HealthSocialCare" field */}
          {mode === "review" && (
            <Comment
              fieldName="HealthSocialCare"
              comment={formik.values.HealthSocialCareComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="form-group">
        <label>
          Is it led by an institution other than the University of York Europe
          Campus? <span style={{ color: "red" }}>*</span>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="AnotherInstitution"
                value="No"
                checked={formik.values.AnotherInstitution === "No"}
                onChange={(e) =>
                  handleRadioChange(e, "AnotherInstitutionOther")
                }
                disabled={mode === "review" || mode === "view"}
              />{" "}
              No
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="AnotherInstitution"
                value="Other"
                checked={formik.values.AnotherInstitution === "Other"}
                onChange={(e) =>
                  handleRadioChange(e, "AnotherInstitutionOther")
                }
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Other
            </label>
            <label>
              {formik.values.AnotherInstitution === "Other" && (
                <input
                  type="text"
                  name="AnotherInstitutionOther"
                  placeholder="Enter other institution"
                  value={formik.values.AnotherInstitutionOther}
                  onChange={formik.handleChange}
                />
              )}
            </label>
          </li>
          {/* Comment component for the "AnotherInstitution" field */}
          {mode === "review" && (
            <Comment
              fieldName="AnotherInstitution"
              comment={formik.values.AnotherInstitutionComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="htmlForm-group">
        <label>
          Involves human tissue?<span style={{ color: "red" }}>*</span>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                id="HumanTissueYes"
                name="HumanTissue"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.HumanTissue === "Yes"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                id="HumanTissueNo"
                name="HumanTissue"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.HumanTissue === "No"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              No
            </label>
          </li>
          {/* Comment component for the "HumanTissue" field */}
          {mode === "review" && (
            <Comment
              fieldName="HumanTissue"
              comment={formik.values.HumanTissueComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="htmlForm-group">
        <label>
          Clinical trial or a medical device study?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                id="ClinicalMedicalYes"
                name="ClinicalMedical"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.ClinicalMedical === "Yes"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                id="ClinicalMedicalNo"
                name="ClinicalMedical"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.ClinicalMedical === "No"}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              No
            </label>
          </li>
          {/* Comment component for the "ClinicalMedical" field */}
          {mode === "review" && (
            <Comment
              fieldName="ClinicalMedical"
              comment={formik.values.ClinicalMedicalComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
      </div>

      <div className="form-group">
        <label>
          Involves social care services provided by a local authority?
          <span style={{ color: "red" }}>*</span>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                id="SocialCareServicesYes"
                name="SocialCareServices"
                value="Yes"
                checked={formik.values.SocialCareServices === "Yes"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                id="SocialCareServicesNo"
                name="SocialCareServices"
                value="No"
                checked={formik.values.SocialCareServices === "No"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={mode === "review" || mode === "view"}
              />{" "}
              No
            </label>
          </li>
          {/* Comment component for the "SocialCareServices" field */}
          {mode === "review" && (
            <Comment
              fieldName="SocialCareServices"
              comment={formik.values.SocialCareServicesComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
        </ul>
        {formik.touched.SocialCareServices &&
          formik.errors.SocialCareServices && (
            <div style={{ color: "red" }}>
              {formik.errors.SocialCareServices}
            </div>
          )}
      </div>
    </>
  );
}

export default Pg2;
