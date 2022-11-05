import * as d3 from 'd3';
import { 
	useRef, 
	useLayoutEffect,
	useCallback,
	useState,
	useEffect } from 'react';
import { Box } from '@chakra-ui/react';


export default function BasicWhiskerPlot(props) {
	const { sumstat, height, ...kv } = props;

	const [clientWidth, setClientWidth] = useState(undefined);

	const resizeObserver = new ResizeObserver((entries) => {
		setClientWidth(entries[0].contentRect.width);
	});

	const vizAnchor = useRef(undefined);
	const container = useRef(undefined);

	useEffect(() => {
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
			left: 40,
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

		var x = d3.scaleBand()
			.range([0, width])
			.domain(xGroups)
			.padding(.1)
		svg.select("#x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll(".tick text")
			.attr('font-size', '14px')
			.style("font-weight", "600")

		svg.selectAll(".myVerts")
			.data(sumstat)
			.join("line")
				.attr("class", "line myVerts")
				.attr("x1", (d) => (x(d.groupName) + x.bandwidth() / 2))
				.attr("x2", (d) => (x(d.groupName) + x.bandwidth() / 2))
				.attr("y1", (d) => (y(d.bottomWhisker)))
				.attr("y2", (d) => (y(d.topWhisker)))
				.attr("stroke", "black")

		svg.selectAll(".myRect")
			.data(sumstat)
			.join("rect")
				.attr("class", "rect myRect")
				.attr("x", (d) => (x(d.groupName)))
				.attr("y", (d) => (y(d.topBox)))
				.attr("height", (d) => (Math.abs(y(d.topBox) - y(d.bottomBox))))
				.attr("width", x.bandwidth())
				.attr('rx', 5)
				.attr('ry', 5)
				.attr("stroke", "black")
				.attr("fill", (d) => (d.fill))

		svg.selectAll(".medianLines")
			.data(sumstat)
			.join("line")
				.attr("class", "line medianLines")
				.attr("x1", (d) => (x(d.groupName)))
				.attr("x2", (d) => (x(d.groupName) + x.bandwidth()))
				.attr("y1", (d) => (y(d.value)))
				.attr("y2", (d) => (y(d.value)))
				.attr("stroke", "black")
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