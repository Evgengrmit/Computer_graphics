function Fx(imgData, w, h, x, y) {
    v11 = imgData.data[(x - 1) * 4 + (y - 1) * 4 * w];
    v21 = imgData.data[(x - 1) * 4 + y * 4 * w];
    v31 = imgData.data[(x - 1) * 4 + (y + 1) * 4 * w];
    v13 = imgData.data[(x + 1) * 4 + (y - 1) * 4 * w];
    v23 = imgData.data[(x + 1) * 4 + y * 4 * w];
    v33 = imgData.data[(x + 1) * 4 + (y + 1) * 4 * w];

    return -v11 - v21 - v31 + v13 + v23 + v33;
}

function Fy(imgData, w, h, x, y) {
    v11 = imgData.data[(y - 1) * 4 + (x - 1) * 4 * h];
    v21 = imgData.data[(y - 1) * 4 + x * 4 * h];
    v31 = imgData.data[(y - 1) * 4 + (x + 1) * 4 * h];
    v13 = imgData.data[(y + 1) * 4 + (x - 1) * 4 * h];
    v23 = imgData.data[(y + 1) * 4 + x * 4 * h];
    v33 = imgData.data[(y + 1) * 4 + (x + 1) * 4 * h];

    return v11 + v21 + v31 - v13 - v23 - v33;
}