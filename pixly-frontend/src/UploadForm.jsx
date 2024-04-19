import { React, useState, useEffect } from "react";
import { FileInput, Button } from "grommet";
import UploadButton from "./UploadButton";

/** Component for Upload page.
 *
 * Props: handleSave() function from parent component
 * State:
 * -formData: {author}
 * -file: photo file
 *
 * App -> RouteList -> UploadForm
 */

const initialFormData = {
  author: "",
};

const UploadForm = ({ handleSave }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);

  function handleChange(evt) {
    const { name, value, files } = evt.target;
    if (files) {
      setFile(files[0]);
    } else {
      setFormData((fData) => ({
        ...fData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("author", formData.author);

    try {
      await handleSave(data);
    } catch (error) {
      console.error("Something went wrong with upload:", error);
    }

    setFormData(initialFormData);
    setFile(null);
  }

  return (
    <div className="UploadForm">
      <br />
      <br />
      <br />
      <br />
      <form id="UploadForm" onSubmit={handleSubmit}>
        <FileInput onChange={handleChange} type="file" name="file" />
        <UploadButton />
      </form>
    </div>
  );
};

export default UploadForm;
