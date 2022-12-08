import * as d3 from 'd3';
import { 
	useRef, 
	useLayoutEffect,
	useCallback,
	useState,
	useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { shadeColor } from '../../utils';


const MOBILE_THRESHOLD = 500;

export default function BasicWhiskerPlot(props) {
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

	function renderChart(el, cWidth) {
		const noPoints = 60;

		const margin = {
			left: 50,
			right: 10,
			top: 10,
			bottom: 50
		}
		const width = cWidth - margin.left - margin.right;

		const xGroups = [... new Set(sumstat?.map(x => x.groupName))];

		// append the svg object to the body of the page
		const svg = d3.select(el)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.select("#chart-body")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		let top = Math.max(...sumstat?.map(x => x.max));
		let bottom = Math.min(...sumstat?.map(x => x.min));

		var y = d3.scaleLinear()
			.domain([bottom, top])
			.range([height, 0])
		svg.select("#y-axis")
			.call(d3.axisLeft(y))
			.selectAll(".tick text")
			.attr('font-size', '14px')
			.style("font-weight", "600")

		let maxBoxHeight = Math.abs(y(top) - y(bottom));
		let maxBoxWidth = maxBoxHeight / 4;

		var x = d3.scaleBand()
			.range([0, width])
			.domain(xGroups)
			.padding(.1)
		svg.select("#x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.attr('stroke-width', 0)
			.selectAll(".tick text")
			.attr('font-size', '0px')
			.style("font-weight", "600")

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
				.attr("x1", (d) => (x(d.groupName) + x.bandwidth() / 2))
				.attr("x2", (d) => (x(d.groupName) + x.bandwidth() / 2))
				.attr("y1", (d) => (y(d.bottomWhisker)))
				.attr("y2", (d) => (y(d.topWhisker)))
				.attr("stroke", (d) => (shadeColor(d.fill, -30)))
				.attr("stroke-width", '2')

		svg.selectAll(".myRect")
			.data(sumstat)
			.join("rect")
				.attr("class", "rect myRect")
				.attr("x", (d) => (x(d.groupName) + (x.bandwidth() - Math.min(x.bandwidth(), maxBoxWidth))/2))
				.attr("y", (d) => (y(d.topBox)))
				.attr("height", (d) => (Math.abs(y(d.topBox) - y(d.bottomBox))))
				.attr("width", (d) => (Math.min(x.bandwidth(), maxBoxWidth)))
				.attr('rx', 5)
				.attr('ry', 5)
				.attr("stroke", (d) => (shadeColor(d.fill, -30)))
				.attr("stroke-width", '2')
				.attr("fill", (d) => (d.fill))

		svg.selectAll(".medianLines")
			.data(sumstat)
			.join("line")
				.attr("class", "line medianLines")
				.attr("x1", (d) => (x(d.groupName) + (x.bandwidth() - Math.min(x.bandwidth(), maxBoxWidth))/2))
				.attr("x2", (d) => (x(d.groupName) + x.bandwidth() - (x.bandwidth() - Math.min(x.bandwidth(), maxBoxWidth))/2))
				.attr("y1", (d) => (y(d.value)))
				.attr("y2", (d) => (y(d.value)))
				.attr("stroke", (d) => (shadeColor(d.fill, -30)))
				.attr("stroke-width", '2')
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