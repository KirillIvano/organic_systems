import {Container, injectable} from 'inversify';
import 'reflect-metadata';

import {Bus} from '@/events';
import {NewsActions} from '@/events/news/actions';

import {SERVICES_TYPES} from './types';
import {BusInterface} from './interfaces/BusInterface';


@injectable()
class BusContainer extends Bus<NewsActions> {}

const container = new Container();

container.bind<BusInterface<NewsActions>>(SERVICES_TYPES.ActionsBus).to(BusContainer);


export {container};
