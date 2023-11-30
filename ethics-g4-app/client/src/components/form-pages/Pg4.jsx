

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
                <label htmlFor="PotentialParticipants">Potential Participants <span style={{ color: 'red' }}>*</span></label>
                <p>What sort of participants will you test. Indicate how many participants do you plan to test, and what is the rationale for the intended sample size? (i.e., has a power analysis been carried out?)</p>
                <input type="text" name="PotentialParticipants" className="form-control" id="PotentialParticipants" value={formik.values.PotentialParticipants}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} placeholder="Your answer"/>
            {formik.touched.PotentialParticipants && formik.errors.PotentialParticipants && (
          <div style={{ color: "red" }}>{formik.errors.PotentialParticipants}</div>
        )}
            </div>
            <div className="form-group">
                <label htmlFor="RecruitingPotentialParticipants">Recruiting Potential Participants <span style={{ color: 'red' }}>*</span></label>    
                <p>How will you find, approach and ask potential participants to take part at your research?</p>
                <input type="text" name="RecruitingPotentialParticipants" className="form-control" id="RecruitingPotentialParticipants" value={formik.values.RecruitingPotentialParticipants}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} placeholder="Your answer"/>
            {formik.touched.RecruitingPotentialParticipants && formik.errors.RecruitingPotentialParticipants && (
          <div style={{ color: "red" }}>{formik.errors.RecruitingPotentialParticipants}</div>
        )}
            </div>
            <div className="form-group">
                <label htmlFor="Payment">Payment <span style={{ color: 'red' }}>*</span></label>
                <p>Will financial/in kind payments be offered to participants? </p>
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
      </div>
            <div className="form-group">
                <label htmlFor="PotentialHarm">Potential Harm to Participants <span style={{ color: 'red' }}>*</span></label>
                <p>What is the potential for physical and/or psychological harm/distress to the participants?  How will this be managed to ensure appropriate protection and well-being of the participants?</p>
                <input type="text" className="form-control" id="PotentialHarm" value={formik.values.PotentialHarm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            </div>
            <div className="form-group">
                <label htmlFor="VulnerableParticipants">Involves potentially vulnerable participants? <span style={{ color: 'red' }}>*</span></label>
                <p>e.g., those who are ill, ethnic or racial minorities, those who do not speak the language used for the research, children, those economically disadvantaged, adults with diminished capacity</p>
                <input type="text" className="form-control" id="VulnerableParticipants" value={formik.values.VulnerableParticipants}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            </div>

    </>
    );
}
export default Pg4;