function convolution_function(imgData, w, h, x, y, status) {
    let x_,y_,k_;
    if (status === 'x'){
        x_ = x;
        y_ = y;
        k_ = 1;
    } else if (status === 'y'){
        x_ = y;
        y_ = x;
        k_ = -1;

    }
    v11 = imgData.data[(x_ - 1) * 4 + (y_ - 1) * 4 * w];
    v21 = imgData.data[(x_ - 1) * 4 + y_ * 4 * w];
    v31 = imgData.data[(x_ - 1) * 4 + (y_ + 1) * 4 * w];
    v13 = imgData.data[(x_ + 1) * 4 + (y_ - 1) * 4 * w];
    v23 = imgData.data[(x_ + 1) * 4 + y_ * 4 * w];
    v33 = imgData.data[(x_ + 1) * 4 + (y_ + 1) * 4 * w];

    return k_*(-v11 - 2 * v21 - v31 + v13 + 2 * v23 + v33);
}

