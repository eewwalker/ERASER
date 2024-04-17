import { React, useState } from "react";
import Alert from "./Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import VisuallyHiddenInput from "./VisuallyHiddenInput";

/** Component for entire page.
 *
 * Props: none
 * State: formDatra
 *
 */
// const Input = styled("input")({display:none})

const initialFormData = {
  file: "",
  author: "",
};

const UploadForm = ({ handleSave }) => {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  console.log(formData);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSave(formData);
    setFormData(initialFormData);
  }



  return (
    <div className="UploadForm">
      <form className="Upload-form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-controlled"
          label="Author"
          name="author"
          onChange={handleChange}
          value={formData.author}
        />
        <input type="file"
        name="file"
        onChange={handleChange}
        value={formData.file}
        accept='image/jpg'/>
      <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
