

export const Pg9 = ({formik}) => {
    return (
    <>
        <form>
            <div className="form-group">
                <label htmlFor="ResearchProject">Data Processing <span style={{ color: 'red' }}>*</span></label>
                <p>Will you be processing (i.e. collecting, recording, storing, or otherwise using) personal data as part of this project? (Personal data is any information relating to an identified or identifiable living person). If the intention is to record the participants' voice, or make a photographic record of the participants (either still images or video recordings) then further details on what will be recorded and how they will be managed are required.</p>
                <input type="text" className="form-control" id="DataProcessing"   value={formik.values.DataProcessing}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="e.g. Ethics web-site"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantName">Data Confidentiality <span style={{ color: 'red' }}>*</span></label>    
                <p>What measures will be put in place to ensure confidentiality of personal data, where appropriate? </p>
                <input type="text" className="form-control" id="DataConfidentiality"  value={formik.values.DataConfidentiality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="e.g. Kostas Dimopoulos"/>
            </div>
            <div className="form-group">
                <label htmlFor="CoApplicantEmail">Data Storage and Security <span style={{ color: 'red' }}>*</span></label>
                <p>Who will have access to the data generated at each stage of the research, and in what form? What steps will be taken to ensure the security of data processed during the project, including any identifiable personal data, other than those already described earlier in this form? Indicate if, and when, all identifiable personal data will be destroyed once the project has ended.</p>
                <input type="text" className="form-control" id="DataStorageandSecurity"  value={formik.values.DataStorageandSecurity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="eg. kdimopoulos@york.citycollege.eu"/>
            </div>
        </form>
    </>
    );
}
export default Pg9;
