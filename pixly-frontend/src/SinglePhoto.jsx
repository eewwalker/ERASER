import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PhotoTemplate from "./PhotoTemplate";
import RGBForm from "./RGBForm";
import EditTabs from "./EditTabs";


/**
 * Component SinglePhoto - Displays an individual photo with access to photoId.
 *
 *  State:
 * - isLoading: boolean
 * - selectedTab: Color | B&W
 *
 *  Props:
 * - rgbEditSave: func(API call to edit color)
 * - convert_to_bw: func(API call to change photo to B&W)
 *
 * App -> RoutesList -> Photos -> SinglePhoto
 */



const SinglePhoto = ({ rgbEditSave, convert_to_bw }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Color");
  const { id } = useParams();



  return (
    <div>
      <br />
      <br />
      <br />
      <PhotoTemplate photo={id} />
      <EditTabs
        setSelectedTab={setSelectedTab}
        convert_to_bw={convert_to_bw}
        photoId={id}
      />
      {selectedTab === "Color" && (
        <RGBForm rgbEditSave={rgbEditSave} photoId={id} />
      )}
    </div>
  );
};

export default SinglePhoto;
