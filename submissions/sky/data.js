// First, we will create some constants to define non-data-related parts of the visualization
var w = 700;// Width of our visualization
var h= 500;// Height of our visualization
var xOffset = 100;// Space for x-axis labels
var yOffset = 100;// Space for y-axis labels
var margin = 0;// Margin around visualization 
var vals = ['x', 'y']; //List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1];// Value to plot on y-axis
var hForReal = h - yOffset- margin;
// Next, we will load in our CSV of data
d3.csv('data/anscombe_I.csv', function (csvData){ return checkDataset(csvData)});
d3.csv('data/anscombe_II.csv', function (csvData){ return checkDataset(csvData)});
d3.csv('data/anscombe_III.csv', function (csvData){ return checkDataset(csvData)});
d3.csv('data/anscombe_IV.csv', function (csvData){ return checkDataset(csvData)});



//BARCHART
d3.csv('data/anscombe_II.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.
	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#barchart").append("svg:svg")
									.attr("width", w)
									.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(10);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x',  xOffset/2 -margin)
					.attr('y', h/2-margin)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);
					

    var bar = svg.selectAll(".bar")
					.data(data);

		// Create new elements if needed
	bar.enter().append("svg:rect"); //enter is how to do loops in d3.. keeps going until we say exit.
		// Update our selection
	bar.attr("x",  function(d) {return xScale(d[xVal]);}) 
		.attr("y", function(d) { return yScale(d[xVal]);})
		.attr("height", function(d) {return hForReal - yScale(d[xVal]);})
		.attr("width", 20)
		.attr("fill", "pink");
    
    // Now, let's select all of our points and change their color
});


//SCATTERPLOT
d3.csv('data/anscombe_II.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplot").append("svg:svg")
									.attr("width", w)
									.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x',  xOffset/2 -margin)
					.attr('y', h/2-margin)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);
					
	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
		// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

		// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //we never exited from point, so its gonna keep going. 
		.attr("cy", function(d) {return yScale(d[yVal]);})
		.attr("r",10) //radius
		.attr("fill", "purple");
		 

    point.append("svg:title")
         .text(function(d) {return d['x'];});

	// var title = d3.select("#scatterLabel").append("text")
 //   				   .attr("class", "label")
 // 			       .text("needs work");

});
 

//SCATTERPLOT INTERACTION
d3.csv('data/anscombe_II.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplot").append("svg:svg")
									.attr("width", w)
									.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x',  xOffset/2 -margin)
					.attr('y', h/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);

	var title = d3.select("#scatterLabel").append("text")
   				   .style("font-size", "30px")
  			       .text("Click on a red dot to see Data.");				
	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
	// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

	// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //we never exited from point, so its gonna keep going. 
		.attr("cy", function(d) {return yScale(d[yVal]);})
		.attr("r",10) //radius
		.attr("fill", "red")
		.on("mouseover", function(d) {d3.select(this).attr("r", 15).attr("fill", "#660000");})
		.on("mouseout", function(d) {d3.select(this).attr("r", 10).style("fill", "red");})
		.on("click", function(d) {d3.select("#scatterLabel").text("( "+d[xVal]+", "+ d[yVal]+" )").style("font-size", "30px"); });
	
});


//PART FIVE - 1
d3.csv('data/anscombe_I.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplotset1").append("svg:svg")
					.attr("width", w)
					.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin)
					.style("font-size", "30px")  //bigger text, bold and font change
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', '.label')
					.attr('x', xOffset/2 -margin)
					.attr('y', h/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);

	var titles = d3.select("#scatterLabel1").append("text") //link to #scatter.. in HTML Doc
   				    .attr("text-anchor", "middle") //try to pin it in middle.. couldnt figure out why this isnt working
   				    .attr("class", "titles")
     			    .attr("x", w/2) //dont know why this is not working
			        .attr("y", 0)
			        .style("font-size", "30px")
			        .style("font-weight", "bold")
			        .style("font-family", "sans-serif")
  				    .text("Anscombe I");	

	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
		// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

		// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //picking out the point we are on from the array
		.attr("cy", function(d) {return yScale(d[yVal]);}) //picking yVal out
		.attr("r",10) //radius
		.attr("fill", "teal"); //color of dots
		 
	
});
 

//PART FIVE - 2
d3.csv('data/anscombe_II.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplotset2").append("svg:svg")
					.attr("width", w)
					.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin)
					.style("font-size", "30px")  //bigger text, bold and font change
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', '.label')
					.attr('x', xOffset/2 -margin)
					.attr('y', h/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);

	var titles = d3.select("#scatterLabel2").append("text") //link to #scatter.. in HTML Doc
   				    .attr("text-anchor", "middle") //try to pin it in middle.. couldnt figure out why this isnt working
   				    .attr("class", "titles")
     			    .attr("x", w/2) //dont know why this is not working
			        .attr("y", 0)
			        .style("font-size", "30px")
			        .style("font-weight", "bold")
			        .style("font-family", "sans-serif")
  				    .text("Anscombe II");	

	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
		// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

		// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //picking out the point we are on from the array
		.attr("cy", function(d) {return yScale(d[yVal]);}) //picking yVal out
		.attr("r",10) //radius
		.attr("fill", "teal"); //color of dots
		 
	
});



//PART FIVE - 3
d3.csv('data/anscombe_III.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplotset3").append("svg:svg")
					.attr("width", w)
					.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin)
					.style("font-size", "30px")  //bigger text, bold and font change
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', '.label')
					.attr('x', xOffset/2 -margin)
					.attr('y', h/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);

	var titles = d3.select("#scatterLabel3").append("text") //link to #scatter.. in HTML Doc
   				    .attr("text-anchor", "middle") //try to pin it in middle.. couldnt figure out why this isnt working
   				    .attr("class", "titles")
     			    .attr("x", w/2) //dont know why this is not working
			        .attr("y", 0)
			        .style("font-size", "30px")
			        .style("font-weight", "bold")
			        .style("font-family", "sans-serif")
  				    .text("Anscombe III");	

	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
		// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

		// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //picking out the point we are on from the array
		.attr("cy", function(d) {return yScale(d[yVal]);}) //picking yVal out
		.attr("r",10) //radius
		.attr("fill", "teal"); //color of dots
		 
	
});


//PART FIVE - 4
d3.csv('data/anscombe_IV.csv', function(csvData){
	var data = csvData;

	//Define scales tat concert from the data domain to screen coordinates
	var xScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[xVal]);
			})+1])
			.range([xOffset + margin, w-20]);

	var yScale=d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return parseFloat(d[yVal]);
			})+1])
			.range([h- yOffset - margin, margin]);
	
	// This will edefine scales convert values
	// from our data domain into screen coordinates.

	// Next, we will create an SVG element names ScatterPlot to contain our visualization.
	
	var svg = d3.select("#scatterplotset4").append("svg:svg")
					.attr("width", w)
					.attr("height", h);

	// Build axes! (These are kind of annoying, actually...)
	//x-axis
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.ticks(5);

	var xAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(0, ' + (h-yOffset) + ')')
					.call(xAxis);

	var xLabel = svg.append("text")
					.attr('class', 'label')
					.attr('x', w/2)
					.attr('y', h - margin)
					.style("font-size", "30px")  //bigger text, bold and font change
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(xVal);

	//y-axis
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks(5);

	var yAxisG = svg.append('g')
					.attr('class', 'axis')
					.attr('transform', 'translate(' + xOffset + ', 0)')
					.call(yAxis);

	var yLabel = svg.append("text")
					.attr('class', '.label')
					.attr('x', xOffset/2 -margin)
					.attr('y', h/2)
					.style("font-size", "30px")
					.style("font-weight", "bold")
			        .style("font-family", "sans-serif")
					.text(yVal);

	var titles = d3.select("#scatterLabel4").append("text") //link to #scatter.. in HTML Doc
   				    .attr("text-anchor", "middle") //try to pin it in middle.. couldnt figure out why this isnt working
   				    .attr("class", "titles")
     			    .attr("x", w/2) //dont know why this is not working
			        .attr("y", 0)
			        .style("font-size", "30px")
			        .style("font-weight", "bold")
			        .style("font-family", "sans-serif")
  				    .text("Anscombe IV");	

	// Now, we will start actually building our scatterplot!
	// Select elements
	// Bind data to elements
    var point = svg.selectAll(".point")
					.data(data);
		// Create new elements if needed
	point.enter().append("svg:circle"); //enter is how to do loops in d3.. keeps going until we say exit.

		// Update our selection
	point.attr("class","point")
		.attr("cx", function(d) {return xScale(d[xVal]);}) //picking out the point we are on from the array
		.attr("cy", function(d) {return yScale(d[yVal]);}) //picking yVal out
		.attr("r",10) //radius
		.attr("fill", "teal"); //color of dots
		 
	
});

// A function to retrieve the next value in the vals list
function getNextVal(val) {
	return vals[(vals.indexOf(val) + 1) % vals.length];
};

// A function to change what values we plot on the x-axis
function setXval(val) {
	// Update xVal
	xVal = val;
	// Update the axis
	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
	xAxis.scale(xScale);
	xAxisG.call(xAxis);
	xLabel.text(xVal);
	// Update the points

};

// A function to change what values we plot on the y-axis
function setYval(val) {
	// Update yVal
	yVal = val;
	// Update the axis
	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
	yAxis.scale(yScale);
	yAxisG.call(yAxis);
	yLabel.text(yVal);
	// Update the points

};
  // function checkDataset(dataset) {
  //           if (dataset.length == 11)
  //               $("#partOne").append("<p>data loaded correctly</p>");
  //           else
  //               $("#partOne").append("<p>data loaded incorrectly. Try using the debugger to help you find the bug!</p>");
  //       }
//I do not know why this is not workingz