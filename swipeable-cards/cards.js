'use strict';

class Cards {
    constructor () {
        this.cards = document.querySelectorAll('.card');

        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.update = this.update.bind(this);

        this.targetBCR = null;  // bounding client rect (element size and position)
        this.target = null;
        this.draggingCard = false;

        this.targetX = 0;
        this.startX = 0;
        this.currentX = 0;
        this.screenX = 0;

        this.addEventListener();

        requestAnimationFrame(this.update);
    }

    addEventListener () {
        // touch events
        document.addEventListener('touchstart', this.onStart);
        document.addEventListener('touchmove', this.onMove);
        document.addEventListener('touchend', this.onEnd);
        // mouse events
        document.addEventListener('mousedown', this.onStart);
        document.addEventListener('mousemove', this.onMove);
        document.addEventListener('mouseup', this.onEnd);
    }

    onStart (evt) {
        if (this.target)
            return;

        if (!evt.target.classList.contains('card'))
            return;

        this.target = evt.target;
        this.targetBCR = this.target.getBoundingClientRect();
        this.startX = evt.pageX || evt.touches[0].pageX;
        this.currentX = this.startX;

        this.draggingCard = true;
        this.target.style.willChange = 'transform';

        evt.preventDefault();
    }

    onMove (evt) {
        if (!this.target)
            return;

        this.currentX = evt.pageX || evt.touches[0].pageX;
    }

    onEnd (evt) {
        if (!this.target)
            return;

        this.targetX = 0; // go back to the middle
        let screenX = this.currentX - this.startX;
        if (Math.abs(screenX) > this.targetBCR.width * 0.25) {    // if 25% percent of the width go out the border
            this.targetX = (screenX > 0) ? this.targetBCR.width : -this.targetBCR.width;
        }

        this.draggingCard = false;
    }

    update () {

        requestAnimationFrame(this.update);

        if (!this.target)
            return;

        if (this.draggingCard) {
            this.screenX = this.currentX - this.startX;
        } else {
            this.screenX += (this.targetX - this.screenX) / 4;  // more than 4 will be slower (out animation)
        }

        const normalizedDragDistance = (Math.abs(this.screenX) / this.targetBCR.width);
        const opacity = 1 - Math.pow(normalizedDragDistance, 3); // more the card is far from the middle, less it is visible

        this.target.style.transform = `translateX(${this.screenX}px)`;
        this.target.style.opacity = opacity;

        // remove the card
        const isNearlyInvisible = (opacity < 0.01);
        if(!this.draggingCard && isNearlyInvisible) {
            this.target.parentNode.removeChild(this.target);
            this.target = null;
        }
    }
}

window.addEventListener('load', () => new Cards());
