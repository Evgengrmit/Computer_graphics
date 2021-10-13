
let flag = 1;
let state = 1;
// Array for polygon
let polyg_points = [];
let polyg_points_number = 0;

let x0 = 0;
let y0 = 0;
let canvas = document.getElementById('lab06');
let suggest = document.getElementById('suggest');

let ctx = canvas.getContext('2d');

canvas.addEventListener('click', (event) => {
    if (state) {
        if (flag) {
            if (event.offsetX > 0 && event.offsetX < canvas.width)
                if (event.offsetY > 0 && event.offsetY < canvas.height) {
                    // Add to array
                    polyg_points[polyg_points_number] = new Pixel(event.offsetX, event.offsetY);
                    polyg_points_number++;

                    // Draw
                    x0 = event.offsetX;
                    y0 = event.offsetY;
                    ctx.fillRect(x0, y0, 1, 1);
                    flag = 0;
                }
        }
        else {
            polyg_points[polyg_points_number] = new Pixel(event.offsetX, event.offsetY);
            polyg_points_number++;

            ctx.fillRect(event.offsetX, event.offsetY, 1, 1);
            draw_line(x0, y0, event.offsetX, event.offsetY,ctx);
            x0 = event.offsetX;
            y0 = event.offsetY;
        }
    }
    else {
        suggest.textContent = "Done, area filled";
        fillArea(event.offsetX, event.offsetY,ctx);
    }
});

document.addEventListener('keydown', function (event) {
    if (state === 1 && polyg_points_number > 1) {
        suggest.textContent = "Now click into the figure to fill it";
        state = 0;
        flag = 1;
        draw_line(polyg_points[0].x, polyg_points[0].y, polyg_points[polyg_points_number - 1].x, polyg_points[polyg_points_number - 1].y,ctx); // Draw last line
    }
});