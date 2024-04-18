import { React, useState } from "react";
import { useParams } from "react-router-dom";
import Photo from "./Photo";

/**
 *
 * State:
 * loading: boolean
 *
 * Props: none
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
