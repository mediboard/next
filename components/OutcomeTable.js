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

	return (
		<Box {...kv}>
		<TableContainer>
			<Table variant='simple'>
		    <Thead>
		      <Tr>
		        <Th isNumeric>{"Value"}</Th>
		        <Th isNumeric>{"Dispersion"}</Th>
		        {grouped && <Th>{"Title"}</Th>}
		      </Tr>
		    </Thead>
        <Tbody>
        {outcomes?.map(outcome => (
		      <Tr key={outcome.id} bg={outcome.fill + '60'}>
		        <Td isNumeric>{outcome.value}</Td>
		        <Td isNumeric>{outcome.dispersion}</Td>
		        {grouped && <Td>{outcome.title}</Td>}
		      </Tr>
      	))}
		    </Tbody>
			</Table>
		</TableContainer>
		</Box>
	);
}