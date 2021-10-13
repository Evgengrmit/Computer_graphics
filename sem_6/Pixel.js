class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get_neighbours() {
        let neighbours = [];

        neighbours[0] = new Pixel(this.x, this.y - 1);
        neighbours[1] = new Pixel(this.x - 1, this.y);
        neighbours[2] = new Pixel(this.x, this.y + 1);
        neighbours[3] = new Pixel(this.x + 1, this.y);

        return neighbours;
    }
}