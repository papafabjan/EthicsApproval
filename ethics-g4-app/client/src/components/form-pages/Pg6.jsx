


export const Pg6 = ({ formik }) => {
    return (
    <>
        <form>
            <div className="form-group">
                <label htmlFor="ResearchProject">Participant Information Form <span style={{ color: 'red' }}>*</span></label>
                <p>Upload a doc, docx or pdf. A template of the Adult Information Form is available at this link. For EEG studies the additional information template form can be found at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantName">Participant Consent Form <span style={{ color: 'red' }}>*</span></label>    
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantEmail">Debriefing Form (optional)</label>
                <p>If applicable, e.g., the study involves deception or may potentially cause stress or confusion. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc) </p>
                <input type="file" className="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div className="form-group">
                <label htmlFor="StartDate">Accessibility Letter (Optional)</label>
                <p>Upload a doc, docx or pdf. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="StartDate"/>
            </div>
        </form>
    </>
    );
}

export default Pg6;
