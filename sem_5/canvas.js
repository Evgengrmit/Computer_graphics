let canvas = document.getElementById('lab05_1');
let ctx = canvas.getContext('2d');
var img = new Image();
img.src = "png-clipart-puppy-puppy-animal.png";
let w = 500;
let h = 500;
img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let imgData = ctx.getImageData(0, 0, w, h);
    console.log(imgData.data[h * 10 * 4 + 10 * 4], imgData.data[h * 10 * 4 + 10 * 4 + 1]);

    let canvas_s = document.getElementById("lab05_2");
    let ctx_s = canvas_s.getContext('2d');
    let imgData_s = imgData;


    for (let i = 1; i < h - 1; i++) {
        for (let j = 1; j < w - 1; j++) {
            let fx = convolution_function(imgData, w, h, j, i,'x');
            let fy = convolution_function(imgData, w, h, j, i,'y');
            imgData_s.data[j * 4 + i * w * 4 + 3] = Math.sqrt(fx * fx + fy * fy);
        }
    }

    for (let i = 0; i < 10; i++) {
        imgData_s.data[i * 4 + i * 200] = 255;
        imgData_s.data[3 + i * 4 + i * 200] = 255;
    }
    ctx_s.putImageData(imgData_s, 0, 0);
};
// ctx.fillStyle = '#f31212'
// ctx.fillRect(10, 10, 10, 10);
