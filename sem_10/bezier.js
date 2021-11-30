function getBezierBasis(i, n, t) {
        // Факториал
        function f(n) {
            return (n <= 1) ? 1 : n * f(n - 1);
        }

        // считаем i-й элемент полинома Берштейна
        return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
    }


    function getBezierCurve(arr, step) {

        const res = [];

        for (let t = 0; t < 1 + step; t += step) {
            if (t > 1) {
                t = 1;
            }

            const ind = res.length;

            res[ind] = [0, 0];

            for (let i = 0; i < arr.length; i++) {
                const b = getBezierBasis(i, arr.length - 1, t);

                res[ind][0] += arr[i][0] * b;
                res[ind][1] += arr[i][1] * b;
            }
        }

        return res;
    }


    function Line(ctx, x0, y0, x1, y1) {
        let x;
        let y;
        const dy = Math.abs(y1 - y0);
        const dx = Math.abs(x1 - x0);
        const d_max = Math.max(dx, dy);
        const d_min = Math.min(dx, dy);
        let x_dir = 1;
        if (x1 < x0) x_dir = -1;
        let y_dir = 1;
        if (y1 < y0) y_dir = -1;
        let eps = 0;
        const s = 1;
        const k = 2 * d_min;
        if (dy <= dx) {
            y = y0;
            for (x = x0; x * x_dir <= x1 * x_dir; x += x_dir) {
                ctx.fillRect(x * s, y * s, s, s);
                eps = eps + k;
                if (eps > d_max) {
                    y += y_dir;
                    eps = eps - 2 * d_max;
                }
            }
        } else {
            x = x0;
            for (y = y0; y * y_dir <= y1 * y_dir; y += y_dir) {
                ctx.fillRect(x * s, y * s, s, s);
                eps = eps + k;
                if (eps > d_max) {
                    x += x_dir;
                    eps = eps - 2 * d_max;
                }
            }
        }
    }
