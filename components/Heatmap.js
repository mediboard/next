import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3'
import { Box, HStack } from '@chakra-ui/react';


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
    while (word = words.pop()) {
      line.push(word)
      tspan.text(line.join(" "))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(" "))
        line = [word]
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
      }
    }
  })
}

function getFill4Value(value) {
	if (value < 0) return 'grey';

	return value < .05 ? "green" : "red"
}

export default function HeatMap({
	sumstat,
	width,
	height,
	margin,
	setSelectedGroup,
	setSelectedValue,
	setSelectedVariable,
	selectedGroup,
	selectedVariable
}) {
	const svgRef = useRef(undefined);

	useEffect(() => {
		if (!sumstat) return;
		// if (!selectedGroup?.name && !selectedVariable?.name) {
		// 	const startingGroup = sumstat[0]?.outcomeGroupA;
		// 	const startingVariable = sumstat[0]?.outcomeGroupB;
		// 	const startingValue = sumstat[0]?.value;

		// 	if (!startingGroup && !startingVariable) return;

		// 	setSelectedGroup(startingGroup);
		// 	setSelectedVariable(startingVariable);
		// 	setSelectedValue(startingValue);
		// }
		
		createHeatMap(sumstat);
	});

	function isRectSelected(d, group, variable) {
		return d.group == group?.name && d.variable == variable?.name;
	}

	function createHeatMap(data) {
		console.log(data);
		const leftAxisWidth = 90;
		const bottomAxisHeight = 20;

		let groups = sumstat.map(x => x.group);
		const group2Fill = {};
		sumstat.forEach(ss => {
			if (!group2Fill[ss.group]) {
				group2Fill[ss.group] = ss.outcomeGroupA?.fill;
			}
		})

		let variables = sumstat.map(x => x.variable);
		let boxHeight = height - bottomAxisHeight;

		const svgEl = d3.select(svgRef.current)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)

		svgEl.selectAll("*").remove();
		const svg = svgEl.append("g")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform", `translate(${margin.left}, ${margin.top})`)

	  // Build X scales and axis:
	  var x = d3.scaleBand()
	    .range([ 0, width ])
	    .domain(groups)
	    .padding(0.05);
	  svg.append("g")
	    .style("font-size", 0)
	    .attr("transform", `translate(0,${boxHeight})`)
	    .call(d3.axisBottom(x).tickSize(0))
	    .select(".domain").remove()

    // Build Y scales and axis:
	  var y = d3.scaleBand()
	    .range([ boxHeight, 0 ])
	    .domain(variables)
	    .padding(0.05);
	  svg.append("g")
	    .style("font-size", 0)
			.attr("width", margin.left)
	    .call(d3.axisLeft(y).tickSize(0))
	    .selectAll('.tick')
	    .append("foreignObject")
			.attr("width", margin.left)
			.attr("height", y.bandwidth())
			.attr("x", -margin.left)
			.attr("y", -1 * y.bandwidth() / 2)
			.append("xhtml:div")
			.attr('style','word-wrap: break-word; display: flex; align-items:center; justify-content:right; text-align:right; padding-right:10px;line-height:1; font-size:14px;')
			.style("height", "100%")
			.style("border", (d) => (`2px solid ${group2Fill[d]}`))
			.style("font-weight", "500")
			.style("font-family", "var(--chakra-fonts-body)")
			.html(d => (d))
	    .select(".domain").remove()

  var onClick = function(d, i) {
	    setSelectedValue(i.value);
	    setSelectedGroup(i.outcomeGroupA);
	    setSelectedVariable(i.outcomeGroupB);
	  }

	  svg.selectAll()
	    .data(data, function(d) {return d.group+':'+d.variable;})
	    .enter()
	    .append("rect")
	      .attr("x", function(d) { return x(d.group) })
	      .attr("y", function(d) { return y(d.variable) })
	      .attr("rx", 4)
	      .attr("ry", 4)
	      .attr("width", x.bandwidth() )
	      .attr("height", y.bandwidth() )
	      .style("fill", function(d) { return getFill4Value(d.value)} )
	      .style("cursor", 'pointer')
	      .style("stroke-width", 4)
	      .style("stroke", (d) => (isRectSelected(d, selectedGroup, selectedVariable) ? 'black' : 'none'))
	      .style("opacity", (d) => (isRectSelected(d, selectedGroup, selectedVariable) ? 1 : .7))
	    .on("click", onClick)
	}

	return (
		<svg ref={svgRef}  />
	);
}