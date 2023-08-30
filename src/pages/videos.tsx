import React from 'react';
import ContainerFluid from '../components/ContainerFluid';
import VideosPage from '../components/videos/VideosPage';


const Videos: React.FC = () => {
  return (
    <ContainerFluid>
      <VideosPage />
    </ContainerFluid>
  );
};

export default Videos;