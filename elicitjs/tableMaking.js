/**
 * Created by edgargalvan on 10/5/15.
 */
function makeMainTable(data,xLabel, yLabel) {
    var table = $("<table/>").attr({
        id: "mainTable", class: "flat-table first"
    });

    var contents = [["Attribute Name", "Lower Bound", "UpperBound"], //headers
        [xLabel, data[0].x[0].toString(), data[0].x[1].toString()],
        [yLabel, data[0].y[0].toString(), data[0].y[1].toString()]
        ];

    $.each(contents, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });
    return $(document.body).append(table);
}

function makeElicitationTable() {

    // grab user data from the main table
    var usrInput = getTableData('#mainTable');

    //update the chart to reflect the user inputed data
    rebuildChart(usrInput);

    //clear the elicitation table
    $("#selectableTable").remove();
    var table = $("<table/>").attr({
        id: "selectableTable", class: "flat-table next"
    });

    // use user data to make first table
    var Za = Number(usrInput[0][1]); //grab the first x element (not including attribute name)
    var Zb = Number(usrInput[0][2]);    var Zm = (Za + Zb) / 2;
    var rows = 9;
    var p = 0;

    $('<th>Risk</th><th>Certainty</th>').appendTo(table);
    for (var r = 0; r < rows; r++) {
        p += 10; //inc by 10
        var tr = $('<tr>');
        $('<td>(' + Za + ', ' + Zb + ', ' + p + '%, ' + (100-p).toString() + '%)</td>' + '<td>' + Zm + '</td>').appendTo(tr); //fill in your cells with something meaningful here
        $(tr).appendTo(table);
    }
    table.appendTo('body');

    //add new point to chart
    var x0 = data[0].x;
    var y0 = data[0].y;
    var xNew = newMidPoint(x0,y0);
    makeTableSelectable(x0,y0,xNew);
}

function updateElicitationTable() {

    // grab current data from chart
    var x0 = data[0].x;
    var y0 = data[0].y;
    var xNew = newMidPoint(x0,y0);




    // delete the existing table
    $("#selectableTable").remove();
    var table = $("<table/>").attr({
        id: "selectableTable", class: "flat-table next"
    });

    // find where to put the new point
    var Za = data[0].x[xNew[0]];
    var Zb = data[0].x[xNew[0]+1];
    var Zm = (Za + Zb) / 2;

    // make the new elicitation table
    var rows = 9;
    var p = 0;
    $('<th>Risk</th><th>Certainty</th>').appendTo(table);
    for (var r = 0; r < rows; r++) {
        p += 10; //inc by 10
        var tr = $('<tr>');
        $('<td>(' + Za + ', ' + Zb + ', ' + p + '%, ' + (100-p).toString() + '%)</td>' + '<td>' + Zm + '</td>').appendTo(tr); //fill in your cells with something meaningful here
        $(tr).appendTo(table);
    }
    table.appendTo('body');

    // go grab a new point from the user
    makeTableSelectable(x0,y0,xNew);
}
