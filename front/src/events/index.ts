export {Bus} from './utils/bus';
import {UiActions} from './ui/actions';
import {NewsActions} from './news/actions';
import {WorkshopsActions} from './workshops/actions';

export type Actions = UiActions & NewsActions & WorkshopsActions;
