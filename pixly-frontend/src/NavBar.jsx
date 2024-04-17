import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='NavBar'>
            <NavLink to='/upload'>Upload</NavLink>
            <NavLink to='/photos'>Photos</NavLink>

        </div>
    );
};

export default NavBar;
