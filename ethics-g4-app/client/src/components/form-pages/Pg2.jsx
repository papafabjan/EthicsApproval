import React, { useState } from "react";

function Pg2({ formik, emphasizeFields  }) {
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
                emphasizeFields?.ResearchProject && formik.touched?.ResearchProject
                  ? "red"
                  : "",
            }}
          />
            {formik.touched.ResearchProject && formik.errors.ResearchProject && (
              <div style={{ color: "red" }}>{formik.errors.ResearchProject}</div>
            )}
        </div>

      <div className="form-group">
        <label htmlFor="CoApplicantName">Co-Applicant Name(s) If there are others who will do the research with you, comma-separated</label>
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
                emphasizeFields?.CoApplicantName && formik.touched?.CoApplicantName
                  ? "red"
                  : "",
            }}
        />
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
                emphasizeFields?.CoApplicantEmail && formik.touched?.CoApplicantEmail
                  ? "red"
                  : "",
            }}
          />
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
        />
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
        />
      </div>

      <div className="radio-example">
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
                emphasizeFields?.FundingOther && formik.touched?.FundingOther
                  ? "red"
                  : "",
            }}
              />
            )}
            {formik.values.Funding === "Other" && formik.touched.FundingOther && formik.errors.FundingOther && (
  <div style={{ color: "red" }}>{formik.errors.FundingOther}</div>
)}
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="Funding"
                value="No"
                checked={formik.values.Funding === "No"}
                onChange={(e) => handleRadioChange(e, "FundingOther")}
              />{" "}
              No Funding
            </label>
          </li>
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
                emphasizeFields?.OtherCountry && formik.touched?.OtherCountry
                  ? "red"
                  : "",
            }}
              />
            )}
            {formik.values.Country.includes("Other") && formik.touched.OtherCountry && formik.errors.OtherCountry && (
  <div style={{ color: "red" }}>{formik.errors.OtherCountry}</div>
)}

          </li>
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
              />{" "}
              No
            </label>
          </li>
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
              />{" "}
              No
            </label>
          </li>
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
            />{" "}
            No
          </label>
        </li>
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
            />{" "}
            No
          </label>
        </li>

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
