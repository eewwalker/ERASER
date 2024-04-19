import { React, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FileInput } from "grommet";
import UploadButton from "./UploadButton";
import LoadingImageBar from './LoadingImageBar'

/** Component for entire page.
 *
 * Props: handleSave() function from parent component
 * State:
 * -formData: {author}
 * -file: photo file
 *
 * App -> RouteList -> UpLoadForm
 */

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("author", formData.author);
    handleSave(data);

    setFormData(initialFormData);
    setFile(null);
  }

  return (
    <div className="UploadForm">
      <form id="UploadForm" className="Upload-form" onSubmit={handleSubmit}>
        <FileInput onChange={handleChange} type="file" name="file" />
        <UploadButton />
      </form>
    </div>
  );
};

export default UploadForm;
