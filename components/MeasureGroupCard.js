import { useEffect, useState } from 'react';
import {
	Header,
	Text
} from '@chakra-ui/react';
import Tile from './Tile';
import treatmentHttpClient from '../services/clientapis/TreatmentHttpClient';
import MeasuresTreatmentWrapper from './MeasuresTreatmentWrapper';
import MeasureGroupChart from './MeasureGroupChart';


function prepMeasures4Chart(measures, treatments) {
  const data = {};
  if (!measures) { return data; } 

  treatments.forEach(treatment => {
    if (measures[treatment.name]) {
      data[treatment.name] = {
        measures: measures[treatment.name],
        treatment: treatment
      }
    }
  })

  return data;
}

export default function MeasureGroupCard(props) {
	const { group, conditionId, treatments, ...kv } = props;

  const [measures, setMeasures] = useState({});
  const [measuresIsLoading, setMeasuresIsLoading] = useState(true);

	return (
		<Tile {...kv}>
    {treatments?.map(treatment => (
      <MeasuresTreatmentWrapper 
        key={`${treatment.name}-measure-wrapper`}
        measures={measures[treatment.name]}
        setMeasures={(vals) => {
          const newMeasures = {};
          newMeasures[treatment.name] = vals;
          setMeasures((prev) => ({...prev, ...newMeasures}));
        }}
        conditionId={conditionId}
        groupName={group}
        treatmentName={treatment?.name} />
    ))}
			<Text>{group}</Text>
      <MeasureGroupChart measures={prepMeasures4Chart(measures, treatments)} />
		</Tile>
	)
}