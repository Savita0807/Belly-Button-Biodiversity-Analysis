// Function to populate the demographic data from the sample.json in the dropdown menu
populate_demographic=(data, value) => {
  var Map_data = data.metadata;  
  Filter_Demo_data=(Map_data) => {
    return Map_data.id == value
  };
  var Load_data = Map_data.filter(Filter_Demo_data);  
  var metadata_load = d3.select("#sample-metadata");
  metadata_load.html("");
  Object.entries(Load_data[0]).forEach(([key,value]) => {
  metadata_load.append("h5").attr("id","meta_data").text(key + ":" + value);
  });
};

// Function to crate horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
bar_graph=(data, value) => {
  var Sap_data = data.samples;  
  Filter_Samp_data=(Sap_data) => {
    return Sap_data.id == value
  };
  var Samp_data = Sap_data.filter(Filter_Samp_data); 
  let {otu_ids,sample_values,otu_labels} = Samp_data[0];
  var slicedOTU_ids = otu_ids.slice(0,10);
  var slicedsample_value = sample_values.slice(0,10);
  var slicedOTU_lables = otu_labels.slice(0,10);
  
  
  var bar_trace = {
    y: slicedOTU_ids.map(otuID => `OTU ${otuID}`).reverse(),
    x: slicedsample_value.reverse(),
    text: slicedOTU_lables.reverse(),
    type: "bar",
    orientation: "h"
  };
 
  var bar_data = [bar_trace];
                  
  var bar_layout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
         l: 150,
         t: 30
    }
  };
   
  Plotly.newPlot("bar", bar_data, bar_layout);
};

// Funcation to crate Bubble graph that display each sample
bubble_graph=(data, value) => {
  var Sap_bub_data = data.samples;  
  Filter_Bub_data=(Sap_bub_data) => {
    return Sap_bub_data.id == value
  };
  var Samp_bub_data = Sap_bub_data.filter(Filter_Bub_data); 
  let {otu_ids,sample_values,otu_labels} = Samp_bub_data[0];
  var Bub_OTU_ids = otu_ids;
  var Bub_sample_value = sample_values;
  var Bub_OTU_lables = otu_labels;

  var bub_trace = {
    x: Bub_OTU_ids,
    y: Bub_sample_value,
    text: Bub_OTU_lables,
    mode: 'markers',
    marker: {
      color:Bub_OTU_ids,
      size: Bub_sample_value
    }
  };
  
  var bub_data = [bub_trace];
  
  var bub_layout = {
    title: 'Cultures Bubble Chart',
    showlegend: false,
    height: 600,
    width: 1500
  };
  
  Plotly.newPlot('bubble', bub_data, bub_layout);

};

// Funcation to crate Gauge chart plot the weekly washing frequency of the individual
gauge_graph=(data, value) => {
  var gauge_data = data.metadata;  
  Filter_gauge_data=(gauge_data) => {
    return gauge_data.id == value
  };
  var Gauge_data = gauge_data.filter(Filter_gauge_data); 
  let {wfreq} = Gauge_data[0];
  var Wash_freq = wfreq;
  var gaug_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: Wash_freq,
      title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9],  tickmode: "array",
                tickvals: ['1','2','3','4','5','6','7','8','9'],
                ticktext: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'], 
                ticks: ""},
        steps: [
          { range: [0, 1], color: '#F8F3EC' },
          { range: [1, 2], color: '#F4F1E5' },
          { range: [2, 3], color: '#E9E6CA' },
          { range: [3, 4], color: '#E2E4B1' },
          { range: [4, 5], color: '#D5E49D' },
          { range: [5, 6], color: '#B7CC92' },
          { range: [6, 7], color: '#8CBF88' },
          { range: [7, 8], color: '#8ABB8F' },
          { range: [8, 9], color: '#85B48A' }
        ],
      }  
    }
  ];
  
  var gaug_layout = {width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', gaug_data, gaug_layout);

};

// First call to populate demographic, bar graph, bubble graph and gauge chart
d3.json("samples.json").then(function(data) {
  var  dropdown_load = d3.select("#selDataset");    
      data.names.forEach(name => {
      dropdown_load.append("option").attr("value",name).text(name);
  });
    populate_demographic(data, data.names[0]); 
    bar_graph(data, data.names[0]);
    bubble_graph(data, data.names[0]);
    gauge_graph(data, data.names[0]);
});

// Call to populate demographic, bar graph, bubble graph and gauge chart base on changed ID value
d3.json("samples.json").then(function(data) {
  optionChanged=(value) => {
    populate_demographic(data, value);
    bar_graph(data, value);
    bubble_graph(data, value);
    gauge_graph(data, value);
  };  
});