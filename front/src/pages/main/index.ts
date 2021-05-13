import {createCarousel} from '@/util/owl';

import {createTestimonials} from '@/common/parts/testimonials';

createTestimonials('.owl-carousel.testimonials-carousel');

createCarousel(
    '.owl-carousel.intro-carousel',
    {
        items: 1,
        autoplay: true,
        loop: true,
        navText: ['<div class=\'nav-btn prev-slide\'></div>','<div class=\'nav-btn next-slide\'></div>'],
        dots: false,
    },
);
