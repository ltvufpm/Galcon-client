import { COLORS, isPointInsideArea } from '../Utils';

import { Touchable } from '../Touchable';

export default class Input extends Touchable {
    constructor(ctx, x, y, label, value, onSubmit) {
        const area = [
            {x, y: y-20}, {x: x+300, y: y+20}
        ];
        super(ctx, area)
        
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.label = label;
        this.color = COLORS.RED;
        this.value = value;
        this.isActive = false;
        this.currentValue = value;
        this.onSubmit = onSubmit;
    }

    onMouseUp(x, y) {
        if (isPointInsideArea({ x, y }, this.area)) {
            this.setIsActive(true);
        } else {
            this.setValue();
            this.setIsActive(false);
        }
    }

    onKeyDown(code, key) {
        if (code === 13) {
            this.setValue();
            this.setIsActive(false);
        }
        else if (code === 8 && this.currentValue) this.currentValue = this.currentValue.slice(0, this.currentValue.length - 1);
        else if (code >= 48 && code <= 57 || code >= 65 && code <= 90) {
            this.currentValue += key;
        }
    }

    setValue() {
        if (this.currentValue) {
            this.value = this.currentValue;
        }
    }

    setIsActive(isActive) {
        this.isActive = isActive;
        if (!isActive) {
            this.onSubmit(this.value);
        } else {
            this.currentValue = this.value;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = '22px Courier';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        const tw = this.ctx.measureText(this.label).width;
        this.ctx.fillText(this.label, this.x  -tw, this.y);

        if (this.isActive) {
            this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
            this.ctx.fillRect(this.x, this.y - 14, 300, 25);
        }

        if (this.isHover) this.ctx.fillStyle = COLORS.WHITE;
        this.ctx.fillRect(this.x, this.y + 11, 300, 2);

        const value = this.isActive ? this.currentValue : this.value;

        this.ctx.fillStyle = COLORS.GRAY2;
        this.ctx.font = '25px Courier';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value, this.x + 5, this.y);
    }
}