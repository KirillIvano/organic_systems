export type WorkshopPreview = {
    id: number;
    title: string;
}

export type Workshop = {
    id: number;
    title: string;
    url: string;
    description: string;

    tutors: Array<{
        name: string;
        picture: string;
        info: string;
    }>,

    bannerHeading: string;
    bannerSubHeading: string;
    bannerText: string;
    bannerImage: string;
}
