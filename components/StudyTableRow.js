import {
  Text,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from '@chakra-ui/react'


export default function StudyTableRow(props) {
  const { visibleItems, study, ...kv } = props;

  function getItemFromStudy(item) {
    switch (item) {
      case 'id':
        return study['id'];

      case 'external ids':
        return study['nct_id'];

      case 'completed date':
        return study['completion_date'];

      case 'title':
        return study['title'];

      case 'description':
        return wrapText(study['description']);

      case 'sponsor':
        return study['sponsor'];

      case 'phase':
        return convertPhase(study['phase'] || 'PHASE 1');

      case 'purpose':
        return normalCase(study['purpose']);

      case 'intervention type':
        return normalCase(study['intervention_type']);

      case 'age group':
        return 'TODO';

      case 'gender':
        return normalCase(study['gender']);

      case 'has results':
        return 'TODO';

      case 'stopped reason':
        return study['stopped_reason'];

      case 'status':
        return normalCase(study['status']);

      case 'conditions':
        return 'TODO';

      case 'treatments':
        return 'TODO';

      default:
        return 'ERROR';
    }
  }

  return (
    <Tr>
    {visibleItems.map(item => (
      <Td key={study?.id + '-' + item}>
      {getItemFromStudy(item)}
      </Td>
    ))}
    </Tr>
  );
}

function wrapText(text) {
  return (
    <Box maxW={'300px'}>
      <Text noOfLines={3} w='100%'>
        {text}
      </Text>
    </Box>
  )
}

function normalCase(str) {
  if (!str) {
    return 'n/a';
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// GPT
function convertPhase(str) {
  const underscoreCount = (str.match(/_/g) || []).length;
  if (underscoreCount === 3) {
    str = str.replace(/^(.*?)_(.*?)_(.*?)_(.*?)$/, '$1$2/$3$4');
  }

  str = str.replace(/_/g, ' ');
  
  const words = str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  
  return words.join(' ');
}