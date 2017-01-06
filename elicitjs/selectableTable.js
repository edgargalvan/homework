/**
 * Created by edgargalvan on 10/5/15.
 */

function makeTableSelectable(x0,y0,xNew) {
    var isMouseDown = false;
    $("#selectableTable td")
        .mousedown(function () {
            isMouseDown = true;

            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            pickHighlighted(this,row,col,x0,y0,xNew);
            return false; // prevent text selection
        });
    $(document)
        .mouseup(function () {
            isMouseDown = false;
        });
}

function pickHighlighted(element,row,col,x0,y0,xNew) {

    $(element).toggleClass("highlighted");

    var isHighlighted = $(element).hasClass("highlighted");
    var isNextHighlighted = $(element.nextSibling).hasClass("highlighted");
    var isPreviousHighlighted = $(element.previousSibling).hasClass("highlighted");

    if (isHighlighted && isNextHighlighted) {
        $(element.nextSibling).toggleClass("highlighted");
    }

    if (isHighlighted && isPreviousHighlighted) {
        $(element.previousSibling).toggleClass("highlighted");
    }

    var rowCount = $('#selectableTable  >tbody >tr').length;
    for (var i = 0; i < rowCount; i++){
        var currentElement = document.getElementById('selectableTable').rows[i].cells[col] ;
        var nextElement = document.getElementById('selectableTable').rows[i].cells[Number(!col)] ;

        var isHighlightedCurrentElement = $(currentElement).hasClass("highlighted");
        var isHighlightedNextElement = $(nextElement).hasClass("highlighted");

        if (col==1){
            if ( (isHighlightedCurrentElement && i<row) || (!isHighlightedCurrentElement && i>row) ){
                $(currentElement).toggleClass("highlighted");
            }
            if ( isHighlightedNextElement && i > row ){
                $(nextElement).toggleClass("highlighted");
            }
        }else{
            if ( (!isHighlightedCurrentElement && i<row) || (isHighlightedCurrentElement && i>row) ){
                $(currentElement).toggleClass("highlighted");
            }
            if ( isHighlightedNextElement && i < row ){
                $(nextElement).toggleClass("highlighted");
            }
        }
    }

    var isHighlightedTable = [];
    $('#selectableTable').find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('td').each(function (colIndex, c) {
            cols.push($(c).hasClass("highlighted"));
        });
        isHighlightedTable.push(cols);
    });

    //find the bounds of probability
    var upperBound = -1, lowerBound = isHighlightedTable.length;

    for (i = 0; i < isHighlightedTable.length - 1; i++) {
        if (isHighlightedTable[0][1]){
            upperBound = -1;
            lowerBound = 0;
            break
        }

        if ( isHighlightedTable[isHighlightedTable.length-1][0] ){
            upperBound = 8;
            lowerBound = 9;
            break
        }

        if ( isHighlightedTable[i][0] && !isHighlightedTable[i + 1][0] ) {
            upperBound = i;
        }

        if ( !isHighlightedTable[i][1] && isHighlightedTable[i + 1][1] ) {
            lowerBound = i+1;
        }
    }

    // new point is the probability selected from the table times the maximum y value
    var newPoint = y0[y0.length-1]*(9-lowerBound +(lowerBound-upperBound)/2)/10;
    if (!isNaN(newPoint)) {

        var x = x0.slice();
        var y = y0.slice();

        x.splice(xNew[0]+1,0, xNew[1]);
        y.splice(xNew[0]+1,0,newPoint);

        var equation = nPolynomialFit(x,y);
        layout.title = 'Elicited Function: '+equation;
        var update = {
            'x': [x],
            'y': [y]
        };

        data[0].x = x;
        data[0].y = y;
        Plotly.restyle(graphDiv, update);

    }
}
