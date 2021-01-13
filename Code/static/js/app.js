
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

  var trace1 = {
    y: slicedOTU_ids.map(otuID => `OTU ${otuID}`).reverse(),
    x: slicedsample_value.reverse(),
    text: slicedOTU_lables.reverse(),
    type: "bar",
    orientation: "h"
    };
  
    // data
    var data_1 = [trace1];
                      
    //  Apply the group bar mode to the layout
    var layout_1 = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
         l: 150,
         t: 30
       }
    };
    // Render the plot to the div tag with id "plot"
    Plotly.plot("bar", data_1, layout_1);
};

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

  var trace2 = {
    x: Bub_OTU_ids,
    y: Bub_sample_value,
    text: Bub_OTU_lables,
    mode: 'markers',
    marker: {
      color:Bub_OTU_ids,
      size: Bub_sample_value
    }
  };
  
  var data_2 = [trace2];
  
  var layout_2 = {
    title: 'Marker Size',
    showlegend: false,
    // height: 600,
    // width: 600
  };
  
  Plotly.plot('bubble', data_2, layout_2);

};

d3.json("samples.json").then(function(data) {
  // console.log(data.metadata);
  var  dropdown_load = d3.select("#selDataset");    
      data.names.forEach(name => {
      dropdown_load.append("option").attr("value",name).text(name);
    
  });
    populate_demographic(data, data.names[0]); 
    bar_graph(data, data.names[0]);
    bubble_graph(data, data.names[0]);
});


d3.json("samples.json").then(function(data) {
  optionChanged=(value) => {
    // function to populate demographic
    populate_demographic(data, value);
    bar_graph(data, value);
    bubble_graph(data, value);
  };  
});