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

    mouseUp(x, y) {
        for (const touchable of this.touchables) touchable.onMouseUp(x, y);
    }

    keyDown(code, key) {
        for (const touchable of this.touchables) touchable.onKeyDown(code, key);
    }
}