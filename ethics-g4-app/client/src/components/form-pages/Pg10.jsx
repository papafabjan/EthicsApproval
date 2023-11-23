import OptionsList from '../OptionsList';

export const Pg10 = () => {
    return (
    <>
        <form>
            <div className="form-group">
                <label htmlFor="ResearchProject">List of questions <span style={{ color: 'red' }}>*</span></label>
                <p>Upload your proposed list of questions (e.g., questionnaires, photos, interview questions, etc) in any format.</p>
                <input type="file" className="form-control" id="ResearchProject" placeholder="Your answer"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantName">Any additional forms /documents you need to submit (optional)</label>    
                <p>Upload up to 10 files (e.g., questionnaires, photos, interview questions, etc) in any format. </p>
                <input type="file" className="form-control" id="CoApllicantName"/>
            </div>
        </form>
    </>
    );
};
