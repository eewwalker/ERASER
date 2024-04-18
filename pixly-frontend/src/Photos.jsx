import React from "react";
import Photo from "./Photo";
import { Link } from "react-router-dom";
/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

const Photos = ({ photos }) => {
  console.log("photos", photos);
  return (
    <div className="Photos">
      {photos.map((photo, idx) => (
        <Link key={idx} to={`/photo/${photo}`}>
          <Photo photo={photo} />
        </Link>
      ))}
    </div>
  );
};

export default Photos;
