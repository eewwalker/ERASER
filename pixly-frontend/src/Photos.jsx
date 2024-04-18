import React from 'react';
import Photo from './Photo';
/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/

const Photos = ({ photos }) => {
    console.log('photos', photos);
    return (
        <div className='Photos'>
            {photos.map((photo, idx) => <Photo key={idx} photo={photo} />)}

        </div>
    );
};

export default Photos;
