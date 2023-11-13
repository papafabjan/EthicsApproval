import { Link } from "react-router-dom";

const Guides = () => {

    
  
    return (
      <>
        <h2>This is the guides page where Applicants, Supervisors and Reviewers are provided further information for their role regarding Ethics approval.</h2>

        <div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">Applicant</h5>
    <p class="card-text">Press below to view more info. regarding Applicant</p>
    <Link to="/applicant" class="btn btn-primary"> Enter</Link>
  </div>
</div>
 

<div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">Supervisor</h5>
    <p class="card-text">Press below to view more info. regarding Supervisor</p>
    <Link to="/supervisor" class="btn btn-primary"> Enter</Link>
  </div>
</div>

<div class="card w-50">
  <div class="card-body">
    <h5 class="card-title">Reviewers</h5>
    <p class="card-text">Press below to view more info. regarding Reviewers</p>
    <Link to="/reviewer" class="btn btn-primary"> Enter</Link>
  </div>
</div>
      </>
    );
  };
  
  export default Guides;