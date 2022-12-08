import {
	Table,
	TableContainer,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box
} from '@chakra-ui/react'


export default function OutcomeTable(props) {
	const { outcomes, ...kv } = props;

	const grouped = () => (outcomes?.[0]?.title !== 'NA');
	const dispersed = () => (outcomes?.[0]?.dispersion != null);

	return (
		<Box {...kv}>
		<TableContainer>
			<Table variant='simple'>
		    <Thead>
		      <Tr>
		        <Th isNumeric>{"Value"}</Th>
		        {dispersed() && <Th isNumeric>{"Dispersion"}</Th>}
		        {grouped() && <Th>{"Title"}</Th>}
		      </Tr>
		    </Thead>
        <Tbody>
        {outcomes?.map(outcome => (
		      <Tr key={outcome.id} bg={outcome.fill + '60'}>
		        <Td isNumeric>{outcome.value}</Td>
		        {dispersed() && <Td isNumeric>{outcome.dispersion}</Td>}
		        {grouped() && <Td>{outcome.title}</Td>}
		      </Tr>
      	))}
		    </Tbody>
			</Table>
		</TableContainer>
		</Box>
	);
}