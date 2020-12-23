export {Bus} from './utils/bus';
import {UiActions} from './ui/actions';
import {NewsActions} from './news/actions';


export type Actions = UiActions & NewsActions;
