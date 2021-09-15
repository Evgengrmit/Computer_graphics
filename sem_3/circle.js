const plot = function (x, y) {
    ctx.fillStyle = '#1fc731';
    ctx.fillRect(x, y, 1, 1);
};


function drawCircle(x, y, radius) {
    let x0 = 0,
        y0 = radius,
        gap = 0,
        delta = (2 - 2 * radius);

    while (y0 >= 0) {
        plot(x + x0, y - y0);
        plot(x - x0, y - y0);
        plot(x - x0, y + y0);
        plot(x + x0, y + y0);

        gap = 2 * (delta + y0) - 1;

        if (delta < 0 && gap <= 0) {
            x0++;
            delta += 2 * x0 + 1;
            continue;
        }
        if (delta > 0 && gap > 0) {
            y0--;
            delta -= 2 * y0 + 1;
            continue;
        }
        x0++;
        delta += 2 * (x0 - y0);
        y0--;
    }
}