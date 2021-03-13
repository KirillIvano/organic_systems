import '@/util/owl';
import {createCarousel} from '@/util/owl';

import './styles.scss';


const CAROUSEL_CONFIG: OwlCarousel.Options = {
    items: 1,
    autoplay: true,
    loop: true,
    dots: false,

    responsive: {
        0: {
            stagePadding: 10,
            margin: 10,
        },
        800: {
            stagePadding: 100,
            margin: 100,
        },
    },
};

export const createTestimonials = (testimonialsContainer: HTMLDivElement | string): void => {
    createCarousel(testimonialsContainer, CAROUSEL_CONFIG);
};
