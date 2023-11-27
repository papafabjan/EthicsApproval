
import React, { useState } from "react";



function Pg2({ formik }) {

  return (
    <>
      <div className="form-group">
        <label htmlFor="ResearchProject">
          Title of the research project <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="ResearchProject"
          placeholder="e.g. Ethics web-site"
          value={formik.values.ResearchProject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.ResearchProject && formik.errors.ResearchProject && (
          <div style={{ color: "red" }}>{formik.errors.ResearchProject}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="CoApplicantName">Co-Applicant Name(s)</label>
        <p>If there are others who will do the research with you, comma-separated</p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantName"
          placeholder="e.g. Kostas Dimopoulos"
          value={formik.values.CoApplicantName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.CoApplicantName && formik.errors.CoApplicantName && (
          <div style={{ color: "red" }}>{formik.errors.CoApplicantName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="CoApplicantEmail">Co-Applicant email address(es)</label>
        <p>If there are others who will do the research with you, comma-separated</p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantEmail"
          placeholder="e.g. kdimopoulos@york.citycollege.eu"
          value={formik.values.CoApplicantEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.CoApplicantEmail && formik.errors.CoApplicantEmail && (
          <div style={{ color: "red" }}>{formik.errors.CoApplicantEmail}</div>
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
        />
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

      <div className="form-group">
        <label htmlFor="Fund">
          Is the project externally funded?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>If YES, please specify the funding body</p>
        <label>
          <input
            type="radio"
            id="FundNoFunding"
            name="Fund"
            value="No Funding"
            checked={formik.values.Fund === "No Funding"}
            onChange={formik.handleChange}
          />
          No Funding
        </label>
        <label>
          <input
            type="radio"
            id="FundOther"
            name="Fund"
            value="Other"
            checked={formik.values.Fund === "Other"}
            onChange={formik.handleChange}
          />
          Other
        </label>
          <div>
            <input
              type="text"
              id="FundDetails"
              placeholder="Please specify"
              value={formik.values.FundDetails}
              onChange={formik.handleChange}
              name="FundDetails"
            />
          </div>
      </div>
      <div className="htmlForm-group">
  <label htmlFor="ProjectPlace">
    Where does the project take place? <span style={{ color: "red" }}>*</span>
  </label>
  <p>
    Select all that apply. If the country(ies) is not listed, please add
    them at the end
  </p>
  <ul>
    <li>
      <label>
        <input
          type="checkbox"
          id="Bulgaria"
          className="htmlForm-control"
          value="Bulgaria"
          name="Country"
          onChange={(e) => {
            const isChecked = e.target.checked;
            const value = e.target.value;

            if (isChecked) {
              formik.setFieldValue("Country", [...(formik.values.Country || []), value]);
            } else {
              formik.setFieldValue(
                "Country",
                (formik.values.Country || []).filter((country) => country !== value)
              );
            }
          }}
          checked={formik.values.Country && formik.values.Country.includes("Bulgaria")}
        />
        Bulgaria
      </label>
    </li>
    {/* Repeat similar structure for Greece and Romania */}
    {/* ... */}
    <li>
      <label>
        <input
          type="checkbox"
          id="Other"
          className="htmlForm-control"
          value="Other"
          onChange={(e) => {
            const isChecked = e.target.checked;
            const valueChecked = e.target.value;

            if (isChecked) {
              formik.setFieldValue("isOtherChecked", true);
            } else {
              formik.setFieldValue("isOtherChecked", false);
              formik.setFieldValue("OtherCountry", ""); // Clear 'OtherCountry' when unchecked
            }
          }}
        />
        Other
      </label>
      <div>
          <input
            type="text"
            id="OtherCountry"
            name="OtherCountry"
            className="htmlForm-control"
            value={formik.values.OtherCountry}
            onChange={formik.handleChange}
            placeholder="Please specify other countries"
          />
        </div>
    </li>
      
  </ul>
</div>



<div className="form-group">
  <label htmlFor="HealthSocialCare">
    Is it a health and/or social care human-interventional study?{" "}
    <span style={{ color: "red" }}>*</span>
  </label>
  <div>
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
  </div>
</div>

<div className="form-group">
  <label htmlFor="AnotherInstitution">
    Is it led by an institution other than the University of York Europe
    Campus? <span style={{ color: "red" }}>*</span>
  </label>
  <div>
    <li>
      <label>
        <input
          type="radio"
          id="AnotherInstitutionNo"
          name="AnotherInstitution"
          value="No"
          onChange={formik.handleChange}
          checked={formik.values.AnotherInstitution === "No"}
        />{" "}
        No
      </label>
    </li>
    <li>
      <label>
        <input
          type="radio"
          id="AnotherInstitutionOther"
          name="AnotherInstitution"
          value="Other"
          onChange={formik.handleChange}
          checked={formik.values.AnotherInstitution === "Other"}
        />{" "}
        Other
      </label>
      {formik.values.AnotherInstitution === "Other" && (
        <div>
          <input
            type="text"
            id="AnotherInstitutionInput"
            name="AnotherInstitutionInput"
            placeholder="Please specify"
            value={formik.values.AnotherInstitutionInput}
            onChange={formik.handleChange}
          />
        </div>
      )}
    </li>
  </div>
</div>

<div className="htmlForm-group">
  <label htmlFor="HumanTissue">
    Involves human tissue?<span style={{ color: "red" }}>*</span>
  </label>
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
</div>
<div className="htmlForm-group">
  <label htmlFor="ClinicalMedical">
    Clinical trial or a medical device study? <span style={{ color: "red" }}>*</span>
  </label>
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
</div>

      <div className="form-group">
        <label htmlFor="SocialCareServices">
          Involves social care services provided by a local authority?
          <span style={{ color: "red" }}>*</span>
        </label>
        <div>
          <li>
            <label>
              <input
                type="radio"
                id="SocialCareServices"
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
                id="SocialCareServices"
                name="SocialCareServices"
                value="No"
                checked={formik.values.SocialCareServices === "No"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              No
            </label>
          </li>
        </div>
        {formik.touched.SocialCareServices && formik.errors.SocialCareServices && (
          <div style={{ color: "red" }}>{formik.errors.SocialCareServices}</div>
        )}
      </div>

    </>
  );
}

export default Pg2;
