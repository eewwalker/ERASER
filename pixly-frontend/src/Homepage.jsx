import React from "react";
import { PageHeader, Grommet, Page, PageContent, Paragraph, WorldMap } from "grommet";

/** Component for Homepage.
 *
 * Props: none
 * State: none
 *
 * App -> RoutesList -> Homepage
 */
const Homepage = () => {
    return (
      <Grommet full>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Page kind="narrow">
          <PageContent>
            <Paragraph alignSelf="center" style={{ fontSize: "60px" }}>ERASER</Paragraph>
            <Paragraph alignSelf="center">Upload to erase your image.</Paragraph>
            <Paragraph alignSelf="center" style={{ fontSize: "14px" }}>
              1,000 users a day are waiting to erase your image...
            </Paragraph>
              <WorldMap/>
          </PageContent>
        </Page>
      </Grommet>
    );
  };

export default Homepage;
