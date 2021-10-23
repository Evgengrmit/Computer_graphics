// ctx - rendering context холста, arr - массив точек по которым строим кривую
// delay - задержка перед отрисовкой следующей точки, pause - пауза перед началом  рисования,

function drawLines(ctx, arr, delay, pause) {
    for (let j = 0; j < arr.length; j++) {
        ctx.moveTo(arr[j][0], arr[j][1]);
        ctx.lineTo(arr[j + 1][0], arr[j + 1][1]);
        ctx.stroke();
    }

}

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