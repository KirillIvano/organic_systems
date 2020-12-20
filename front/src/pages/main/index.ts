import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/owl.carousel';

import '@/common';
import '@/events';


($('.owl-carousel.testimonials-carousel') as any).owlCarousel({
    items: 1,
    margin: 20,
    stagePadding: 20,
    autoplay: true,
    loop: true,
    dots: false,
});

($('.owl-carousel.intro-carousel') as any).owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    dots: false,
});