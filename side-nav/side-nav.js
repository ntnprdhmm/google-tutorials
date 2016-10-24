'use strict';

class SideNav {
    constructor () {
        console.log('SideNav');
        this.toggleButtonEl = document.querySelector('.js-menu');
        this.sideNavEl = document.querySelector('.js-side-nav');

        this.showSideNav = this.showSideNav.bind(this);

        this.addEventListeners();
    }

    addEventListeners () {
        this.toggleButtonEl.addEventListener('click', this.showSideNav);
    }

    showSideNav () {
        this.sideNavEl.classList.add('side-nav--visible');
    }
}

new SideNav();
