import { React } from "react";
import "./Photo.css";

/** Photo Component
 *
 * Props: photo: key name '...JPG'
 * State: none
 *
 */

const S3_JAZZ = "https://pixly-app-bucket.s3.us-west-1.amazonaws.com";
const S3_EMILY = "https://pixlyappp.s3.us-west-1.amazonaws.com";

const Photo = ({ photo }) => {
  return (
    <div className="Photo">
      <img className="Photo-img" src={`${S3_JAZZ}/${photo}`} alt="photo" />
    </div>
  );
};

export default Photo;
