import React from 'react';
import { Vortex } from 'react-loader-spinner';



interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <Vortex
    visible={true}
    height="150"
    width="150"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
);
};

export default Loader;