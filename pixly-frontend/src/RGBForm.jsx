// RGBForm.js
import React, { useState } from "react";
import RGBSlider from "./RGBSlider";
import {Button} from "grommet"

const initialFormData = {
  r: 0,
  g: 0,
  b: 0,
};

/**
 * Component for RGB form - displays RGB components for editing an image.
 *
 * State:
 * - initialFormData: const initialFormData = { r: 0,g: 0, b: 0,};
 *
 * Props:
 * - rgbEditSave: function that calls API to save changes on color edit.
 * - photoId: image id like 'shoes.png'
 *
 * App -> RoutesList -> Photos -> SinglePhoto -> RGBForm
 */

const RGBForm = ({ rgbEditSave, photoId }) => {
  const [formData, setFormData] = useState(initialFormData);

    // Pass photo ID along with RGB data
  const handleRGBEditSave = () => {
    rgbEditSave(photoId, formData);
    setFormData(initialFormData);
  };

  return (
    <div className="RGBForm">
      <form id="RGBForm" onSubmit={handleRGBEditSave}>
      <p style={{ color: '#B30000', fontWeight: 'bold'  }}>Red</p><RGBSlider color="r" formData={formData} setFormData={setFormData} />
      <br />
      <p style={{ color: '#00873D', fontWeight: 'bold'  }}>Green</p><RGBSlider color="g" formData={formData} setFormData={setFormData} />
      <br />
      <p style={{ color: '#00739D', fontWeight: 'bold'  }}>Blue</p><RGBSlider color="b" formData={formData} setFormData={setFormData} />
      <br />
      <Button primary label="Save" type="submit"/>
      </form>
    </div>
  );
};

export default RGBForm;
