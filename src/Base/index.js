import {
    isPointInsideArea
} from '../Utils';

export default class Base {
    constructor(parent) {
        this.canvas = parent.canvas
        this.ctx = parent.ctx
        this.parent = parent

        this.touchables = [];
    }

    render() {
        for (const touchable of this.touchables) touchable.draw();
    }
    update() {}

    mouseClick(x, y) {
        for (const touchable of this.touchables) touchable.onMouseClick(x, y);
    }

    mouseMove(x, y) {
        for (const touchable of this.touchables) touchable.onMouseMove(x, y);
    }
}