import Dropzone from "react-dropzone";
import Thumb from "../Thumb";


const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}


export const Pg7 = ({ formik }) => {

  const handleFileChange = (event, initialValuesName) => {
    const file = event.target.files[0];
    formik.setFieldValue(initialValuesName, file);
    console.log(file)
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
        <Thumb file={formik.values.ListofQuestions} />
      </div>
      <div className="form-group">
        <label htmlFor="AdditionalForms">
          Any additional forms /documents you need to submit (optional)
        </label>

        <Dropzone style={dropzoneStyle} onDrop={acceptedFiles => {

          console.log(acceptedFiles)

          // do nothing if no files
          if (acceptedFiles.length === 0) { return; }

          // on drop we add to the existing files
          //Doesn't work yet
          formik.setFieldValue("AdditionalForms", formik.values.AdditionalForms.concat(acceptedFiles));

          return formik.values.AdditionalForms.map((file, i) => (<Thumb key={i} file={file} />));
        }}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload up to 10 files (e.g., questionnaires, photos, interview questions, etc) in any format.{" "}</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </>
  );
};
export default Pg7;
