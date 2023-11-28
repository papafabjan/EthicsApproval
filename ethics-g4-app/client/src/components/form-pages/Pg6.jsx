

export const Pg6 = ({formik}) => {
    return (
    <>

            <div className="form-group">
                <label htmlFor="ParentalConsentForm">Parental Consent Form <span style={{ color: 'red' }}>*</span></label>
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="ParentalConsentForm" value={formik.values.ParentalConsentForm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="e.g. Ethics web-site" />
            </div>
            <div className="form-group">
                <label htmlFor="ParentalInformationForm">Parental Information Form <span style={{ color: 'red' }}>*</span></label>    
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="ParentalInformationForm" value={formik.values.ParentalInformationForm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div className="form-group">
                <label htmlFor="ChildInformationForm">Child/Adolescent Information & Consent/Assent Form (optional)</label>
                <p>It is strongly recommended that if possible (depending on the child's competence) the child’s or under-age person’s free and voluntary informed consent/assent to participate is obtained.  A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)
 </p>
                <input type="file" className="form-control" id="ChildInformationForm" value={formik.values.ChildInformationForm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
            <div className="form-group">
                <label htmlFor="HeadTeacherConsentForm">Head Teacher Consent Form  (optional)</label>
                <p>Upload a doc, docx or pdf. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="HeadTeacherConsentForm" value={formik.values.HeadTeacherConsentForm}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </div>
            <div className="form-group">
                <label htmlFor="HeadteacherInformationForm">Head Teacher Information Form (optional)</label>
                <p>Upload a doc, docx, pdf, video or audio file. A template is available at this link. <strong>NOTE:</strong> If you edit your response & resubmit please name the new document indicating the new version (e.g., title_v2.doc)</p>
                <input type="file" className="form-control" id="HeadteacherInformationForm" value={formik.values.HeadteacherInformationForm}
          onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </div>
            

    </>
    );
}
export default Pg6;
