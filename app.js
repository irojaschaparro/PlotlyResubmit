// CHECK THIS TO MAKE SURE ITS ACTUALLY PULLING
var jsonData;

d3.json("samples.json").then((data) => {
    jsonData = data;
    init();
});

function init() {
    var dropDown = d3.select('#selDataset');
    console.log(jsonData);
    jsonData.names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name);
    })
    optionChanged(jsonData.names[0])
};

function optionChanged(personID) {
    demographics(personID);
    barChart(personID);
    bubbleChart(personID);
    // guageChart(personID);
};

function demographics(personID) {
    console.log(jsonData.metadata)
    var metaData = jsonData.metadata.filter((sample) => sample.id == parseInt(personID))[0];
    console.log(metaData)
    var demoHTML = d3.select("#sample-metadata");
    demoHTML.html("")
    Object.entries(metaData).forEach(([key, value]) => demoHTML.append("h4").text(`${key}: ${value}`));
//Why is "h4" in there and not other
}

function barChart(personID) {
    // jsonData.sort(function(a, b) {
    //     return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    // });

    // Slice the first 10 objects for plotting
    var TopTen = jsonData.samples.filter((sample) => sample.id == parseInt(personID))[0];
    // console.log(TopTen)
    

    TopTenValues = TopTen.sample_values.slice(0, 10);
    TopTenOTU = TopTen.otu_ids.slice(0, 10);
    TopTenLabels = TopTen.otu_labels.slice(0, 10);
    console.log(TopTen)

    // Reverse the array due to Plotly's defaults
    // TopTen = TopTen.reverse();

    console.log(TopTen)
    var trace1 = {
        x: TopTenValues,
        y: TopTenOTU.map((id) => `OTU ${id}`),
        type: "bar",
        text: TopTenLabels,
        name: "Top 10 OTUs",
        orientation: "h"
    };

  // Create the data array for the plot
    var datas = [trace1];

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", datas);
};

function bubbleChart(personID) {
    var bubbleData = jsonData.samples.filter((sample) => sample.id == parseInt(personID))[0];
    // var bubbleData = jsonData;

    // DONT KNOW IF NEEDED, Reverse the array due to Plotly's defaults
    // TopTen = TopTen.reverse();
    var trace1 = {
        x: bubbleData.otu_ids,
        y: bubbleData.sample_values,
        mode: 'markers',
        marker: {
            size: bubbleData.sample_values
    }};

    var bubDatas = [trace1];

    //     var layout = {
    //         title: 'Marker Size and Color',
    //         showlegend: false,
    //         height: 600,
    //         width: 600
    // };
    Plotly.newPlot("bubble", bubDatas);
};
