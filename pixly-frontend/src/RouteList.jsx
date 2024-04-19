import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Photos from "./Photos";
import EditForm from "./EditForm";
import UploadForm from "./UploadForm";
import SinglePhoto from "./SinglePhoto";

/** RouteList Component
 *
 * Props: handleSave(), photos[keyNames]
 * State: none
 *
 * App => RouteList -> {Homepage, Photos, SinglePhoto, EditForm, UploadForm}
 *
 */
const RouteList = ({ handleSave, rgbEditSave, photos }) => {
    return (
        <div className="RouteList">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/photos" element={<Photos photos={photos} />} />
                <Route path="/photo/:id" element={<SinglePhoto rgbEditSave={rgbEditSave} />} />
                <Route path="/edit:id" element={<EditForm />} />
                <Route path="/upload" element={<UploadForm handleSave={handleSave} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default RouteList;
