     class Point{    // Создаем класс точки, в которой будем хранить координаты
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        function FillPolygon(context, vert) {
            let miny = vert[0].y, maxy = vert[0].y;         //  поиск минимального и максимального Y
            for (let i = 0; i < vert.length; ++i) {         //  проходя по массиву поставленных точек
                if (vert[i].y < miny) miny = vert[i].y;     //
                if (vert[i].y > maxy) maxy = vert[i].y;     //
            }

            let y_array = [];                                        // массив вида yarray[Y] = [x1, x2, ...] - хранит координаты X
            for (let i = 0; i < vert.length; ++i) {                 // каждой точки пересечения по данной координате Y
                let p = 0;                                          // p = следующая Y, если данная Y не равна концу списка
                if (i !== vert.length - 1) p = i + 1;
                let hi = 0, lo = 0;
                if (vert[i].y > vert[p].y) {hi = i; lo = p;}        // проверяем, лежит ли итерируемая Y между координатами Yi и Yp точек прямой,
                else if (vert[i].y < vert[p].y) {hi = p; lo = i;}   // принадлежащей фигуре, чтобы найти пересечения
                else continue;

                let k = (vert[hi].y - vert[lo].y) / (vert[hi].x - vert[lo].x); // вычисляем коэф. угла наклона стороны фигуры
                for (let j = vert[lo].y; j < vert[hi].y; ++j) {                // в цикле проходим по всем сторонам
                    if (typeof y_array[j] == "undefined") y_array[j] = [];       // если в массиве yarray нет точек пересечения с данной Y, то создаем массив
                    y_array[j].push((j - vert[lo].y)/k + vert[lo].x)            // добавляем точку X в массив пересечений с учетом сдвига по оси OX
                }
            }

            for (let y = miny; y < maxy; ++y) {                                 // в цикле проходим по всех Y от min до max
                let x_array = y_array[y].sort(function(a, b) { return a - b; });  // сортируем X
                for (let j = 0; j < x_array.length / 2; ++j) {   // проходим по числу интервалам между точками пересечений (если в фигуре получили 4 точки пересечения, то между
                                                                // ними может быть только два промежутка фигуры, между первыми двумя точкаи и последними двумя)
                    for (let x = x_array[j*2]; x < x_array[j*2+1]; ++x) {     // строим точки для каждого интервала соответственно
                        ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);   //
                    }
                }
            }
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
     const k = 2 * d_min;
     if (dy <= dx) {
         y = y0;
         for (x = x0; x * x_dir <= x1 * x_dir; x += x_dir) {
                ctx.fillRect(x , y , 1, 1);
                eps = eps + k;
                if (eps > d_max) {
                    y += y_dir;
                    eps = eps - 2 * d_max;
                }
            }
        } else {
         x = x0;
         for (y = y0; y * y_dir <= y1 * y_dir; y += y_dir) {
                ctx.fillRect(x , y , 1, 1);
                eps = eps + k;
                if (eps > d_max) {
                    x += x_dir;
                    eps = eps - 2 * d_max;
                }
            }
        }
    }