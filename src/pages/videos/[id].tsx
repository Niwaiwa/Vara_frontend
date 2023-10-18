import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ContainerFluid from '../../components/ContainerFluid';
import VideoDetail from '../../components/videos/VideoDetail';


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

// export const getStaticProps: GetStaticProps = async (context) => {
//     const id = context.params?.id;
//     return {
//         props: {
//             id,
//         }
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [
//             { params: { id: 'test' } },
//         ],
//         fallback: true,
//     }
// }

export default Video;