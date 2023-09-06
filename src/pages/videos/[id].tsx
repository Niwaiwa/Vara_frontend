import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import ContainerFluid from '../../components/ContainerFluid';
import VideoDetail from '../../components/videos/VideoDetail';


interface VideoProps {
    id: string;
}

const Video: React.FC<VideoProps> = (props) => {
  return (
    <ContainerFluid>
      <VideoDetail videoId={props.id} />
    </ContainerFluid>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    return {
        props: {
            id,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'test' } },
        ],
        fallback: true,
    }
}

export default Video;