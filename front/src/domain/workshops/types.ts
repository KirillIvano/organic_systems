export type WorkshopPreview = {
    id: number;
    title: string;
}

export type Tutor = {
    name: string;
    image: string;
    info: string;
}

export type Workshop = {
    id: number;
    title: string;
    url: string;
    description: string;

    tutors: Tutor[];

    bannerHeading: string;
    bannerSubHeading: string;
    bannerText: string;
    bannerImage: string;
}
