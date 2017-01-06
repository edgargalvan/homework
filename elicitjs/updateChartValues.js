/**
 * Created by edgargalvan on 9/15/15.
 */

function getTableData(arg) {
    var table = $(arg);
    var data = [];
    table.find('tr').each(function (rowIndex, r) {
        var cols = [];
        $(this).find('td').each(function (colIndex, c) {
            cols.push(c.textContent);
        });
        data.push(cols);
    });

    data = data.slice(1); // drop the heading
    return data;
}

function rebuildChart(usrInput) {

    layout.xaxis.title = usrInput[0][0];
    layout.yaxis.title = usrInput[1][0];
    layout.title = 'Elicited Utility Function: ';
    var update = {
        'x': [
            usrInput[0].slice(1).map(Number),
        ],
        'y': [
            usrInput[1].slice(1).map(Number)
        ]
    };
    Plotly.restyle(graphDiv, update);

    if (usrInput[1].slice(1)[0] >= usrInput[1].slice(1)[1]){
        swal({ title: usrInput[1][0] +" must be increasing!",
            text: "Go back and fix it!",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok!",
            closeOnConfirm: false },
            function(){  location.reload();  });
    }
}


