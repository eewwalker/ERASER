import React from "react";
/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

const S3_JAZZ = "https://pixly-app-bucket.s3.us-west-1.amazonaws.com";
const S3_EMILY = "https://pixlyappp.s3.us-west-1.amazonaws.com";



// add dynamic image parameter below.

const Photo = ({ photo }) => {
  console.log("photo", photo);
  return (
    <div className="Photo">
      <img src={`${S3_JAZZ}/${photo}`} alt="photo" />
    </div>
  );
};

export default Photo;
