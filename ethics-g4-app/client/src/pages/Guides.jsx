import { Link } from "react-router-dom";
import StyledGuides from "../styled/Guides.styled";

const Guides = () => {
  return (
    <>
      <StyledGuides>
        <h2>
          This is the guides page where Applicants, Supervisors and Reviewers
          are provided further information for their role regarding Ethics
          Approval.
        </h2>

        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title">Applicant</h5>
            <p className="card-text">
              Press below to view more info. regarding Applicants
            </p>
            <Link to="/guides/applicant" className="btn btn-primary">
              {" "}
              Enter
            </Link>
          </div>
        </div>

        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title">Supervisor</h5>
            <p className="card-text">
              Press below to view more info. regarding Supervisors
            </p>
            <Link to="/guides/supervisor" className="btn btn-primary">
              {" "}
              Enter
            </Link>
          </div>
        </div>

        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title">Reviewer</h5>
            <p className="card-text">
              Press below to view more info. regarding Reviewers
            </p>
            <Link to="/guides/reviewer" className="btn btn-primary">
              {" "}
              Enter
            </Link>
          </div>
        </div>
      </StyledGuides>
    </>
  );
};

export default Guides;
