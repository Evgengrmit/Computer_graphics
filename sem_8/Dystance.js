function distance(p0, p1, p2){
    var k = (p2[1] - p0[1])/(p2[0] - p0[0]);
    var b = -1*k*p0[0] + p0[1];
    d = Math.abs(-k*p1[0] + p1[1] -1*b)/Math.sqrt(k*k + 1);
    return d
}