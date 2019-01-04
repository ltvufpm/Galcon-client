import {
    isPointInsideArea
} from '../Utils';

export default class Touchable {
    constructor(ctx, x, y, img, onClick, size = 30) {
        this.elem = document.getElementById(img)
        this.elemHover = document.getElementById(`${img}-hover`);
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.onClick = onClick;

        this.area = [
            { x, y }, { x: x + size, y: y + size }
        ];

        this.isHover = false;
    }

    onMouseMove(x, y) {
        if (isPointInsideArea({ x, y }, this.area)) {
            this.isHover = true;
        } else {
            this.isHover = false;
        }
    }

    onMouseUp(x, y) {
        if (isPointInsideArea({ x, y }, this.area)) {
            if (this.onClick) this.onClick();
        }
    }

    get() {
        return this.isHover ? this.elemHover : this.elem;
    }

    draw() {
        this.ctx.drawImage(this.get(), this.x, this.y);
    }
}