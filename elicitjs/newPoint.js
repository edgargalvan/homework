/**
 * Created by edgar on 10/28/2015.
 */
function newMidPoint(x,y) {

    //grab length of x and y values
    var n = x.length;
    var m = y.length;

    // error if they aren't the same
    if (n != m) {
        swal({
            title: "Encountered an error",
            text: "sorry about that, try reloading the page"
        })
    }

    //initialize reference for maximum distance
    var maxDistance = 0;
    var point = []; // we'll store the corresponding x and y indices here

    // check the distance between each point
    for (var i = 0; i < n - 1; i++) {
        var pi = [x[i], y[i]];
        var pNext = [x[i + 1], y[i + 1]];
        var dist = numeric.norm2(numeric.sub(pi, pNext));
        if (dist > maxDistance) {
            maxDistance = dist;
            point = i;
        }
    }

    //return the x midpoint between the points with the farthest distance
    return [point, (x[point]+x[point+1])/2];
}
