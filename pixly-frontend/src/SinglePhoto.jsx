import { React, useState } from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";

/**
 * SinglePhoto component renders photo with id param
 * State:
 * -loading: true/false
 *
 * Props: none
 *
 *  App -> RouteList -> SinglePhoto
 */


const SinglePhoto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();


  return (
    <div>
      <Photo photo={id} />
    </div>
  );
};

export default SinglePhoto;
