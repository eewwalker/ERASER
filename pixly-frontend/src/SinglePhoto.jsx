import { React, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoTemplate from "./PhotoTemplate";

/**
 * SinglePhoto component renders photo with id param
 * State:
 * -loading: true/false
 *
 * Props: none
 *
 *  App -> RouteList -> SinglePhoto
 */


const SinglePhoto = ({ rgbEditSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();


  return (
    <div>
      <PhotoTemplate photo={id} />
    </div>
  );
};

export default SinglePhoto;
