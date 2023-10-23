import React from 'react';
import { useRouter } from 'next/router';
import ContainerFluid from '../../components/ContainerFluid';
import VideoDetail from '../../components/videos/VideoDetail';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


interface VideoProps {
    id: string;
}

const Video: React.FC<VideoProps> = (props) => {
    const router = useRouter();
    const videoId: string | undefined = router.query?.id as string;
    return (
        <ContainerFluid>
            { videoId === undefined ?
                <div>loading...</div>
                :
                <VideoDetail videoId={videoId} />
            }
        </ContainerFluid>
    );
};

export default Video;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const locale = context.locale || 'en';
    return { props: { ...(await serverSideTranslations(locale)) } };
  };