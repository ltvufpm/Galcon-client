export default class Base {
    constructor(parent) {
        this.canvas = parent.canvas
        this.ctx = parent.ctx
        this.parent = parent
    }

    render() {}
    update() {}
    mouseDown() {}
    mouseUp() {}
    mouseMove() {}
}