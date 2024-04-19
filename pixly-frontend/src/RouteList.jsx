import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Photos from "./Photos";
import UploadForm from "./UploadForm";
import SinglePhoto from "./SinglePhoto";

/** RouteList Component
 *
 * Props: handleSave(), photos[keyNames], rgbEditSave(API), convert_to_bw(API)
 * State: none
 *
 * App => RouteList -> {Homepage, Photos, SinglePhoto, UploadForm}
 *
 */
const RouteList = ({ handleSave, rgbEditSave, photos, convert_to_bw }) => {
    return (
        <div className="RouteList">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/photos" element={<Photos photos={photos} />} />
                <Route path="/photo/:id" element={<SinglePhoto rgbEditSave={rgbEditSave} convert_to_bw={convert_to_bw}/>} />
                <Route path="/upload" element={<UploadForm handleSave={handleSave} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default RouteList;
