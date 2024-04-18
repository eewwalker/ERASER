import React from 'react';
import { NavLink } from 'react-router-dom';

/** NavBar Component
 *
 * Props: none
 * State: none
 *
 * App -> NavBar -> {NavLink: Upload, Photos}
 */
const NavBar = () => {
    return (
        <div className='NavBar'>
            <NavLink to='/upload'>Upload</NavLink>
            <NavLink to='/photos'>Photos</NavLink>

        </div>
    );
};

export default NavBar;
