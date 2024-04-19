import React from "react";
import { Link } from "react-router-dom";
import PhotoTemplate from "./PhotoTemplate";
import { Grommet, Grid, Page, PageContent } from "grommet";

/** Component for Photos page.
 *
 * Props: photos [keyNames]
 * State: none
 *
 * App -> RoutesList -> Photos -> PhotoTemplate
 */

const Photos = ({ photos }) => {
  return (
    <Grommet full>
      <br />
      <br />
      <PageContent>
        <Page alignSelf="center">
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }} >
            {photos.map((photo, idx) => (
              <Link key={idx} to={`/photo/${photo}`}>
                <PhotoTemplate photo={photo} />
              </Link>
            ))}
          </Grid>
        </Page>
      </PageContent>
    </Grommet>
  );
};

export default Photos;
