function color3dPlane(L, parray, color) {
    console.log(parray);
    n = parray.length;
    console.log(n);
    var P12 = { x: parray[1].x-parray[0].x,
        y: parray[1].y-parray[0].y,
        z: parray[1].z-parray[0].z};
    var P13 = { x: parray[n-1].x-parray[0].x,
        y: parray[n-1].y-parray[0].y,
        z: parray[n-1].z-parray[0].z};
    var ny = (P12.z*P13.x-P13.z*P12.x)/(P13.y*P12.x-P12.y*P13.x);
    var N = {x: -1*(ny*P12.y+P12.z)/P12.x, y: ny, z:1 };
    console.log(N);
    var S = {x: parray[0].x-L.x, y: parray[0].y-L.y, z: parray[0].z-L.z};
    var cosa = (N.x*S.x+N.y*S.y+N.z*S.z)/Math.sqrt(N.x*N.x+N.y*N.y+N.z*N.z)/Math.sqrt(S.x*S.x+S.y*S.y+S.z*S.z);
    console.log("cos(a)="+cosa);


    console.log("color:"+((color&0xff0000)>>16)+" "
        +((color&0x00ff00)>>8)+" "+(color&0x0000ff));
    var R = Math.round(((color&0xff0000)>>16)*Math.abs(cosa))<<16;
    var G = Math.round(((color&0x00ff00)>>8)*Math.abs(cosa))<<8;
    var B = Math.round(((color&0x0000ff))*Math.abs(cosa));
    console.log("R:"+R);
    console.log("G:"+G);
    console.log("B:"+B);
    console.log("RGB:"+(R>>16)+" "+(G>>8)+" "+B);
    var tarray = [parray[0].x, parray[0].y, parray[1].x, parray[1].y,
        parray[2].x, parray[2].y];
    console.log(tarray);
    borderFillColor(ctx, tarray, Math.round(R|G|B));

}