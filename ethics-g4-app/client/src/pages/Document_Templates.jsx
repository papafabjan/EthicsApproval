import { useEffect, useState, React } from "react";

function Document_Templates() {
  const { file, setFile } = useState();

  function HandleFileChange(event) {
    setFile(event.target.files[0]);
    setSelectedFile(file);
  }

  return (
    <div>
      <h2>Document Templates</h2>
      <form>
        <input type="file" name="file" onChange={HandleFileChange} />
      </form>
    </div>
  );
}

export default Document_Templates;
