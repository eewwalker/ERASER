import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Paragraph,
  Heading,
  ResponsiveContext,
} from "grommet";
import { useContext } from "react";

/** Photo Component
 *
 * Props: photo: key name '...JPG'
 * State: none
 *
 */

const S3_JAZZ = "https://pixly-app-bucket.s3.us-west-1.amazonaws.com";
const S3_EMILY = "https://pixlyappemily.s3.us-west-1.amazonaws.com";

const PhotoTemplate = ({ photo }) => {
  const size = useContext(ResponsiveContext);

  const maxWidth = size === 'small' ? 200 : 400;
  const maxHeight = size === 'small' ? 150 : 300;

  const imgStyle = {
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
    width: 'auto',
    height: 'auto',
  };


  return (
    <Card height="medium" width="medium" background="light-1">
      <CardBody pad="medium">
          <img className="Photo-img" src={`${S3_JAZZ}/${photo}`} alt="photo" style={imgStyle}/>
      </CardBody>
    </Card>
  );
};
export default PhotoTemplate;
