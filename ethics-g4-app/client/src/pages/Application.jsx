import { Link } from "react-router-dom";

const Application = () => {
  return (
    <>
      <form>
  <div class="form-group">
    <label for="formGroupExampleInput">Registration Number</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="e.g. CSS12345"/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect2">Example multiple select</label>
    <select class="form-control">
  <option>BSc (any track)</option>
  <option>MSc Business Informatics and Management (MBIT)</option>
  <option>MSc in Web and Mobile Development</option>
  <option>MSc in Software Development</option>
  <option>MSc in AI and Data Science</option>
  <option>MSc in Advanced Software Engineering</option>
</select>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
  </div>
</form>

    </>
  );
};

export default Application;
