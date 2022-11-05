import { 
	useRef, 
	useLayoutEffect,
	useContext,
	useState,
	useEffect } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import * as d3 from 'd3';
import { useAuthenticator } from '@aws-amplify/ui-react';

import Card from '../Card';


function createMinMaxs(data) {
	const minMaxs = [];

	data.sort((a,b) => {
		return a.effectName.localeCompare(b.effectName);
	});

	let blockSize = 0;

	let start = data[0].effectName;
	let end = data[0].effectName; 
	while (start == end) {
		blockSize++;
		end = data[blockSize]?.effectName;
	}

	for (let i = 0; i < data.length; i = i + blockSize) {
		let max = Math.max(...data.slice(i, i + blockSize).map(x => x.freq))

		let min = Math.min(...data.slice(i, i + blockSize).filter(x => x.freq > 0)?.map(x => x.freq))

		minMaxs.push({
			effectName: data[i].effectName,
			min: min,
			max: max
		});
	}

	minMaxs.sort((a, b) => b.max - a.max);

	return minMaxs;
}

function calculateHeight(noDistinctPoints) {
	return 40 * noDistinctPoints;
}

export default function EffectsBubbleChart(props) {
	const { aspect, margin, data, groups, showStudies, ...kv } = props;

	const [clientWidth, setClientWidth] = useState(undefined);
	const [toolTipInfo, setToolTipInfo] = useState(undefined);

	const { user } = useAuthenticator((context) => [context.user]);

	const vizAnchor = useRef(null);
	const container = useRef(null);

	useEffect(() => {
		if (container?.current) {
			const newWidth = container.current.clientWidth;
			setClientWidth(newWidth);
		}
	}, [container])

	useLayoutEffect(() => {
		if (vizAnchor && data?.length && clientWidth) {
			renderChart(vizAnchor.current, clientWidth);
		}
	}, [vizAnchor, data?.length, clientWidth])

	function renderChart(el, clientWidth) {
		const minMaxs = createMinMaxs(data);
		const distinctEffects = [... new Set(minMaxs.map(x => x.effectName))];

		const width = clientWidth - margin.left - margin.right;
		const height = calculateHeight(distinctEffects.length) - margin.top - margin.bottom;

		var insertLinebreaks = function (t, d, width) {
			var el = d3.select(t);
			var p = d3.select(t.parentNode);

			p.append("foreignObject")
				.attr('x', -width)
				.attr("width", width)
				.attr("height", 30)
				.attr("y", -18)
				.append("xhtml:div")
				.attr('style','word-wrap: break-word; height:30px; display: flex; align-items:center; justify-content:right; text-align:right; padding-right:10px;line-height:1; font-size:14px;')
				.html(d);    

			el.remove();
		};

		// append the svg object to the body of the page
		const svg = d3.select(el)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.select("#chart-body")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		const maxVal = Math.max(...minMaxs.map(x => x.max));

		const noXTicks = clientWidth > 500 ? 7 : 3;

		const x = d3.scaleLinear()
			.domain([0, Math.min(maxVal+5, 100)])
			.range([ 0, width]);

		svg.select("#x-axis")
			.call(d3.axisTop(x).ticks(noXTicks).tickFormat(d => d + '%'))
			.attr("stroke-width", "0px")
			.selectAll(".tick text")
			.attr('font-size', '14px')
			.style("font-weight", "600")
			.attr('transform', 'translate(10,0)');

		svg.selectAll(".gridline")
			.data(x.ticks(noXTicks))
			.join("line")
			.attr("class", "line gridline")
			.attr('x1', function(d) { return x(d); })
			.attr('x2', function(d) { return x(d); })
			.attr('y1', 0)
			.attr('y2', height)
			.attr("stroke-width", "1px")
			.attr("stroke", "#cccccc");

		svg.select("#x-axis")
			.selectAll(".tick")
			.attr("stroke-width", "1px");

		const y = d3.scaleBand()
			.range([ 0, height ])
			.domain(distinctEffects)
			.padding(1);

		svg.select("#y-axis")
			.call(d3.axisLeft(y).tickFormat(() => ""))
			.attr("stroke-width", "0px");

		const t = svg.transition().duration(750);

		svg.selectAll(".coolLine")
			.data(minMaxs)
			.join(
				enter => {
					enter
						.append("line")
						.attr("class", "line coolLine")
						.attr("x1", function(d) { return d.min > 0 ? x(d.min) : null; })
						.attr("x2", function(d) { return x(d.max); })
						.attr("y1", function(d) { return y(d.effectName); })
						.attr("y2", function(d) { return y(d.effectName); })
						.attr("stroke", "#E0E0E0")
						.attr("stroke-width", "16px")
						.call(enter => enter.transition(t));
				},
				update => {
					update
						.attr("x1", function(d) { return d.min > 0 ? x(d.min) : null; })
						.attr("x2", function(d) { return x(d.max); })
						.attr("y1", function(d) { return y(d.effectName); })
						.attr("y2", function(d) { return y(d.effectName); })
						.call(update => update.transition(t));
				},
				function(exit) {
					return exit.remove();
				}
			);

		svg.selectAll("circle")
			.data(data, d => {return d.key;})
			.join(
				enter => { 
					enter
						.append("circle")
						.attr("cx", function(d) { return x(d.freq); })
						.attr("cy", function(d) { return y(d.effectName); })
						.attr("r", function(d) { return d.freq > 0 ? "8" : null })
						.style("fill", function(d) { return d.fill })
						.call(enter => enter.transition(t))
						.on("click", function(e, d) {
							setToolTipInfo({e: e, d: d});
						});
				},
				update => {
					update
						.transition(t)
						.attr("cx", function(d) { return x(d.freq); })
						.attr("cy", function(d) { return y(d.effectName); })
						.style("fill", function(d) { return d.fill })
				},
				function(exit) {
					return exit.remove();
				}
			);

		svg.selectAll(".myLabel")
			.data(minMaxs)
			.join("text")
			.attr("class", "text myLabel")
			.attr("text-anchor", "start")
			.style("font-size", "14px")
			.style("font-weight", "500")
			.attr("x", function(d) { return x(d.max) + 20 })
			.attr("y", function(d) { return y(d.effectName) +5 })
			.attr("fill", function(d) { return d.fill })
			.text(function(d) { return d.effectName });
	}

	const ToolTip = ({e, d}) => {
		return (
			<Card pos="absolute" top={(e.pageY + 5) + "px"} left={(e.pageX + 5) + "px"} alignContent='center'>
				<Flex w='100%' pl='20px' pr='20px' alignItems='center' flexDirection='column' background={'#ffffff'}>
					<Text marginBottom={'5px'}>{'Studies'}</Text>
					{[...new Set(d?.studies ? d?.studies.split(',') : [])].map(x => (
						<Text align='center'>
							<Link
								_hover={{
									cursor: 'pointer',
									textDecoration: 'underline'
								}}
								color='purple.300'
								href={'/medical/studies/' + x + '/from_link' }>
								{x}
							</Link>
						</Text>
					))}
				</Flex>
			</Card>
		);
	};

	return (
		<Box w='100%' ref={container}>
			<svg id="content" height="350" ref={vizAnchor}>
			<g id='chart-body'>
				<g id='x-axis' />
				<g id='y-axis' />
			</g>
			</svg>
			{showStudies && toolTipInfo && <ToolTip e={toolTipInfo.e} d={toolTipInfo.d}/> }
		</Box>
	)
}