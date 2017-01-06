/**
 * Created by edgar on 10/28/2015.
 */
function nPolynomialFit(x,y) {


    var data = [x,y];

// change the order of the polynomial
    for(var order = 1; order<=5; order++)
    {
        var solution = regression('polynomial', numeric.transpose(data), order);

        // error quantification
        var SE_line = 0;
        var SE_y = 0;
        var ybar = numeric.sum(y) / y.length;

        for (var i = 0; i < x.length; i++) {
            var yhat = 0;
            for (var j = 0; j < solution.equation.length; j++) {
                yhat = yhat + solution.equation[j] * Math.pow(x[i], j);
            }

            SE_line = SE_line + Math.pow(y[i] - yhat, 2);
            SE_y = SE_y + Math.pow(y[i] - ybar, 2)
        }

        var R = 1 - SE_line / SE_y;
        if (R>0.95){ break;}
    }

    return solution.string;
}
