export const Pg4 = ({ formik }) => {
  const handleRadioChange = (e, radio) => {
    formik.handleChange(e);

    // Reset otherPaymentOption when a different radio option is selected
    if (e.target.value !== "Other") {
      formik.setFieldValue(radio, "");
    }
  };
  return (
    <>
      <div className="form-group">
        <label htmlFor="PotentialParticipants">
          Potential Participants <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          What sort of participants will you test. Indicate how many
          participants do you plan to test, and what is the rationale for the
          intended sample size? (i.e., has a power analysis been carried out?)
        </p>
        <input
          type="text"
          name="PotentialParticipants"
          className="form-control"
          id="PotentialParticipants"
          value={formik.values.PotentialParticipants}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your answer"
        />
        {formik.touched.PotentialParticipants &&
          formik.errors.PotentialParticipants && (
            <div style={{ color: "red" }}>
              {formik.errors.PotentialParticipants}
            </div>
          )}
      </div>
      <div className="form-group">
        <label htmlFor="RecruitingPotentialParticipants">
          Recruiting Potential Participants{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          How will you find, approach and ask potential participants to take
          part at your research?
        </p>
        <input
          type="text"
          name="RecruitingPotentialParticipants"
          className="form-control"
          id="RecruitingPotentialParticipants"
          value={formik.values.RecruitingPotentialParticipants}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Your answer"
        />
        {formik.touched.RecruitingPotentialParticipants &&
          formik.errors.RecruitingPotentialParticipants && (
            <div style={{ color: "red" }}>
              {formik.errors.RecruitingPotentialParticipants}
            </div>
          )}
      </div>
      <div className="form-group">
        <label htmlFor="Payment">
          Payment <span style={{ color: "red" }}>*</span>
          <p>Will financial/in kind payments be offered to participants? </p>
        </label>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="Payment"
                value="Yes"
                checked={formik.values.Payment === "Yes"}
                onChange={(e) => handleRadioChange(e, "otherPaymentOption")}
              />
              Yes
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="Payment"
                value="No"
                checked={formik.values.Payment === "No"}
                onChange={(e) => handleRadioChange(e, "otherPaymentOption")}
              />
              No
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="Payment"
                value="Other"
                checked={formik.values.Payment === "Other"}
                onChange={(e) => handleRadioChange(e, "otherPaymentOption")}
              />
              Other:
            </label>
          </li>
        </ul>

        {formik.values.Payment === "Other" && (
          <input
            type="text"
            name="otherPaymentOption"
            placeholder="Enter other option"
            value={formik.values.otherPaymentOption}
            onChange={formik.handleChange}
          />
        )}
        {formik.touched.Payment && formik.errors.Payment && (
          <div style={{ color: "red" }}>{formik.errors.Payment}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="PotentialHarm">
          Potential Harm to Participants <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          What is the potential for physical and/or psychological harm/distress
          to the participants? How will this be managed to ensure appropriate
          protection and well-being of the participants?
        </p>
        <input
          type="text"
          name="PotentialHarm"
          className="form-control"
          id="PotentialHarm"
          value={formik.values.PotentialHarm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.PotentialHarm && formik.errors.PotentialHarm && (
          <div style={{ color: "red" }}>{formik.errors.PotentialHarm}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="VulnerableParticipants">
          Involves potentially vulnerable participants?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          e.g., those who are ill, ethnic or racial minorities, those who do not
          speak the language used for the research, children, those economically
          disadvantaged, adults with diminished capacity
        </p>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="VulnerableParticipants"
                value="YesChildren_adolescents"
                checked={
                  formik.values.VulnerableParticipants ===
                  "YesChildren_adolescents"
                }
                onChange={(e) =>
                  handleRadioChange(e, "otherVulnerableParticipantsOptions")
                }
              />
              Yes, it involves children and/or adolescents
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="VulnerableParticipants"
                value="YesAdultsMental"
                checked={
                  formik.values.VulnerableParticipants === "YesAdultsMental"
                }
                onChange={(e) =>
                  handleRadioChange(e, "otherVulnerableParticipantsOptions")
                }
              />
              Yes, it involve adults lacking mental capability
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="VulnerableParticipants"
                value="NoAdults"
                checked={formik.values.VulnerableParticipants === "NoAdults"}
                onChange={(e) =>
                  handleRadioChange(e, "otherVulnerableParticipantsOptions")
                }
              />
              No, it involves adults with no vulnerabilities
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="VulnerableParticipants"
                value="Other"
                checked={formik.values.VulnerableParticipants === "Other"}
                onChange={(e) =>
                  handleRadioChange(e, "otherVulnerableParticipantsOptions")
                }
              />
              Other
            </label>
          </li>
        </ul>
        {formik.values.VulnerableParticipants === "Other" && (
          <input
            type="text"
            name="otherVulnerableParticipantsOptions"
            placeholder="Your answer"
            value={formik.values.otherVulnerableParticipantsOptions}
            onChange={formik.handleChange}
          />
        )}
        {formik.touched.VulnerableParticipants &&
          formik.errors.VulnerableParticipants && (
            <div style={{ color: "red" }}>
              {formik.errors.VulnerableParticipants}
            </div>
          )}
      </div>
    </>
  );
};
export default Pg4;
