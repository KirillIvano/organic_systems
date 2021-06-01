import '@/common/parts/header';
import '@/common/components/containers.scss';
import '@/common/components/scrollbar.scss';
import '@/common/bootstrap';

import {sendContacts} from '@/services/contacts';
import {ContactsDto} from '@/services/contacts/dto';

import './styles.scss';

type MessageTheme = 'error' | 'success';
class MutableMessage {
    private _message = '';
    private _theme: MessageTheme = 'error';

    get message(): string {
        return this._message;
    }
    set message(val: string) {
        this._message = val;
        this.updateText();
    }

    get theme(): MessageTheme {
        return this.theme;
    }
    set theme(val: MessageTheme) {
        const prev = this._theme;
        this._theme = val;
        this.updateTheme(prev);
    }

    constructor(private readonly container: HTMLElement) {}

    private updateTheme(from: MessageTheme) {
        this.container.classList.remove(`message_${from}`);
        this.container.classList.add(`message_${this._theme}`);
    }

    private updateText() {
        this.container.innerHTML = this._message;
    }
}

class ContactsForm {
    private _formElement: HTMLFormElement;
    private _errorBox: MutableMessage;

    constructor() {
        this._formElement = document.getElementById('contacts-form') as HTMLFormElement;

        const errorContainer = this._formElement.querySelector('.contacts__message-box') as HTMLDivElement;
        this._errorBox = new MutableMessage(errorContainer);
    }

    setError = (err: string) => {
        this._errorBox.message = err;
    }

    clearError = () => {
        this._errorBox.message = '';
    }

    handleSuccess = () => {
        this._errorBox.theme = 'success';
        this._errorBox.message = 'Форма отправлена';
        this._formElement.reset();
    }

    handleSubmit = async (e: Event) => {
        e.preventDefault();
        const data = new FormData(this._formElement);

        const res = await sendContacts({
            name: data.get('name'),
            email: data.get('email'),
            city: data.get('city'),
            phone: data.get('phone'),
            saloon: data.get('saloon'),
        } as ContactsDto);

        if (res.ok) {
            this.handleSuccess();
        } else {
            this.setError('Не удалось отправить форму');
        }
    }

    run() {
        this._formElement.addEventListener('submit', this.handleSubmit);
    }
}

const contactsForm = new ContactsForm();
contactsForm.run();
