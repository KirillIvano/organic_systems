import {Container, injectable} from 'inversify';
import 'reflect-metadata';

import {Actions, Bus} from '@/events';

import {SERVICES_TYPES} from './types';
import {BusInterface} from './interfaces/BusInterface';

@injectable()
class BusContainer extends Bus<Actions> {}

const container = new Container();

container
    .bind<BusInterface<Actions>>(SERVICES_TYPES.ActionsBus)
    .to(BusContainer)
    .inSingletonScope();


export {container};
