import {
    isPointInsideArea, COLORS
} from '../Utils';

export class Touchable {
    constructor(ctx, area, onClick) {
        this.ctx = ctx;
        this.area = area;
        if (onClick) this.onClick = onClick;

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

    onMouseDown(x, y) {}

    onKeyDown() {}

    get() {
        return this.isHover ? this.elemHover : this.elem;
    }

    draw() {}
}

export class TouchableImage extends Touchable {
    constructor(ctx, x, y, img, onClick, size = 30) {
        const area = [ { x, y }, { x: x + size, y: y + size } ];

        super(ctx, area, onClick);
        this.elem = document.getElementById(img)
        this.elemHover = document.getElementById(`${img}-hover`);
    }

    draw() {
        this.ctx.drawImage(this.get(), this.area[0].x, this.area[0].y);
    }
}

export class TouchableText extends Touchable {
    constructor(ctx, x, y, text, onClick) {
        ctx.font = '25px Courier';
        const tw = ctx.measureText(text).width;

        const area = [ { x, y }, { x: x + tw, y: y + 25 } ];

        super(ctx, area, onClick);
        this.elem = COLORS.GRAY1;
        this.elemHover = COLORS.WHITE;
        this.text = text;
    }

    setText(text) {
        this.text = text;
    }

    draw() {
        this.ctx.fillStyle = this.get();
        this.ctx.font = '25px Courier';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.area[0].x, this.area[0].y);
    }
}

export class TouchableRect extends Touchable {
    constructor(ctx, x, y, w, h, text, onClick) {
        const area = [ { x, y }, { x: x + w, y: y + h } ];

        super(ctx, area, onClick);
        this.elem = COLORS.RED
        this.elemHover = COLORS.ORANGE
        this.text = text;
        this.width = w;
        this.height = h;
    }

    onMouseMove(x, y) {
        let flag = !this.isHover;
        super.onMouseMove(x, y);
        
        flag = flag && this.isHover;

        if (flag) {
            const { RED, BLUE2, WHITE, ...colors } = COLORS;
            const keys  = Object.keys(colors);
            const index = Math.round(Math.random() * (keys.length - 1));
            
            this.elemHover = COLORS[keys[index]];
        }
    }

    draw() {
        this.ctx.fillStyle = this.get();

        this.ctx.fillRect(
            this.area[0].x, this.area[0].y,
            this.width, this.height
        )

        if (this.text) {
            const textWidth = this.ctx.measureText(this.text).width

            this.ctx.fillStyle = COLORS.WHITE
            this.ctx.font = '25px Courier'
            this.ctx.textAlign = 'left'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillText(this.text, this.area[0].x + this.width/2 - textWidth/2, this.area[0].y + this.height/2)
        }
    }
}