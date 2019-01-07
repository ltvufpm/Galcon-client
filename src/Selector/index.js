import { COLORS, SCREEN_WIDTH } from '../Utils';

export default class Selector {
    constructor(ctx, label, x, y, data, selectedIndex = 0, onSelect, width = 60) {
        this.ctx = ctx;
        this.label = label;
        this.x = x;
        this.y = y;
        this.selectedIndex = selectedIndex;
        this.onSelect = onSelect;
        this.items = [];
        this.width = width;
        this.initItems(data);
    }

    initItems(data) {}

    onItemSelected(index) {
        this.items[this.selectedIndex].setIsSelected(false);
        this.selectedIndex = index;
        this.items[this.selectedIndex].setIsSelected(true);
        if (this.onSelect) this.onSelect(index);
    }

    onMouseMove(x, y) {
        for (const item of this.items) item.onMouseMove(x, y);
    }
    onMouseDown() {}
    onMouseUp(x, y) {
        for (const item of this.items) item.onMouseUp(x, y);
    }
    onKeyDown() {}

    draw() {
        this.ctx.fillStyle = COLORS.RED;
        this.ctx.font = '22px Courier';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        const tw = this.ctx.measureText(this.label).width;
        this.ctx.fillText(this.label, this.x - tw - 10, this.y + 12);

        for (const item of this.items) item.draw();
    }
}
