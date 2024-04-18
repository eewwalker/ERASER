import React from "react";
/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

const S3_URL = "https://pixly-app-bucket.s3.us-west-1.amazonaws.com";


// add dynamic image parameter below.

const Photo = () => {
  return (
    <div className="Photo">
      <img src={`${S3_URL}/shoes.JPG`} alt="photo" />
    </div>
  );
};

export default Photo;
