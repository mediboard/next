import Measure from './Measure';


export default function MeasureOverview(props) {
	const { groups, measure, ...kv } = props

	return (
		<Measure measureData={measure} 
			groupData={groups?.filter(group => measure?.outcomes?.map(out => out.group)?.includes(group.id))} />
	)
}