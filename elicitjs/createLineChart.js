/**
 * Created by edgargalvan on 9/15/15.
 */
function createLineChart(graphDiv, data,xLabel,yLabel) {

    layout = {
        title: 'Elicited Function:',
        showlegend: false,
        xaxis: {
            title: xLabel,
            autorange: true,
            showgrid: true,
            zeroline: true,
            showline: false,
            autotick: true,
            titlefont: {
                family: 'Helvetica',
                size: 22
                //color: '#7f7f7f'
            }
        },
        yaxis: {
            title: yLabel,
            autorange: true,
            showgrid: true,
            zeroline: true,
            showline: false,
            autotick: true,
            titlefont: {
                family: 'Helvetica',
                size: 22
                //color: '#7f7f7f'
            }
        }
    };

    var options = {showLink: false,
        displaylogo: false
    };
    Plotly.plot(graphDiv, data, layout, options);
}
