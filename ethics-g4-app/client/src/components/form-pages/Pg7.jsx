export const Pg7 = ({ formik }) => {

  const handleFileChange = (event, initialValuesName) => {
    const file = event.target.files[0];
    formik.setFieldValue(initialValuesName, file);
    console.log(file)
  };

  const handleFilesChange = (event, initialValuesName) => {
    const files = event.target.files;
    formik.setFieldValue(initialValuesName, files);
    console.log(files);
  };


  return (
    <>
      <div className="form-group">
        <label htmlFor="ListofQuestions">
          List of questions <span style={{ color: "red" }}>*</span>
        </label>
        <p>
          Upload your proposed list of questions (e.g., questionnaires, photos,
          interview questions, etc) in any format.
        </p>
        <input
          type="file"
          name="ListofQuestions"
          className="form-control"
          id="ListofQuestions"
          onChange={(e) => handleFileChange(e, "ListofQuestions")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="AdditionalForms">
          Any additional forms /documents you need to submit (optional)
        </label>

        <input
          type="file"
          multiple
          name="AdditionalForms"
          className="form-control"
          id="AdditionalForms"
          onChange={(e) => handleFilesChange(e, "AdditionalForms")}
        />
      </div>
    </>
  );
};
export default Pg7;
