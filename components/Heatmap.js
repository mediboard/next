import React, { useRef, useState, useEffect } from 'react';

import * as d3 from 'd3'
import { Box, HStack } from '@chakra-ui/react';
import { shadeColor } from '../utils';


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
	margin,
}) {
	const svgRef = useRef(undefined);
	const container = useRef(undefined);

	const [clientWidth, setClientWidth] = useState(undefined);

	let resizeObserver = undefined; 

	useEffect(() => {
		resizeObserver = new ResizeObserver((entries) => {
			setClientWidth(entries[0].contentRect.width);
		});

		if (container?.current) {
			resizeObserver.observe(container.current);
		}
	}, [container])

	useEffect(() => {
		if (svgRef?.current && sumstat?.length && clientWidth) {
			createHeatMap(sumstat);
		}
	});

	function isRectSelected(d, group, variable) {
		return d.group == group?.name && d.variable == variable?.name;
	}

	function createHeatMap(data) {
		const leftAxisWidth = 90;
		const bottomAxisHeight = 20;

		let groups = sumstat.map(x => x.group);

		const group2Fill = {};
		sumstat.forEach(ss => {
			if (!group2Fill[ss.group]) {
				group2Fill[ss.group] = ss.outcomeGroupA?.fill;
			}
		})

		const width = clientWidth - margin.left - margin.right;
		const height = width;

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
	    .style("stroke-width", 0)
	    .selectAll('.tick')
	    .append("foreignObject")
			.attr("width", x.bandwidth())
			.attr("height", margin.bottom)
			.attr("x", -1 * x.bandwidth() / 2)
			.append("xhtml:div")
			.style("height", "100%")
			.style("width", "100%")
			.style("background", (d) => (group2Fill[d]))
			.style("border", (d) => (`3px solid ${shadeColor(group2Fill[d], -30)}`))
			.style("border-radius", "4px")


    // Build Y scales and axis:
	  var y = d3.scaleBand()
	    .range([ boxHeight, 0 ])
	    .domain(variables)
	    .padding(0.05);
	  svg.append("g")
	    .style("font-size", 0)
			.attr("width", margin.left)
	    .call(d3.axisLeft(y).tickSize(0))
	    .style("stroke-width", 0)
	    .selectAll('.tick')
	    .append("foreignObject")
			.attr("width", margin.left)
			.attr("height", y.bandwidth())
			.attr("x", -margin.left)
			.attr("y", -1 * y.bandwidth() / 2)
			.append("xhtml:div")
			.attr('style','word-wrap: break-word; display: flex; align-items:center; justify-content:center; text-align:center; padding-right:10px;line-height:1; font-size:14px;')
			.style("height", "100%")
			.style("border", (d) => (`3px solid ${shadeColor(group2Fill[d], -30)}`))
			.style("background", (d) => (group2Fill[d]))
			.style("border-radius", "4px")
			.style("font-weight", "500")
			.style("color", "white")
			.style("font-family", "var(--chakra-fonts-body)")

	  // var onClick = function(d, i) {
	  // 	if (i.value === -1) return;

	  //   setSelectedValue(i.value);
	  //   setSelectedGroup(i.outcomeGroupA);
	  //   setSelectedVariable(i.outcomeGroupB);
	  // }

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
	      .style("stroke-width", 4)
	      .style("stroke", 'none')
	      .style("opacity", .7)
	}

	return (
		<Box w={[250, 350, 500]} ref={container}>
			<svg ref={svgRef}  />
		</Box>
	);
}