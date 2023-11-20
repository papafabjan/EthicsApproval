import OptionsList from '../OptionsList';

export const Pg11 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="ResearchProject">List of questions <span style={{ color: 'red' }}>*</span></label>
                <p>Upload your proposed list of questions (e.g., questionnaires, photos, interview questions, etc) in any format.</p>
                <input type="file" class="form-control" id="ResearchProject" placeholder="Your answer"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantName">Any additional forms /documents you need to submit (optional)</label>    
                <p>Upload up to 10 files (e.g., questionnaires, photos, interview questions, etc) in any format. </p>
                <input type="file" class="form-control" id="CoApllicantName"/>
            </div>
        </form>
    </>
    );
};
