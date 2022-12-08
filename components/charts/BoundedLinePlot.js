import * as d3 from 'd3';

import { 
	useRef, 
	useLayoutEffect,
	useState,
	useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { shadeColor } from '../../utils';


const MOBILE_THRESHOLD = 500;

export default function BoundedLinePlot(props) {
	const { sumstat, height, unit, ...kv } = props;

	const [clientWidth, setClientWidth] = useState(undefined);

	let resizeObserver = undefined; 

	const vizAnchor = useRef(undefined);
	const container = useRef(undefined);

	useEffect(() => {
		resizeObserver = new ResizeObserver((entries) => {
			setClientWidth(entries[0].contentRect.width);
		});

		if (container?.current) {
			resizeObserver.observe(container.current);
		}
	}, [container])

	useLayoutEffect(() => {
		if (vizAnchor?.current && sumstat?.length && clientWidth) {
			renderChart(vizAnchor.current, clientWidth);
		}

	}, [vizAnchor, sumstat, clientWidth])

	function clearChart(el) {
		d3.select(el).selectAll("*").remove();
	}

	function renderChart(el, cWidth) {
		// Lines with dots that focus and expand bars on tap
		// plus a tool tip lol

		const noPoints = 60;

		const margin = {
			left: 40,
			right: 10,
			top: 10,
			bottom: 50
		}

		if (cWidth < MOBILE_THRESHOLD) {
			margin.left = 6;
			margin.right = 6;
			margin.bottom = 0;
		}

		const width = cWidth - margin.left - margin.right;

		const xGroups = [... new Set(sumstat?.map(x => x.title))];

		function onLineClick(event, data) {
			d3.selectAll(".myVerts")
				.transition()
				.attr("y1", (d) => (d.groupName === data[0] ? y(d.bottomBox) : y(d.value)))
				.attr("y2", (d) => (d.groupName === data[0] ? y(d.topBox) : y(d.value)))

			d3.selectAll(".myLines")
				.transition()
				.attr("stroke", (d) => (d[0] === data[0] ? d[1][0]?.fill : d[1][0]?.fill + fade_factor))

		  svg.selectAll(".myDots")
		  	.transition()
		  	.attr("fill", (d) => (d.groupName === data[0] ? d.fill : d.fill + '00'))

		  event.stopPropagation();
		}

		function onDotClick(event, data) {
			d3.selectAll(".myVerts")
				.transition()
				.attr("y1", (d) => (d.groupName === data.groupName ? y(d.bottomBox) : y(d.value)))
				.attr("y2", (d) => (d.groupName === data.groupName ? y(d.topBox) : y(d.value)))

			d3.selectAll(".myLines")
				.transition()
				.attr("stroke", (d) => (d[0] === data.groupName ? d[1][0]?.fill : d[1][0]?.fill + fade_factor))

		  svg.selectAll(".myDots")
		  	.transition()
		  	.attr("fill", (d) => (d.groupName === data.groupName ? d.fill : d.fill + '00'))

		  event.stopPropagation();
		}

		function onBodyClick(event) {
			// reset to normal
			d3.selectAll(".myVerts")
				.transition()
				.attr("y1", (d) => (y(d.value)))
				.attr("y2", (d) => (y(d.value)));

			d3.selectAll(".myLines")
				.transition()
				.attr("stroke", (d) => (d[1][0]?.fill));

		  svg.selectAll(".myDots")
		  	.transition()
		  	.attr("fill", (d) => (d.fill));
		}

		const svg = d3.select(el)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.select("#chart-body")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)

		svg.selectAll(".background")
			.data([1])
			.join("rect")
			.attr("class", "rect background")
			.attr("height", height)
			.attr("width", width)
			.attr("fill", "#cccccc00")
      .on("click", onBodyClick)

		let top = Math.max(...sumstat?.map(x => x.topBox));
		let bottom = Math.min(...sumstat?.map(x => x.bottomBox));

		var y = d3.scaleLinear()
			.domain([bottom, top])
			.range([height, 0])
		svg.select("#y-axis")
			.call(d3.axisLeft(y))
			.selectAll(".tick text")
			.attr('font-size', '14px')
			.style("font-weight", "600")

		var x = d3.scaleOrdinal()
			.range([...Array(xGroups.length).keys()].map(x => x*(width/(xGroups.length-1))))
			.domain(xGroups)

		svg.select("#x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.attr('stroke-width', 0)
			.selectAll(".tick text")
			.attr('font-size', '0px')
			.style("font-weight", "600")
			.style("text-anchor", "end")
			.attr("transform", "rotate(-10)");

		svg.append("text")
			.attr('class', "text yLabel")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
	    .attr("y", -margin.left+10)
	    .attr("x", 0 - (height / 2))
			.attr('font-size', '14px')
			.style("font-weight", "600")
			.text(unit);

		if (cWidth < MOBILE_THRESHOLD) {
			svg.selectAll('.tick').remove();
			svg.selectAll('text').remove();
			svg.select("#x-axis").style("stroke-width", 0)
			svg.select("#y-axis").style("stroke-width", 0)
		}

	  svg.selectAll(".gridLine")
	  	.data(y.ticks(6))
	  	.join("line")
	  		.attr("class", "line gridLine")
	  		.attr("x1", (d) => (0))
	  		.attr("x2", (d) => (width))
	  		.attr("y1", (d) => (y(d)))
	  		.attr("y2", (d) => (y(d)))
				.attr("stroke-width", "1px")
				.attr("stroke", "#cccccc");

		svg.selectAll(".myVerts")
			.data(sumstat)
			.join("line")
				.attr("class", "line myVerts")
				.attr("x1", (d) => (x(d.title)))
				.attr("x2", (d) => (x(d.title)))
				.attr("y1", (d) => (y(d.value)))
				.attr("y2", (d) => (y(d.value)))
				.attr("stroke", (d) => (d.fill))
				.attr("stroke-width", '2')

		const gData = d3.group(sumstat, d => d.groupName);

		const fade_factor = '70';


		svg.selectAll(".myLines")
			.data(gData)
			.join("path")
				.attr("class", "line myLines")
				.attr("fill", "none")
				.attr("stroke", (d) => {return d[1][0]?.fill;})
				.attr("stroke-width", 3)
	  		.style("cursor", "pointer")
	      .attr("d", (d) => {
	      	return d3.line()
		        .x((d) => (x(d.title)))
		        .y((d) => (y(d.value)))
		        .curve(d3.curveCatmullRom)(d[1])
	      })
	      .on("click", onLineClick)

	  svg.selectAll(".myDots")
	  	.data(sumstat)
	  	.join("circle")
	  		.attr("class", "circle myDots")
	  		.attr("fill", (d) => (d.fill))
	  		.attr("cx", (d) => (x(d.title)))
	  		.attr("cy", (d) => (y(d.value)))
	  		.attr("r", 6)
	  		.style("cursor", "pointer")
	      .on("click", onDotClick)
	}

	return (
		<Box w='100%' ref={container}>
			<svg id="content" height="350" ref={vizAnchor}>
				<g id='chart-body'>
					<g id='x-axis' />
					<g id='y-axis' />
				</g>
			</svg>
		</Box>
	)
}