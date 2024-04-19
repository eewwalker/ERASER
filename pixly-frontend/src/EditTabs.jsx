import React from "react";
import { Tabs, Tab, Box, Button } from "grommet";

/**
 * Component for EditTabs - user choice of edit functions on image.
 *
 * State: none
 *
 * Props:
 * - setSelectedTab: displays appropriate elements depending on tab selected.
 * - convert_to_bw: function from parent (call api)
 * - photoId: like 'shoes.png'
 *
 *
 * App -> RoutesList -> Photos -> SinglePhoto -> EditTabs
 */

const EditTabs = ({ setSelectedTab, convert_to_bw, photoId }) => {
  // Accept setSelectedTab and convert_to_bw as props


  return (
    <Tabs>
      <Tab title="Color" onClick={() => setSelectedTab("Color")} />
      <Tab title="Black & White" onClick={() => setSelectedTab("Black & White")}>
        <Box pad="medium">
          <Button
            label="Convert to B&W"
            onClick={() => convert_to_bw(photoId)}
          />
        </Box>
      </Tab>
    </Tabs>
  );
};

export default EditTabs;
