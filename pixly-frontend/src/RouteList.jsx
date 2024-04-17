import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/
const RouteList = () => {
    return (
        <div className='RouteList'>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/photos' element={<Photos />} />
                <Route path='/photo:id' element={<Photo />} />
                <Route path='/edit:id' element={<EditForm />} />
                <Route path='/upload' element={<UploadForm />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>

        </div >
    );
};

export default RouteList;
