

export const Pg10 = ({formik}) => {
    return (
    <>
        <form>
            <div className="form-group">
                <label htmlFor="ListofQuestions">List of questions <span style={{ color: 'red' }}>*</span></label>
                <p>Upload your proposed list of questions (e.g., questionnaires, photos, interview questions, etc) in any format.</p>
                <input type="file" className="form-control" id="ListofQuestions"  value={formik.values.ListofQuestions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} placeholder="Your answer"/>
            </div>
            <div className="form-group">
                <label htmlFor="AdditionalForms">Any additional forms /documents you need to submit (optional)</label>    
                <p>Upload up to 10 files (e.g., questionnaires, photos, interview questions, etc) in any format. </p>
                <input type="file" className="form-control" id="AdditionalForms" value={formik.values.AdditionalForms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
            </div>
        </form>
    </>
    );
}
export default Pg10;
