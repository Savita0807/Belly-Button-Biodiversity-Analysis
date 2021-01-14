// Function to populate the demographic
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

// Funcation to crate Bar graph
bar_graph=(data, value) => {
  // var samples_load = d3.select("#bar");
  // samples_load.html("");
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
                  
  //  Apply the group bar mode to the layout
    var bar_layout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
         l: 150,
         t: 30
    }
    };
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", bar_data, bar_layout);
};

// Funcation to crate Bubble graph
bubble_graph=(data, value) => {

  // var bubble_load = d3.select("#bubble");
  // bubble_load.html("");
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

// First call to populate demographic, Bar graph and bubble graph
d3.json("samples.json").then(function(data) {
  var  dropdown_load = d3.select("#selDataset");    
      data.names.forEach(name => {
      dropdown_load.append("option").attr("value",name).text(name);
  });
    populate_demographic(data, data.names[0]); 
    bar_graph(data, data.names[0]);
    bubble_graph(data, data.names[0]);
});

// Call to populate demographic, Bar graph and bubble graph base on change value
d3.json("samples.json").then(function(data) {
  optionChanged=(value) => {
    populate_demographic(data, value);
    bar_graph(data, value);
    bubble_graph(data, value);
  };  
});