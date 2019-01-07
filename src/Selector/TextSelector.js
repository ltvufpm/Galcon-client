import { TouchableRect } from '../Touchable';
import Selector from './index';
import { COLORS } from '../Utils';

class TextItem extends TouchableRect {
    constructor(ctx, x, y, w, h, text, index, onSelect) {
        super(ctx, x, y, w, h);
        this.text = text;
        this.onSelect = onSelect;
        this.index = index;
        this.isSelected = false;
        this.w = w;
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

        this.ctx.fillStyle = COLORS.RED;
        this.ctx.font = 'bold 20px Courier'
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'middle'
        const tw = this.ctx.measureText(this.text).width;
        this.ctx.fillText(this.text, this.area[0].x + (this.w - tw) / 2, this.area[0].y + 12);
    }
}

export default class TextSelector extends Selector {
    initItems(data) {
        const width = 60;
        const height = 35;
        const itemsInRow = Math.floor(300 / width);

        this.items = data.map((item, i) => new TextItem(
            this.ctx,
            this.x + (i % itemsInRow) * width,
            this.y + Math.floor(i / itemsInRow) * height,
            width - 10,
            height - 10,
            `${item * 100}%`,
            i,
            this.onItemSelected.bind(this)
        ));

        this.items[this.selectedIndex].setIsSelected(true);
    }
}