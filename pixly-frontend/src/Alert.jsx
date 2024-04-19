
import { Box, Button } from "grommet";
import { Link } from 'react-router-dom';



export default function Alert({ photoId }) {
    return (
        <Box >
            <Link to={`/photo/${photoId}`}>
                <Button
                    label="Go to Photo"
                />
            </Link>

        </Box >
    );
}