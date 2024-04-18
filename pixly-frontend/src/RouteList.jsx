import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Photos from "./Photos";
import Photo from "./Photo";
import EditForm from "./EditForm";
import UploadForm from "./UploadForm";
import SinglePhoto from "./SinglePhoto";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */
const RouteList = ({ handleSave, photos }) => {
    return (
        <div className="RouteList">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/photos" element={<Photos photos={photos} />} />
                <Route path="/photo/:id" element={<SinglePhoto />} />
                <Route path="/edit:id" element={<EditForm />} />
                <Route path="/upload" element={<UploadForm handleSave={handleSave} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default RouteList;
