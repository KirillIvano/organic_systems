import {Actions} from '@/events';
import {BusInterface} from '@/services/interfaces/BusInterface';
import {SERVICES_TYPES} from '@/services/types';
import {WorkshopPreview} from '@/domain/workshops/types';
import {CLOSE_NAV, navCloseAction, navOpenAction, OPEN_NAV} from '@/events/ui/actions';
import {container} from '@/services';
import {LOAD_WORKSHOPS_SUCCESS} from '@/events/workshops/actions';

import './styles.scss';

class DesktopNavbar {
    private _workshopsNavList: HTMLUListElement;

    constructor(
        private _bus: BusInterface<Actions>,
    ) {
        this._workshopsNavList = document.getElementById('desktop-header__workshops-list') as HTMLUListElement;
    }

    private getWorkshopNavTemplate = (workshop: WorkshopPreview) => (
        `
            <li class="nav-menu__item">
                <a 
                    href="/workshops/${workshop.id}.html"
                    class="nav-menu__link"
                >
                    ${workshop.title}
                </a>
            </li> 
        `
    )

    private renderWorkshopsNav = (workshops: WorkshopPreview[]) => {
        this._workshopsNavList.insertAdjacentHTML(
            'afterbegin',
            workshops
                .map(w => this.getWorkshopNavTemplate(w))
                .join(''),
        );
    }

    init() {
        this._bus.subscribe(
            LOAD_WORKSHOPS_SUCCESS,
            ({payload: {workshops}}) => this.renderWorkshopsNav(workshops),
        );
    }
}

class MobileNavbar {
    private _navbar: HTMLDivElement;
    private _workshopsNavList: HTMLUListElement;

    constructor(
        private _bus: BusInterface<Actions>,
    ) {
        this._navbar = document.getElementsByClassName('mobile-navbar')[0] as HTMLDivElement;
        this._workshopsNavList = document.getElementById('mobile-header__workshops-list') as HTMLUListElement;
    }

    handleNavbarOpen = () => {
        this._navbar.classList.add('opened');
        document.body.classList.add('prevent-scroll');
    }

    handleNavbarClose = () => {
        this._navbar.classList.remove('opened');
        document.body.classList.remove('prevent-scroll');
    }

    getWorkshopNavTemplate = (workshop: WorkshopPreview) => (
        `
            <li class="mobile-navbar__list-item">
                <a 
                    href="/workshops/${workshop.id}.html"
                    class="mobile-navbar__link"
                >
                    ${workshop.title}
                </a>
            </li> 
        `
    )

    renderWorkshopsNav = (workshops: WorkshopPreview[]) => {
        this._workshopsNavList.insertAdjacentHTML(
            'afterbegin',
            workshops
                .map(w => this.getWorkshopNavTemplate(w))
                .join(''),
        );
    }

    init() {
        this._bus.subscribe(CLOSE_NAV, this.handleNavbarClose);
        this._bus.subscribe(OPEN_NAV, this.handleNavbarOpen);

        this._bus.subscribe(
            LOAD_WORKSHOPS_SUCCESS,
            ({payload: {workshops}}) => this.renderWorkshopsNav(workshops),
        );
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
const mobileNavbar = container.inject(SERVICES_TYPES.ActionsBus)(MobileNavbar);
const desktopNavbar = container.inject(SERVICES_TYPES.ActionsBus)(DesktopNavbar);

header.init();
mobileNavbar.init();
desktopNavbar.init();
