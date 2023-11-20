import OptionsList from '../OptionsList';

export const Pg4 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="ResearchProject">Title of the research project <span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantName">Co-Applicant Name(s)</label>    
                <p>If there are others who will do the research with you, coma separated</p>
                <input type="text" class="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantEmail">Co-Applicant email address(es)</label>
                <p>If there are others who will do the research with you, coma separated</p>
                <input type="text" class="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div class="form-group">
                <label for="StartDate">Proposed start date of the data collection <span style={{ color: 'red' }}>*</span></label>
                <input type="date" class="form-control" id="StartDate"/>
            </div>
            <div class="form-group">
                <label for="EndDate">Anticipated end date of the data collection <span style={{ color: 'red' }}>*</span></label>
                <input type="date" class="form-control" id="EndDate" />
            </div>
        </form>
    </>
    );
};
