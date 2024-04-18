import React from "react";
/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

const S3_URL = "https://pixlyappp.s3.us-west-1.amazonaws.com";


// add dynamic image parameter below.

const Photo = ({ photo }) => {
  console.log('photo', photo);
  return (
    <div className="Photo">
      <img src={`https://pixlyappp.s3.us-west-1.amazonaws.com/cat.jpeg`} alt="photo" />
    </div>
  );
};

export default Photo;
