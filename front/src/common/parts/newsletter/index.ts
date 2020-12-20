import {inject, injectable} from 'inversify';

import {container} from '@/services';
import {subscribeToNewsletter} from '@/services/news';
import {BusInterface} from '@/services/interfaces/BusInterface';
import {NewsActions, newsSubscribeStart, newsSubscribeSuccess, newsSubscribeError} from '@/events/news/actions';
import {SERVICES_TYPES} from '@/services/types';

import './styles.scss';


@injectable()
class Newsletter {
    private _form: HTMLFormElement;
    private _emailInput: HTMLInputElement;
    private _submitButton: HTMLButtonElement;

    constructor(
        @inject(SERVICES_TYPES.ActionsBus) private _bus: BusInterface<NewsActions>,
    ) {
        this._form = document.getElementById('newsletterForm') as HTMLFormElement;
        this._emailInput = this._form.elements[0] as HTMLInputElement;
        this._submitButton = this._form.getElementsByTagName('button')[0] as HTMLButtonElement;
    }

    handleFormSubmit = (e: Event) => {
        e.preventDefault();

        const email = this._emailInput.value;

        this.handleFormSend(email);
    }

    private async handleFormSend(email: string) {
        this.disableForm();
        this._bus.fire(newsSubscribeStart(email));

        const res = await subscribeToNewsletter(email);

        if (res.ok) {
            this._bus.fire(newsSubscribeSuccess());
        } else {
            this._bus.fire(newsSubscribeError(res.error));
        }

        this.enableForm();
    }

    private disableForm() {
        this._submitButton.setAttribute('disabled', 'true');
        this._emailInput.setAttribute('disabled', 'true');
    }

    private enableForm() {
        this._submitButton.setAttribute('disabled', 'false');
        this._emailInput.setAttribute('disabled', 'false');
    }

    initForm() {
        this._form.addEventListener('submit', this.handleFormSubmit);
    }
}

const newsletter = container.resolve(Newsletter);
newsletter.initForm();
