import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/owl.carousel';

export const createCarousel = (
    elDescriptor: Element | string,
    options: OwlCarousel.Options,
): void => {
    $(elDescriptor as string).owlCarousel(options);
};
