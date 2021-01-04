import {Actions} from '@/events';
import {BusInterface} from '@/services/interfaces/BusInterface';
import {SERVICES_TYPES} from '@/services/types';

import './styles.scss';
import {CLOSE_NAV, navCloseAction, navOpenAction, OPEN_NAV} from '@/events/ui/actions';
import {container} from '@/services';

class Navbar {
    private _navbar: HTMLDivElement;

    constructor(
        private _bus: BusInterface<Actions>,
    ) {
        this._navbar = document.getElementsByClassName('mobile-navbar')[0] as HTMLDivElement;
    }

    handleNavbarOpen = () => {
        this._navbar.classList.add('opened');
        document.body.classList.add('prevent-scroll');
    }

    handleNavbarClose = () => {
        this._navbar.classList.remove('opened');
        document.body.classList.remove('prevent-scroll');
    }

    init() {
        this._bus.subscribe(CLOSE_NAV, this.handleNavbarClose);
        this._bus.subscribe(OPEN_NAV, this.handleNavbarOpen);
    }
}

class Header {
    private _burger: HTMLDivElement;
    private _isMenuOpened = false;

    constructor(
        private _bus: BusInterface<Actions>,
    ) {
        this._burger = document.getElementById('burger') as HTMLDivElement;
    }

    private activateBurger() {
        this._burger.classList.add('activated');
    }

    private deactivateBurger() {
        this._burger.classList.remove('activated');
    }

    private openNav() {
        this._bus.fire(navOpenAction());
    }

    private closeNav() {
        this._bus.fire(navCloseAction());
    }

    handleBurgerClick = () => {
        if (this._isMenuOpened) {
            this.deactivateBurger();
            this.closeNav();
        } else {
            this.activateBurger();
            this.openNav();
        }

        this._isMenuOpened = !this._isMenuOpened;
    }

    init() {
        this._burger.addEventListener('click', this.handleBurgerClick);
    }
}


const header = container.inject(SERVICES_TYPES.ActionsBus)(Header);
const navbar = container.inject(SERVICES_TYPES.ActionsBus)(Navbar);

header.init();
navbar.init();
