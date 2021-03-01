import {Actions} from '@/events';
import {workshopsLoadStart, workshopsLoadSuccess} from '@/events/workshops/actions';
import {container} from '@/services';
import {BusInterface} from '@/services/interfaces/BusInterface';
import {SERVICES_TYPES} from '@/services/types';
import {getWorkshops} from '@/services/workshops';

class WorkshopsFetcher {
    constructor(private _bus: BusInterface<Actions>) {}

    async run() {
        this._bus.fire(workshopsLoadStart());

        const res = await getWorkshops();

        if (res.ok) {
            this._bus.fire(workshopsLoadSuccess(res.data.workshops));
        }
    }
}

const workshopsFetcher = container.inject(SERVICES_TYPES.ActionsBus)(WorkshopsFetcher);

workshopsFetcher.run();
