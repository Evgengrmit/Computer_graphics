
    function drawLine(ctx, x0, y0, x1, y1) {
        var dy = Math.abs(y1-y0);
        var dx = Math.abs(x1-x0);
        var dmax = Math.max(dx, dy);
        var dmin = Math.min(dx, dy);
        var x_dir = 1;
        if (x1<x0) x_dir = -1;
        var y_dir = 1;
        if (y1<y0) y_dir = -1;
        var eps = 0;
        var s = 1;
        var k=2*dmin;
        if (dy<=dx) {
            var y = y0;
            for (var x=x0; x*x_dir<=x1*x_dir; x+=x_dir) {
                ctx.fillRect(x*s, y*s, s, s);
                eps = eps+k;
                if (eps>dmax) {
                    y+=y_dir;
                    eps = eps - 2*dmax;
                }
            }
        } else {
            var x = x0;
            for (var y=y0; y*y_dir<=y1*y_dir; y+=y_dir) {
                ctx.fillRect(x*s, y*s, s, s);
                eps = eps+k;
                if (eps>dmax) {
                    x+=x_dir;
                    eps = eps - 2*dmax;
                }
            }
        }
    }

    function dist(P0, P1, P2){
        var k = (P2[1] - P0[1])/(P2[0] - P0[0]);
        console.log('Coefficient', k);
        var b = -1*k*P0[0] + P0[1];
        var d = Math.abs(-k*P1[0] + P1[1] -1*b)/Math.sqrt(k*k + 1);
        console.log('Distance ',d);
        return d
    }

    function Bezie(P0, P1, P2){
        if(dist(P0, P1, P2) > 1){
            P0_ = [];
            P0_[0] = 0.5*P0[0] + 0.5*P1[0];
            P0_[1] = 0.5*P0[1] + 0.5*P1[1];

            P1_ = [];
            P1_[0] = 0.5*P1[0] + 0.5*P2[0];
            P1_[1] = 0.5*P1[1] + 0.5*P2[1];

            P0__ = [];
            P0__[0] = 0.5*P0_[0] + 0.5*P1_[0];
            P0__[1] = 0.5*P0_[1] + 0.5*P1_[1];
            drawLine(ctx, P0_[0], P0_[1], P1_[0], P1_[1]);
            Bezie(P0, P0_, P0__);

        }else{
            drawLine(ctx, P0_[0], P0_[1], P1_[0], P1_[1]);
        }
    }

    function Bezie_Sec(P0, P1, P2){
        if(dist(P0, P1, P2) > 1){
            P0_ = [];
            P0_[0] = 0.5*P0[0] + 0.5*P1[0];
            P0_[1] = 0.5*P0[1] + 0.5*P1[1];

            P1_ = [];
            P1_[0] = 0.5*P1[0] + 0.5*P2[0];
            P1_[1] = 0.5*P1[1] + 0.5*P2[1];

            P0__ = [];
            P0__[0] = 0.5*P0_[0] + 0.5*P1_[0];
            P0__[1] = 0.5*P0_[1] + 0.5*P1_[1];
            drawLine(ctx, P0_[0], P0_[1], P1_[0], P1_[1]);
            Bezie_Sec(P0__, P1_, P2);

        }else{
            drawLine(ctx, P0_[0], P0_[1], P1_[0], P1_[1]);
        }
    }
