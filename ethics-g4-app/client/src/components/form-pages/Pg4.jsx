import { Button } from "../../styled/Form.styled";


function Pg4({ formik }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="ResearchProject">
          Aims & Objectives <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Try to explain this in very simple terms. Do not copy-paste your
          research proposal
        </p>
        <input
          type="text"
          className="form-control"
          id="ResearchProject"
          placeholder="e.g. Ethics web-site"
        />
      </div>
      <div className="form-group">
        <label htmlFor="CoApplicantName">
          Methodology <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          What will the participant have to do? Provide a very brief outline of
          the procedure. Also provide an estimate of how long you expect a
          typical testing session to last. If the study involves potentially
          sensitive materials make sure you attach them to your submission
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApllicantName"
          placeholder="e.g. Kostas Dimopoulos"
        />
      </div>
      <div className="form-group">
        <label htmlFor="CoApplicantEmail">
          Safety concerns <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Who will be testing the participants? Raises personal safety issues
          for the researcher/s? If yes, how will this be managed to ensure
          appropriate protection and well-being of the researcher/s?
        </p>
        <input
          type="text"
          className="form-control"
          id="CoApplicantEmail"
          placeholder="eg. kdimopoulos@york.citycollege.eu"
        />
      </div>
      <div className="form-group">
        <label htmlFor="StartDate">
          Does the research involve potentially highly sensitive topics?{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          e.g., it includes stimuli designed to be emotive or aversive; It
          requires participants to ingest substances (e.g., alcohol); It
          requires participants to give information of a personal nature (e.g.,
          ethnicity, religion, sexual orientation); it uses deception
        </p>
        <input type="text" className="form-control" id="StartDate" />
      </div>
      <div className="form-group">
        <label htmlFor="StartDate">
          Sensitive Material/tools <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Upload up to 5 files (photos, questionnaires, interview questions
          etc.) in any format
        </p>
        <input type="file" className="form-control" id="StartDate" />
      </div>
      <Button onClick={formik.handleSubmit}>Back</Button>
      <Button type="submit">Submit</Button>
    </>
  );
}

export default Pg4;
