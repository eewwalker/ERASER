import React from "react";
import { Link } from "react-router-dom";
import PhotoTemplate from "./PhotoTemplate";
import { Grommet, Grid, Page, PageContent } from "grommet";

/** Component for entire page.
 *
 * Props: photos [keyNames]
 * State: none
 *
 * App -> RoutesList -> Photos -> Photo
 */

const Photos = ({ photos }) => {
  return (
    <Grommet full>
      <PageContent>
        <Page>
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
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
