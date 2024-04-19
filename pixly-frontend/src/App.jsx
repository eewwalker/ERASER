import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";
import LoadingBar from "./LoadingBar";
import {
  Box,
  Button,
  Grommet,
  grommet,
  Header,
  Page,
  PageContent,
} from "grommet";
import { Moon, Sun } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import LoadingImageBar from "./LoadingImageBar";

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "neutral-1",
      dark: "blue",
      light: "black"
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

const AppBar = (props) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    {...props}
  />
);

/** Component for entire page.
 *
 * Props: none
 * State:
 * -photos: [date_time, iso, height, width, color, make, key, author]
 * -isLoading: true/false
 * -dark: true/false
 * -uploadLoading: true/false
 *
 *
 * App -> NavBar -> RoutesList
 *
 */
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [editData, setEditData] = useState({ id: '', rgb: { r: 0, g: 0, b: 0 }, bw: False });

  const [isLoading, setIsLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

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

  /** rgbEditSave receives rbg from form and sends to backend to edit image */
  async function rgbEditSave(rgbVals) {
    let resp;
    setIsLoading(true);
    setEditData(prevData => ({
      ...prevData,
      prevData[rgb]

    }));

    try {
      resp =
    }

  }

  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div>
          <Page>
            <AppBar>
              <Button
                a11yTitle={
                  dark ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                icon={dark ? <Moon /> : <Sun />}
                onClick={() => setDark(!dark)}
                tip={{
                  content: (
                    <Box
                      pad="small"
                      round="small"
                      background={dark ? "dark-1" : "light-3"}
                    >
                      {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </Box>
                  ),
                  plain: true,
                }}
              />
              <NavBar />
            </AppBar>
            <PageContent>
              <RouteList handleSave={handleSave} rgbEditSave={rgbEditSave} photos={photos} />
            </PageContent>
          </Page>
        </div>
      )}
    </Grommet>
  );
};

export default App;
