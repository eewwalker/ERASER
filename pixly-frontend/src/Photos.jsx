import React from "react";
import Photo from "./Photo";
import { Link } from "react-router-dom";

/** Component for entire page.
 *
 * Props: photos [keyNames]
 * State: none
 *
 * App -> RoutesList -> Photos -> Photo
 */

const Photos = ({ photos }) => {


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
