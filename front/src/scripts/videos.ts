import {Video} from '@/common/parts/video';


export const initVideos = (): void => {
    const video = [
        ...document.getElementsByClassName('video'),
    ].map(el => new Video(el as HTMLDivElement));

    video.forEach(v => v.init());
};
