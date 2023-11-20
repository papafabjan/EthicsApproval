import OptionsList from '../OptionsList';

export const Pg3 = () => {
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
            <div class="form-group">
                <label for="Fund">Is the project externally funded? <span style={{ color: 'red' }}>*</span></label>
                <p>If <strong>YES</strong>, please specify the funding body</p>
                <input type="text" class="form-control" id="Fund" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Where does the project take place? <span style={{ color: 'red' }}>*</span></label>
                <p>Select all that apply. If the country(ies) is not listed, please add them at the end</p>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Is it a health and/or social care human-interventional study?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Is it led by an institution other than the University of York Europe Campus?<span style={{ color: 'red' }}>*</span></label>
                <p>If <strong>YES</strong>, please specify the institution</p>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Involves human tissue?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Clinical trial or a medical device study?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="ProjectPlace">Involves social care services provided by a local authority?<span style={{ color: 'red' }}>*</span></label>
                <input type="text" class="form-control" id="ProjectPlace" placeholder="e.g. Ethics web-site"/>
            </div>
        </form>
    </>
    );
};
