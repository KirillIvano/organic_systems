import {container} from '@/services';
import {subscribeToNewsletter} from '@/services/news';
import {BusInterface} from '@/services/interfaces/BusInterface';
import {
    newsSubscribeStart,
    newsSubscribeSuccess,
    newsSubscribeError,
} from '@/events/news/actions';
import {SERVICES_TYPES} from '@/services/types';

import './styles.scss';
import {Actions} from '@/events';


class Newsletter {
    private _form: HTMLFormElement;
    private _emailInput: HTMLInputElement;
    private _submitButton: HTMLButtonElement;

    constructor(
        private _bus: BusInterface<Actions>,
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

    private showFormSuccess() {
        this._form.classList.remove('error');
        this._form.classList.add('success');
    }

    private showFormError() {
        this._form.classList.remove('success');
        this._form.classList.add('error');
    }

    private async handleFormSend(email: string) {
        this.disableForm();
        this._bus.fire(newsSubscribeStart(email));

        const res = await subscribeToNewsletter(email);

        if (res.ok) {
            this._bus.fire(newsSubscribeSuccess());
            this.showFormSuccess();
        } else {
            this._bus.fire(newsSubscribeError(res.error));
            this.showFormError();
        }

        this.enableForm();
    }

    private disableForm() {
        this._submitButton.setAttribute('disabled', 'true');
        this._emailInput.setAttribute('disabled', 'true');
    }

    private enableForm() {
        this._submitButton.removeAttribute('disabled');
        this._emailInput.removeAttribute('disabled');
    }

    initForm() {
        this._form.addEventListener('submit', this.handleFormSubmit);
    }
}

const newsletter = container.inject(SERVICES_TYPES.ActionsBus)(Newsletter);
newsletter.initForm();
