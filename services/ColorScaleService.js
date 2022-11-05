import * as d3 from 'd3';

export const powerScoreColorScale = d3.scalePow()
	.exponent(10)
	.domain([0,8,10])
	.range(['red', 'yellow', 'green'])
