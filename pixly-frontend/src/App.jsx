import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteList from './RouteList';


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/
const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <RouteList />
      </BrowserRouter>

    </div>
  );
};

export default App

