import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * Component LoadingBar for loading effect..
 *
 * State:
 * none
 *
 * Props:
 * none
 *
 *
 */

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="success" />
    </Stack>
  );
}