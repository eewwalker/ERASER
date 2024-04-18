import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */
const App = () => {
  const [photos, setPhotos] = useState([]);
  const location = useLocation();

  useEffect(
    function fetchAllPhotosOnMount() {
      async function fetchPhotos() {
        if (location.pathname === '/photos') {
          const photos = await PixlyApi.getAllPhotos();
          setPhotos(photos);

        }
      }

      fetchPhotos();
    },
    [location.pathname]
  );



  async function handleSave(uploadData) {
    let resp;

    try {
      resp = await PixlyApi.upload(uploadData);

    } catch (err) {
      console.log(err);
    }
    return resp;
  }

  return (
    <div className="App">
      <NavBar />
      <RouteList handleSave={handleSave} photos={photos} />
    </div>
  );
};

export default App;
