import {Container} from '@/util/DIContainer';
import {SERVICES_TYPES} from './types';

import {Bus} from '@/events';


const container = new Container();

container.register(SERVICES_TYPES.ActionsBus, new Bus());


export {container};
