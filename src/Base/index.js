import {
    isPointInsideArea
} from '../Utils';

export default class Base {
    constructor(parent) {
        this.canvas = parent.canvas
        this.ctx = parent.ctx
        this.parent = parent

        this.breackpoints = {};
        this.mouseUpHandlers = {};
        this.mouseMoveHandlers = {};
        this.mouseDownHandlers = {};
    }

    render() {}
    update() {}

    mouseDown(x, y) {
        for (const key in this.breackpoints) {
            if (isPointInsideArea({ x, y }, this.breackpoints[key])) {
              if (this.mouseDownHandlers[key]) this.mouseDownHandlers[key]();
              return true;
            }
        }

        return false;
    }

    mouseUp(x, y) {
        for (const key in this.breackpoints) {
            if (isPointInsideArea({ x, y }, this.breackpoints[key])) {
              if (this.mouseUpHandlers[key]) this.mouseUpHandlers[key]();
              return true;
            }
        }

        return false;
    }

    mouseMove(x, y) {
        for (const key in this.breackpoints) {
            if (isPointInsideArea({ x, y }, this.breackpoints[key])) {
                if (this.mouseMoveHandlers[key]) this.mouseMoveHandlers[key]();
                return true;
            }
        }

        return false;
    }
}