function lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const a_dx = x2 - x1;
    const a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1) ? [x1 + t * a_dx, y1 + t * a_dy] : false;
}
function draw_line(ctx, x0, y0, x1, y1) {
    let x;
    let y;
    const dy = Math.abs(y1 - y0);
    const dx = Math.abs(x1 - x0);
    const dmax = Math.max(dx, dy);
    const dmin = Math.min(dx, dy);
    let xdir = 1;
    if (x1 < x0) xdir = -1;
    let ydir = 1;
    if (y1 < y0) ydir = -1;
    var eps = 0;
    const s = 1;
    const k = 2 * dmin;
    if (dy <= dx) {
        y = y0;
        for (x = x0; x * xdir <= x1 * xdir; x += xdir) {
            ctx.fillRect(x * s, y * s, s, s);
            eps = eps + k;
            if (eps > dmax) {
                y += ydir;
                eps = eps - 2 * dmax;
            }
        }
    } else {
        x = x0;
        for (y = y0; y * ydir <= y1 * ydir; y += ydir) {
            ctx.fillRect(x * s, y * s, s, s);
            eps = eps + k;
            if (eps > dmax) {
                x += xdir;
                eps = eps - 2 * dmax;
            }
        }
    }
}

function get_reference_points(edges){
    let dots = new Map()
    for (let y = 0; y < 800; y++) {
        x1 = 0;
        y1 = y;
        x2 = 800;
        y2 = y;
        for (const entry of edges) {
            x3 = entry[0][0];
            y3 = entry[0][1];
            x4 = entry[1][0];
            y4 = entry[1][1];
            if (lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) !== false) {
                [a, b] = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
                if (dots.has(y)) {
                    dots.get(y).push(a);
                    dots.get(y).push(b);
                } else {
                    dots.set(y, [a, b]);
                }
            }
        }
    }
    return dots;
}