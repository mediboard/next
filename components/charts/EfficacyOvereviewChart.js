import { useState, useEffect, useRef } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  Flex,
  Heading,
  Divider,
  Text,
  Box,
  Progress
} from '@chakra-ui/react';
import {swap} from '../../../../utils';
import { powerScoreColorScale } from '../../../../services/ColorScaleService';
import { useHistory } from 'react-router-dom';


// Worried about performance here
function getTextWidth(text, font = "500 16px sans-serif") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
}

function WrapText(props) {
  const {width, text, x, y} = props;

  function splitText() {
    let currWidth = getTextWidth(text);
    if (currWidth === 0) { return []; }

    const widthRatio = currWidth / width;
    const words = text.split(/\s+/);
    const cutoffLength = Math.floor(words.length / widthRatio);

    const chunkedWords = words.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/cutoffLength)

      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    const textSegments = chunkedWords.map(y => y.join(' '));

    return textSegments;
  }

  function getNoLines() {
    let currWidth = getTextWidth(text);
    if (currWidth === 0) { return []; }

    const widthRatio = currWidth / width;
    return Math.ceil(widthRatio);
  }

  const padding = 20;

  return (
    <>
      <rect 
        y={-11} 
        x={-4} 
        fillOpacity={1}
        width={510} 
        height={21 * getNoLines()} 
        fill='var(--chakra-colors-purple-100)'></rect>
      <text y={y}>
      {splitText(text).map((segment, index) => (
        <tspan key={index} x={0} dy={padding}>{segment}</tspan>
      ))}
      </text>
    </>
  )
}

function trimPValue(p_value) {
  return Math.round(p_value * 100) / 100;
}

function trimText(text, threshold) {
  if (text === undefined) {
    return undefined;
  }
  if (text.length <= threshold) return text;
  return text.substr(0, threshold).concat("...");
}

function StudyTick(props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const history = useHistory();

  const { x, y, fill, payload, map } = props;
  var swappedMap = {};
  for (var key in map) {
    swappedMap[map[key].x_value] = { 
      title: map[key].title, 
      study: key 
    }
  }
  let title = swappedMap[payload.value]?.title;

  function onStudyClick(e) {
    history.push({
      pathname: `/medical/studies/${swappedMap[payload.value]?.study}`
    });
  }

  return (
    <g 
      transform={`translate(${x-20},${y})`}>
      <text
        x={0}
        cursor='pointer'
        y={5}
        onMouseOver={(e) => setShowToolTip(true)}
        onMouseLeave={(e) => setShowToolTip(false)}
        textDecoration={showToolTip ? 'underline' : 'none'}
        fill={fill}
        onClick={onStudyClick}
        width={480} 
        textAnchor={'end'}>
        {trimText(title, 65)}
      </text>
      <g class="tooltip" 
        transform="translate(-500,30)" 
        opacity="1" 
        visibility={showToolTip ? "visible" : "hidden"}>
        <WrapText width={450} text={title || ''} x={0} y={-15}/>
      </g>
    </g>
  )
}

function CustomToolTip({ active, payload, label }) {

  if (active && payload && payload.length) {
    let name = payload[0].name;
    let p_value = trimPValue(payload[0].payload?.p_value || -1);
    let measure = payload[0].payload?.measure;
    let title = payload[0].payload?.title;
    let fill = payload[0].payload?.fill;
    let opacity = '30'

    return (
      <Flex 
        bg={fill + opacity}
        flexDirection={'column'}
        borderRadius={'base'}
        p={2}>
        <Heading fontSize={'sm'} mb={2}>{`${name} : ${p_value}`}</Heading>
        <Text fontSize={'sm'}>{measure}</Text>
        <Text fontSize={'sm'} maxW={80}>{title}</Text>
      </Flex>
    );
  }

  return null;
}

// p_value
// method
// study
// title 
// measure: "Coming Soon!"
export default function EfficacyOverviewChart({isLoading, efficacyData}) {
  const [studyYValues, setStudyYValues] = useState({})

  useEffect(() => {
    if (efficacyData !== undefined && efficacyData.length > 0) {
      let study2Num = {};
      let counter = 1;
      efficacyData.forEach(analytic => {
        if (study2Num[analytic['study']] === undefined) {
          study2Num[analytic['study']] = { x_value: counter, title: analytic.title };
          counter++;
        }
      });

      setStudyYValues(study2Num);
    }
  }, [efficacyData])

	function createXValues(analyticsData) {
		return analyticsData.map(x => {x['x_value'] = studyYValues[x['study']]?.x_value; return x;});
	}

  function getHeightFromData() {
    return Object.keys(studyYValues).length * 90;
  }

  if (isLoading) {
    return (
      <Box w='100%' mt={30}>
        <Box w='100%' mb={30} alignItems='center'>
          <Text fontSize='16px'>
          {'Loading study results'}
          </Text>
        </Box>
        <Progress w='100%' isIndeterminate/>
      </Box>
    )
  }

	return (
    <ScatterChart
      width={1200}
      height={getHeightFromData()}
      margin={{
        top: 20,
        right:8,
        bottom: 20,
        left: 500,
      }}>
      <CartesianGrid 
        vertical={false}/>
      <YAxis 
        type="number"
        dataKey="x_value"
        name="Study"
        ticks={[...Array(Math.max(...Object.values(studyYValues).map(y => y.x_value), ...[0]) + 1).keys()]}
        tick={<StudyTick map={studyYValues}/>}/>
      <XAxis 
        type="number"
        dataKey="p_value"
        tickLine={false}
        tick={false}
        name="Power Score"
        label="Power Score" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomToolTip />}/>
      <Scatter name="Study" data={createXValues(efficacyData)} fill="#8884d8">
      {createXValues(efficacyData).map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.fill} />
      ))}
      </Scatter>
    </ScatterChart>
	);
}