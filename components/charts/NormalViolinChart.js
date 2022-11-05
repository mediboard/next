import * as d3 from 'd3';
import { 
	useRef, 
	useLayoutEffect,
	useCallback,
	useState,
	useEffect } from 'react';
import { Box } from '@chakra-ui/react';


var normal = function(mean, variance) {
  var predicate = 1 / Math.sqrt(variance * 2 * Math.PI);

  return function(x) {
    return predicate * Math.exp( -Math.pow(x - mean, 2) / (2 * variance));
  };
};

function generatePoints(fy, step=1, min, max) {
	const noPoints = Math.ceil((max-min)/step);

	return [...new Array(noPoints).keys()].map(x => x*step).map(x => ([min+x, fy(min + x)]));
}

export default function NormalViolinChart(props) {
	const { sumstat, forceReload, ...kv } = props;

	const [clientWidth, setClientWidth] = useState(undefined);

	const measuredContainer = useCallback((node) => {
		if (node !== null) {
			setClientWidth(node.clientWidth);
		}
	})

	const vizAnchor = useRef(undefined);

	useLayoutEffect(() => {
		if (vizAnchor?.current && sumstat?.length && clientWidth) {
			renderChart(vizAnchor.current, clientWidth);
		}
	}, [vizAnchor, sumstat?.length, clientWidth])

	function renderChart(el, cWidth) {
		const height = 400;
		const noPoints = 60;

		const margin = {
			left: 30,
			right: 10,
			top: 10,
			bottom: 40
		}
		const width = cWidth - margin.left - margin.right;

		const xGroups = [... new Set(sumstat?.map(x => x.title))];
		const xSubGroups = [... new Set(sumstat?.map(x => x.groupName))]

		// append the svg object to the body of the page
		const svg = d3.select(el)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.select("#chart-body")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Max num is the datapoint with the smallest standard deviation
		const minPoint = sumstat?.reduce((prev, curr) => {
			return prev.dispersion < curr.dispersion ? prev : curr;
		})
		const minNormal = normal(minPoint?.value, minPoint?.dispersion * minPoint?.dispersion);
		const maxVal = minNormal(minPoint?.value);

		let top = Math.max(...sumstat?.map(x => x.max));
		let bottom = Math.min(...sumstat?.map(x => x.min));

		top = Math.max(top*1.1, top - top*.1);
		bottom = Math.min(bottom*1.1, bottom + bottom*.1);

		var y = d3.scaleLinear()
			.domain([bottom, top])
			.range([height, 0])
		svg.select("#y-axis")
			.call(d3.axisLeft(y));

		var x = d3.scaleBand()
			.range([0, width])
			.domain(xGroups)
			.padding(.1)
		svg.select("#x-axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		const xSubGroup = d3.scaleBand()
			.domain(xSubGroups)
			.range([0, x.bandwidth()])
			.padding(.01);

		var xNum = d3.scaleLinear()
			.range([0, xSubGroup.bandwidth()])
			.domain([-1 * maxVal, maxVal])

		const data = sumstat?.map(x => {
			const normalDist = normal(x.value, (x.dispersion*x.dispersion));
			const step = (x.max - x.min) / noPoints;

			const points = generatePoints(normalDist, step, x.min, x.max);

			return {
				...x,
				'points': points
			}
		});

		svg.selectAll("myViolin")
			.data(data)
			.enter()
			.append("g")
				.attr("transform", (d) => (`translate(${x(d.title) + xSubGroup(d.groupName)}, 0)`))
			.append("path")
				.style("fill",(d) => (d.fill))
				.datum((d) => (d.points))
				.attr("d", d3.area()
					.x0((d) => (xNum(-1 * d[1])))
					.x1((d) => (xNum(d[1])))
					.y((d) => (y(d[0])))
					.curve(d3.curveCatmullRom)
				)
	}

	return (
		<Box w='100%' ref={measuredContainer}>
			<svg id="content" height="350" ref={vizAnchor}>
			<g id='chart-body'>
				<g id='x-axis' />
				<g id='y-axis' />
			</g>
			</svg>
		</Box>
	)
}