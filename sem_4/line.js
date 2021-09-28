function Line(ctx, x0, y0, x1, y1,colour) {
    ctx.fillStyle = colour
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
    let eps = 0;
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