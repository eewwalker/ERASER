import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Photos from "./Photos";
import Photo from "./Photo";
import EditForm from "./EditForm";
import UploadForm from "./UploadForm";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */
const RouteList = ({handleSave}) => {
  return (
    <div className="RouteList">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photo:id" element={<Photo />} />
        <Route path="/edit:id" element={<EditForm />} />
        <Route path="/upload" element={<UploadForm handleSave={handleSave}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default RouteList;
