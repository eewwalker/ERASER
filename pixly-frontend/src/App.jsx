import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Grommet,
  grommet,
  Header,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Text,
} from "grommet";
import { Moon, Sun } from "grommet-icons";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#020212",
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
 *
 * App -> NavBar -> RoutesList
 *
 */
const App = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dark, setDark] = useState(false);

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
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      {isLoading ? (
        <p>Loading...</p>
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
              <RouteList handleSave={handleSave} photos={photos} />
            </PageContent>
          </Page>
        </div>
      )}
    </Grommet>
  );
};

export default App;
