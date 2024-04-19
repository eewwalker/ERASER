import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'grommet';

/** NavBar Component.
 *
 * Props: none
 * State: none
 *
 * App -> NavBar -> {NavLink: Upload, Photos}
 */
const NavBar = () => {
    return (
        <div className='NavBar'>
             <NavLink to='/'><Button label="Home" color="status-ok"/></NavLink>
            <NavLink to='/upload'><Button label="Upload"  color="graph-1"/></NavLink>
            <NavLink to='/photos'><Button label="Photos" primary color="graph-1"/></NavLink>

        </div>
    );
};

export default NavBar;
