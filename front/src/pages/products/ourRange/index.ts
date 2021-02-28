import {lazyImages} from '@/scripts/lazyImages';

import './styles.scss';


lazyImages({
    className: 'lazy-img',
    loadedClassName: 'lazy-img_loaded',
    delayPx: 0,
});
