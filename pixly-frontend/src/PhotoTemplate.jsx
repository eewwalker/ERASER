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
  return (
    <Card>
      <CardHeader pad="medium">
      </CardHeader>
      <CardBody pad="medium">
        <Paragraph maxLines={size === "small" ? 3 : undefined}>
          <img className="Photo-img" src={`${S3_EMILY}/${photo}`} alt="photo" />
        </Paragraph>
      </CardBody>
    </Card>
  );
};
export default PhotoTemplate;
