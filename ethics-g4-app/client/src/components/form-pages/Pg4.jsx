import OptionsList from '../OptionsList';

export const Pg4 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="ResearchProject">Aims & Objectives <span style={{ color: 'red' }}>*</span></label>
                <p>Try to explain this in very simple terms. Do not copy-paste your research proposal</p>
                <input type="text" class="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantName">Methodology <span style={{ color: 'red' }}>*</span></label>    
                <p>What will the participant have to do? Provide a very brief outline of the procedure. Also provide an estimate of how long you expect a typical testing session to last. If the study involves potentially sensitive materials make sure you attach them to your submission</p>
                <input type="text" class="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantEmail">Safety concerns <span style={{ color: 'red' }}>*</span></label>
                <p>Who will be testing the participants? Raises personal safety issues for the researcher/s? If yes, how will this be managed to ensure appropriate protection and well-being of the researcher/s?</p>
                <input type="text" class="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div class="form-group">
                <label for="StartDate">Does the research involve potentially highly sensitive topics? <span style={{ color: 'red' }}>*</span></label>
                <p>e.g., it includes stimuli designed to be emotive or aversive; It requires participants to ingest substances (e.g., alcohol); It requires participants to give information of a personal nature (e.g., ethnicity, religion, sexual orientation); it uses deception</p>
                <input type="text" class="form-control" id="StartDate"/>
            </div>
        </form>
    </>
    );
};
