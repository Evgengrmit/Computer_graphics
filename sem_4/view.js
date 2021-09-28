let canvas = document.getElementById("lab04");
let ctx = canvas.getContext("2d");
let state = 0;
let polygon_start_x_tmp, polygon_start_y_tmp;
let polygon_start_x, polygon_start_y;
let polygon_end_x, polygon_end_y;
let line_start_x, line_start_y;
let line_end_x, line_end_y;
let polygon_lines = new Map()

canvas.addEventListener("click", function (event) {
    if (state === 0) {
        polygon_start_x_tmp = event.offsetX;
        polygon_start_y_tmp = event.offsetY;
        polygon_start_x = event.offsetX;
        polygon_start_y = event.offsetY;
        state = 1;
    } else if (state === 1) {
        polygon_end_x = event.offsetX;
        polygon_end_y = event.offsetY;
        Line(ctx, polygon_start_x_tmp, polygon_start_y_tmp, polygon_end_x, polygon_end_y);
        polygon_lines.set([polygon_start_x_tmp, polygon_start_y_tmp], [polygon_end_x, polygon_end_y]);
        polygon_start_x_tmp = event.offsetX;
        polygon_start_y_tmp = event.offsetY;
        state = 1;
    } else if (state === 2) {
        line_start_x = event.offsetX;
        line_start_y = event.offsetY;
        state = 3;
    } else if (state === 3) {
        line_end_x = event.offsetX;
        line_end_y = event.offsetY;
        let t1 = -1, t2 = -1;
        let key_start = -1, key_end = -1;
        Line(ctx, line_start_x, line_start_y, line_end_x, line_end_y, "#002eff");
        for (let key of polygon_lines.keys()) {
            if (t1 === -1) {
                t1 = ((line_start_y - line_end_y) * (key[0] - line_start_x) + (line_end_x - line_start_x)
                    * (key[1] - line_start_y)) / ((polygon_lines.get(key)[0] - key[0])
                    * (line_end_y - line_start_y) + (polygon_lines.get(key)[1] - key[1]) * (line_start_x - line_end_x));
                key_start = key;
                if (t1 > 1 || t1 < 0) {
                    t1 = -1
                } else {
                    continue
                }
            }
            if (t2 === -1) {
                t2 = ((line_start_y - line_end_y) * (key[0] - line_start_x) + (line_end_x - line_start_x)
                    * (key[1] - line_start_y)) / ((polygon_lines.get(key)[0] - key[0])
                    * (line_end_y - line_start_y) + (polygon_lines.get(key)[1] - key[1]) * (line_start_x - line_end_x));
                key_end = key;
                if (t2 > 1 || t2 < 0) {
                    t2 = -1
                    continue;
                }
            }
            if (t1 <= 1 && t1 >= 0 && t2 <= 1 && t2 >= 0) {
                let eraser_start_x = (polygon_lines.get(key_start)[0] - key_start[0]) * t1 + key_start[0];
                let eraser_start_y = (polygon_lines.get(key_start)[1] - key_start[1]) * t1 + key_start[1];
                let eraser_end_x = (polygon_lines.get(key_end)[0] - key_end[0]) * t2 + key_end[0];
                let eraser_end_y = (polygon_lines.get(key_end)[1] - key_end[1]) * t2 + key_end[1];

                for (let i = 0; i < 10; i += 1) {
                    Line(ctx, eraser_start_x, eraser_start_y, eraser_end_x, eraser_end_y, "#ffffff");
                }
                Line(ctx, polygon_lines.get(key_start)[0], polygon_lines.get(key_start)[1], key_start[0], key_start[1], "#000000")
                break;
            }
        }
        state = 2;
    }

});

canvas.addEventListener('contextmenu', function () {
    if (state === 1) {
        Line(ctx, polygon_start_x_tmp, polygon_start_y_tmp, polygon_start_x, polygon_start_y, "#000000");
        polygon_lines.set([polygon_start_x_tmp, polygon_start_y_tmp], [polygon_start_x, polygon_start_y])
        state = 2;
    }
});
