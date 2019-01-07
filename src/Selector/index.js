import { COLORS }    from '../Utils';
import { TouchableRect } from '../Touchable';

class ColorItem extends TouchableRect {
    constructor(ctx, x, y, size, color, index, onSelect) {
        super(ctx, x, y, size, size);
        this.color = color;
        this.onSelect = onSelect;
        this.index = index;
        this.isSelected = false;
    }

    onClick() {
        if (this.onSelect) this.onSelect(this.index);
    }

    setIsSelected(isSelected) {
        this.isSelected = isSelected;
    }

    draw() {
        if (this.isHover || this.isSelected) {
            this.ctx.fillStyle =  this.isSelected ? COLORS.WHITE : 'rgba(255, 255, 255, 0.7)';
            this.ctx.fillRect(
                this.area[0].x - 4, this.area[0].y - 4,
                this.width + 8, this.height + 8
            );
        }

        if (this.color === 'rnd') {
            this.ctx.fillStyle = COLORS.RED;
            this.ctx.font = 'bold 20px Courier'
            this.ctx.textAlign = 'left'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillText('rnd', this.area[0].x - 3, this.area[0].y + 15);
        } else {
            this.ctx.fillStyle = this.color;

            this.ctx.fillRect(
                this.area[0].x, this.area[0].y,
                this.width, this.height
            );
        }
    }
}

export default class Selector {
    constructor(ctx, label, x, y, data, selectedIndex = 0, onSelect) {
        this.ctx = ctx;
        this.label = label;
        this.x = x;
        this.y = y;
        this.selectedIndex = selectedIndex;
        this.onSelect = onSelect;
        this.initItems(data);
    }

    initItems(data) {
        const tw = this.ctx.measureText(this.label).width - 10; // + 130
        const width = 40;
        const itemsInRow = Math.floor(300 / width);

        this.items = data.map((item, i) => new ColorItem(
            this.ctx,
            this.x + tw + (i % itemsInRow) * width,
            this.y - 13 + Math.floor(i / itemsInRow) * width,
            width - 10,
            item,
            i,
            this.onItemSelected.bind(this)
        ));

        this.items[this.selectedIndex].setIsSelected(true);
    }

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
        this.ctx.fillText(this.label, this.x, this.y);

        for (const item of this.items) item.draw();
    }
}
