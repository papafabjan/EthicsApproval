import { Link } from "react-router-dom";

const Guides = () => {
  return (
    <>
      <h2>
        This is the guides page where Applicants, Supervisors and Reviewers are
        provided further information for their role regarding Ethics approval.
      </h2>

      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title">Applicant</h5>
          <p className="card-text">
            Press below to view more info. regarding Applicant
          </p>
          <Link to="/applicant" className="btn btn-primary">
            {" "}
            Enter
          </Link>
        </div>
      </div>

      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title">Supervisor</h5>
          <p className="card-text">
            Press below to view more info. regarding Supervisor
          </p>
          <Link to="/supervisor" className="btn btn-primary">
            {" "}
            Enter
          </Link>
        </div>
      </div>

      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title">Reviewers</h5>
          <p className="card-text">
            Press below to view more info. regarding Reviewers
          </p>
          <Link to="/reviewer" className="btn btn-primary">
            {" "}
            Enter
          </Link>
        </div>
      </div>
    </>
  );
};

export default Guides;
