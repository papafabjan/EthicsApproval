import OptionsList from '../OptionsList';

export const Pg8 = () => {
    return (
    <>
        <form>
            <div class="form-group">
                <label for="ResearchProject">Participant Information Form <span style={{ color: 'red' }}>*</span></label>
                <p>Upload a doc, docx or pdf. A template of the Adult Information Form is available at this link. For EEG studies the additional information template form can be found at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="text" class="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantName">Participant Consent Form <span style={{ color: 'red' }}>*</span></label>    
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="text" class="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div class="form-group">
                <label for="CoApplicantEmail">Debriefing Form (optional)</label>
                <p>If applicable, e.g., the study involves deception or may potentially cause stress or confusion. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc) </p>
                <input type="text" class="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div class="form-group">
                <label for="StartDate">Accessibility Letter (Optional)</label>
                <p>Upload a doc, docx or pdf. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="text" class="form-control" id="StartDate"/>
            </div>
        </form>
    </>
    );
};
