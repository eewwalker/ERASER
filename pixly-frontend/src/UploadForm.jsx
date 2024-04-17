import { React, useState } from "react";
import Alert from "./Alert";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';


/** Component for entire page.
 *
 * Props: none
 * State: formData
 *
 */

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleChange} value={formData.file} name="file" />

        </Button>
        <IconButton aria-label="fingerprint" color="success" type="submit">
          <Fingerprint />
        </IconButton>
      </form>
    </div>
  );
};

export default UploadForm;
