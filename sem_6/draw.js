function draw_line(x_start, y_start, x_end, y_end, ctx) {
    let dx = x_end - x_start;
    let dy = y_end - y_start;

    let sign_x = Math.sign(dx);
    let sign_y = Math.sign(dy);

    let x = x_start;
    let y = y_start;
    let epsilon = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
        while (x !== x_end) {//идём по всем точкам, начиная со второй и до последней
            epsilon += 2 * dy;
            if (Math.abs(epsilon) >= Math.abs(dx)) {
                y += sign_y;
                epsilon -= 2 * sign_x * sign_y * dx;
                //сдвинуть прямую (сместить вверх или вниз, если цикл проходит по иксам)
            }
            ctx.fillRect(x, y, 1, 1);
            x += sign_x;//или сместить влево-вправо, если цикл проходит по y
        }
    } else {
        while (y !== y_end) {//идём по всем точкам, начиная со второй и до последней
            epsilon += 2 * dx;
            if (Math.abs(epsilon) >= Math.abs(dy)) {
                epsilon -= 2 * sign_x * sign_y * dy;
                x += sign_x;
            }
            ctx.fillRect(x, y, 1, 1);
            y += sign_y;//сдвинуть прямую (сместить вверх или вниз, если цикл проходит по иксам)
        }
    }
}


function fillArea(x, y, ctx) {
    ctx.fillStyle = "#ff8c00"; // Dark Orange Color

    let stack = new Stack();
    let curr_point = new Pixel(x, y);

    stack.push(curr_point);

    while (stack.not_empty()) {
        curr_point = stack.pop();

        if (ctx.getImageData(curr_point.x, curr_point.y, 1, 1).data[3] !== 255) {

            ctx.fillRect(curr_point.x, curr_point.y, 1, 1);
            let neighbours;
            neighbours = curr_point.get_neighbours()
            neighbours.forEach(neib => {
                stack.push(neib);
            });

        }
    }

}


