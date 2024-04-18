import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";

/** Component for entire page.
 *
 * Props: none
 * State:
 * -photos: [date_time, iso, height, width, color, make, key, author]
 * -isLoading: true/false
 *
 * App -> NavBar -> RoutesList
 */
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(
    function fetchAllPhotosOnMount() {
      async function fetchPhotos() {

        if (location.pathname === "/photos") {
          setIsLoading(true);
          const photos = await PixlyApi.getAllPhotos();

          setPhotos(photos);
          setIsLoading(false);
        }
      }

      fetchPhotos();
    },
    [location.pathname]
  );

  /** handleSave receives photoData from form and sends to backend */
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
