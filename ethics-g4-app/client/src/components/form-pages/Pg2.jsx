import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

function Pg2({ formik }) {
  const [radioValue, setRadioValue] = useState(true);

  const handleRadioChange = (e,radio) => {
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
      <div className="radio-example">
        <label>
          <input
            type="radio"
            name="radioOption"
            value="Option1"
            checked={formik.values.radioOption === "Option1"}
            onChange={(e) => handleRadioChange(e, "otherOption")}
          />
          Option 1
        </label>

        <label>
          <input
            type="radio"
            name="radioOption"
            value="Option2"
            checked={formik.values.radioOption === "Option2"}
            onChange={(e) => handleRadioChange(e, "otherOption")}
          />
          Option 2
        </label>

        <label>
          <input
            type="radio"
            name="radioOption"
            value="Option3"
            checked={formik.values.radioOption === "Option3"}
            onChange={(e) => handleRadioChange(e, "otherOption")}
          />
          Option 3
        </label>

        <label>
          <input
            type="radio"
            name="radioOption"
            value="Other"
            checked={formik.values.radioOption === "Other"}
            onChange={(e) => handleRadioChange(e, "otherOption")}
          />
          Other
        </label>

        {formik.values.radioOption === "Other" && (
          <input
            type="text"
            name="otherOption"
            placeholder="Enter other option"
            value={formik.values.otherOption}
            onChange={formik.handleChange}
          />
        )}
      </div>

      <div className="checkbox-example">
        <label>
          <input
            type="checkbox"
            name="checkboxOption"
            value="Checkbox1"
            checked={formik.values.checkboxOption.includes("Checkbox1")}
            onChange={formik.handleChange}
          />
          Checkbox 1
        </label>

        <label>
          <input
            type="checkbox"
            name="checkboxOption"
            value="Checkbox2"
            checked={formik.values.checkboxOption.includes("Checkbox2")}
            onChange={formik.handleChange}
          />
          Checkbox 2
        </label>

        <label>
          <input
            type="checkbox"
            name="checkboxOption"
            value="Checkbox3"
            checked={formik.values.checkboxOption.includes("Checkbox3")}
            onChange={formik.handleChange}
          />
          Checkbox 3
        </label>

        <label>
          <input
            type="checkbox"
            name="checkboxOption"
            value="Other"
            checked={
              Array.isArray(formik.values.checkboxOption) &&
              formik.values.checkboxOption.includes("Other")
            }
            onChange={(e) => handleCheckboxChange(e, "otherCheckboxOption")}
          />
          Other
        </label>

        {formik.values.checkboxOption.includes("Other") && (
          <input
            type="text"
            name="otherCheckboxOption"
            placeholder="Enter other option"
            value={formik.values.otherCheckboxOption}
            onChange={formik.handleChange}
          />
        )}
      </div>

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
        <p>
          If there are others who will do the research with you, comma-separated
        </p>
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
        <label>
          Is the project externally funded?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          If <strong>YES</strong>, please specify the funding body
        </p>
        <label>
          <input
            type="radio"
            id="FundNoFunding"
            name="Funding"
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
            name="Funding"
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
        <label>
          Where does the project take place?{" "}
          <span style={{ color: "red" }}>*</span>
          <p>
            Select all that apply. If the country(ies) is not listed, please add
            them at the end
          </p>
          <ul>
            <li>
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
                    formik.setFieldValue("Country", [
                      ...(formik.values.Country || []),
                      value,
                    ]);
                  } else {
                    formik.setFieldValue(
                      "Country",
                      (formik.values.Country || []).filter(
                        (country) => country !== value
                      )
                    );
                  }
                }}
                checked={
                  formik.values.Country &&
                  formik.values.Country.includes("Bulgaria")
                }
              />
              Bulgaria
            </li>
            {/* Repeat similar structure for Greece and Romania */}
            {/* ... */}
            <li>
              <input
                type="checkbox"
                name="Country"
                onClick={(e) => {
                  setRadioValue(!radioValue);
                  console.log(e.target.value);
                }}
                value={radioValue}
              />{" "}
              Other
            </li>
          </ul>
        </label>
      </div>

      <div className="form-group">
        <label>
          Is it a health and/or social care human-interventional study?{" "}
          <span style={{ color: "red" }}>*</span>
          <li>
            <input
              type="radio"
              id="HealthSocialCareYes"
              name="HealthSocialCare"
              value="Yes"
              onChange={formik.handleChange}
              checked={formik.values.HealthSocialCare === "Yes"}
            />{" "}
            Yes
          </li>
          <li>
            <input
              type="radio"
              id="HealthSocialCareNo"
              name="HealthSocialCare"
              value="No"
              onChange={formik.handleChange}
              checked={formik.values.HealthSocialCare === "No"}
            />{" "}
            No
          </li>
        </label>
      </div>

      <div className="form-group">
        <label>
          Is it led by an institution other than the University of York Europe
          Campus? <span style={{ color: "red" }}>*</span>
          <li>
            <input
              type="radio"
              id="AnotherInstitutionNo"
              name="AnotherInstitution"
              value="No"
              onChange={formik.handleChange}
              checked={formik.values.AnotherInstitution === "No"}
            />{" "}
            No
          </li>
          <li>
            <input
              type="radio"
              id="AnotherInstitutionOther"
              name="AnotherInstitution"
              value="Other"
              onChange={formik.handleChange}
              checked={formik.values.AnotherInstitution === "Other"}
            />{" "}
            Other
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
        </label>
      </div>

      <div className="htmlForm-group">
        <label>
          Involves human tissue?<span style={{ color: "red" }}>*</span>
          <li>
            <input
              type="radio"
              id="HumanTissueYes"
              name="HumanTissue"
              value="Yes"
              onChange={formik.handleChange}
              checked={formik.values.HumanTissue === "Yes"}
            />{" "}
            Yes
          </li>
          <li>
            <input
              type="radio"
              id="HumanTissueNo"
              name="HumanTissue"
              value="No"
              onChange={formik.handleChange}
              checked={formik.values.HumanTissue === "No"}
            />{" "}
            No
          </li>
        </label>
      </div>

      <div className="htmlForm-group">
        <label>
          Clinical trial or a medical device study?{" "}
          <span style={{ color: "red" }}>*</span>
          <li>
            <input
              type="radio"
              id="ClinicalMedicalYes"
              name="ClinicalMedical"
              value="Yes"
              onChange={formik.handleChange}
              checked={formik.values.ClinicalMedical === "Yes"}
            />{" "}
            Yes
          </li>
          <li>
            <input
              type="radio"
              id="ClinicalMedicalNo"
              name="ClinicalMedical"
              value="No"
              onChange={formik.handleChange}
              checked={formik.values.ClinicalMedical === "No"}
            />{" "}
            No
          </li>
        </label>
      </div>

      <div className="form-group">
        <label>
          Involves social care services provided by a local authority?
          <span style={{ color: "red" }}>*</span>
          <li>
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
          </li>
          <li>
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
          </li>
        </label>

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
