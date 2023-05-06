import React, { FC } from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const Loader: FC<CircularProgressProps> = (props) => {
  return <CircularProgress {...props} />;
};

export default Loader;
