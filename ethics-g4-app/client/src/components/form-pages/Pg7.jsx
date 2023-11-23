import OptionsList from '../OptionsList';

export const Pg7 = () => {
    return (
    <>
        <form>
            <div className="form-group">
                <label htmlFor="ResearchProject">Parental Consent Form <span style={{ color: 'red' }}>*</span></label>
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="ResearchProject" placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantName">Parental Information Form <span style={{ color: 'red' }}>*</span></label>    
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="CoApllicantName" placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantEmail">Child/Adolescent Information & Consent/Assent Form (optional)</label>
                <p>It is strongly recommended that if possible (depending on the child's competence) the child’s or under-age person’s free and voluntary informed consent/assent to participate is obtained.  A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)
 </p>
                <input type="file" className="form-control" id="CoApplicantEmail" placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div className="form-group">
                <label htmlFor="StartDate">Head Teacher Consent Form  (optional)</label>
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="StartDate"/>
            </div>
            <div className="form-group">
                <label htmlFor="StartDate">Head Teacher Information Form (optional)</label>
                <p>Upload a doc, docx, pdf, video or audio file. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="StartDate"/>
            </div>
            
        </form>
    </>
    );
};
