type LazyImagesConfig = {
    className: string;

    loadedClassName?: string;

    throttle?: number;
    delayPx?: number;
}


type ObservedImage = {
    isShown: boolean;
    element: HTMLElement;
}

const getPageOffset = () => window.pageYOffset;
const getScreenHeight = () => document.documentElement.clientHeight;


const sortElementsByVerticalPosition = (elements: HTMLElement[]): HTMLElement[] => {
    const elementsCopy = [...elements];

    elementsCopy.sort(el => el.getBoundingClientRect().top - el.getBoundingClientRect().top);

    return elementsCopy;
};

const prepareElements = (elements: HTMLElement[]): ObservedImage[] =>
    sortElementsByVerticalPosition(elements)
        .filter(element => element.dataset['src'])
        .map(element => ({isShown: false, element}));


export const lazyImages = ({
    className,
    loadedClassName,
    throttle = 100,
    delayPx = 500,
}: LazyImagesConfig): {stop: () => void} => {
    const observedImagesElements = [...document.getElementsByClassName(className)] as HTMLElement[];
    const images = prepareElements(observedImagesElements);

    let prevOffset = 0;

    const showImage = (image: ObservedImage) => {
        image.isShown = true;
        image.element.setAttribute('src', image.element.dataset['src'] as string);

        if (loadedClassName) {
            const handleLoad = () => {
                image.element.classList.add(loadedClassName);
                image.element.removeEventListener('load', handleLoad);
            };

            image.element.addEventListener('load', handleLoad);
        }
    };

    const updateImages = () => {
        const screenHeight = getScreenHeight();

        for (const image of images) {
            if (!image.isShown) {
                const imageOffset = image.element.getBoundingClientRect().top;

                if (delayPx + screenHeight > imageOffset) {
                    showImage(image);
                }
            }
        }
    };

    const handleScroll = () => {
        const currentOffset = getPageOffset();

        if (currentOffset - prevOffset >= throttle) {
            updateImages();

            prevOffset = currentOffset;
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return {
        stop: () => window.removeEventListener('scroll', handleScroll),
    };
};
