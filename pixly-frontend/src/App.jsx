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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function fetchAllPhotosOnMount() {
      async function fetchPhotos() {
        console.log("hi");
        if (location.pathname === "/photos") {
          setIsLoading(true);
          const photos = await PixlyApi.getAllPhotos();
          console.log("bye");
          setPhotos(photos);
          setIsLoading(false);
        }
      }

      fetchPhotos();
    },
    [location.pathname]
  );

  async function handleSave(uploadData) {
    let resp;
    setIsLoading(true);

    try {
      resp = await PixlyApi.upload(uploadData);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    return resp;
  }

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <NavBar />
          <RouteList handleSave={handleSave} photos={photos} />
        </div>
      )}
    </div>
  );
};

export default App;
