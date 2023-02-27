import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Table,
  Spacer,
  Skeleton,
  TableContainer,
  Thead,
  Heading,
  Tbody,
  Link,
  Tr,
  Th,
  Flex,
  Td,
  Box,
  Text
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import FilterModal from './FilterModal';
import StudyTableRow from './StudyTableRow';
import ExpandableDeck from './ExpandableDeck';
import CheckableMenu from './CheckableMenu';
import PagesNavigator from './PagesNavigator';
import { ItemBadge } from './TreatmentCompareItem';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'


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

function ConditionsDeck(props) {
  const { children, ...kv } = props;

  return (
    <ExpandableDeck
      columnGap={2}
      rowGap={1}
      no_shown={2}
      mt={2} mb={2}>
      {children?.map(x => (
        <ItemBadge 
          key={x.id}
          color='purpleHover.100' 
          w='fit-content'
          textAlign='center'>{x.name}</ItemBadge>
      ))}
    </ExpandableDeck>
  )
}

function TreatmentsDeck(props) {
  const { children, ...kv } = props;

  return (
    <ExpandableDeck
      columnGap={2}
      rowGap={1}
      no_shown={2}
      mt={2} mb={2}>
      {children?.map(x => (
        <ItemBadge 
          key={x.id}
          color='purpleHover.600' 
          w='fit-content'
          textAlign='center'>{x.name}</ItemBadge>
      ))}
    </ExpandableDeck>
  )
}

const IdColumn = (props) => (
  <Link href={`/studies/${props.children}`}>
    {props.children}
  </Link>
)

//ids have to map to study fields
const StudyColumns = [
  {
    id: 'id',
    accessorKey: 'id',
    cell: info => <IdColumn>{info.getValue()}</IdColumn>,
    footer: props => props.column.id,
    type: 'String',
    isVisible: true
  },
  {
    id: 'external_ids',
    accessorFn: row => row.nct_id,
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'String',
    size: 200,
  },
  {
    id: 'completion_date',
    accessorFn: row => row.completion_date,
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'Date',
    size: 200,
    isVisible: true
  },
  {
    id: 'short_title',
    accessorFn: row => row.short_title,
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'String',
    isVisible: true,
    size: 600
  },
  {
    id: 'status',
    accessorFn: row => row.status,
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'Values',
    isVisible: true,
    size: 200 
  },
  {
    id: 'stopped_reason',
    accessorFn: row => row.status,
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'String',
    size: 400 
  },
  {
    id: 'conditions',
    accessorKey: 'conditions',
    cell: info => <ConditionsDeck>{info.getValue()}</ConditionsDeck>,
    footer: props => props.column.id,
    type: 'Select',
    size: 400,
    isVisible: true
  },
  {
    id: 'treatments',
    accessorKey: 'treatments',
    cell: info => <TreatmentsDeck>{info.getValue()}</TreatmentsDeck>,
    footer: props => props.column.id,
    type: 'Select',
    size: 400,
    isVisible: true
  },
  {
    id: 'description',
    accessorFn: row => row.description,
    cell: info => <Text>{info.getValue()}</Text>,
    type: 'String',
    size: 600,
    footer: props => props.column.id,
  },
  {
    id: 'sponsor',
    accessorKey: 'sponsor',
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'Select',
    size: 200,
    isVisible: true
  },
  {
    id: 'phase',
    accessorFn: row => convertPhase(row.phase || 'PHASE_1'),
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'Values',
    size: 200,
    isVisible: true
  },
  {
    id: 'purpose',
    accessorFn: row => normalCase(row.purpose),
    cell: info => info.getValue(),
    footer: props => props.column.id,
    type: 'Values',
    size: 200,
    isVisible: true
  }
]

const id2Type = (id) => ([...StudyColumns].filter(col => col.id === id)?.[0].type)

export default function StudiesTable(props) {
  const { ...kv } = props;

  const [studies, setStudies] = useState(() => []);
  const [studiesIsLoading, setStudiesIsLoading] = useState(true);

  const [noPages, setNoPages] = useState(undefined);
  const [noStudies, setNoStudies] = useState(0);

  const router = useRouter();

  const { treatments, conditions, q, gender, page } = router.query;

  useEffect(() => {
    // Mutliple calls, order is as expected but completion is not
    if (router.isReady) {
      fetchStudiesFromQuery();
    }
  }, [router.query])

  async function fetchStudiesFromQuery(hardRefresh=false) {
    setStudiesIsLoading(true);
    studyHttpClient.search(page || 1, router.query).then(data => {
      let studiesToAdd = data['studies'];
      setData(() => studiesToAdd);
      setNoStudies(data['total']);

    }).catch(error => {
      console.log(error);

    }).finally(() => {
      setStudiesIsLoading(false);
    })
  }

  function onPageClick(page) {
    router.query.page = page;
    router.push(router, undefined, { shallow: true });
  }

  const [data, setData] = useState(() => [])
  const [columns, setColumns] = useState([...StudyColumns])

  const table = useReactTable({
    data,
    columns: columns.filter(col => col.isVisible),
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  })

  function onPageClick(page) {
    router.query.page = page;
    router.push(router, undefined, { shallow: true });
  }

  return (
    <Box  {...kv}>
      <Flex 
        borderTop='1px'
        borderBottom='1px'
        borderColor='gray.200'
        alignItems='center'
        justifyContent='center'
        pt={3} pb={3} pl={5} pr={5}>
        <Heading size='md'>{noStudies + ' Trials'}</Heading>
        <Text ml={3} fontWeight='500' color='gray.600'>
          {`${[...Object.keys(router.query)].filter(x => x != 'page').length} Filters applied`}
        </Text>
        <CheckableMenu
          ml={3}
          variant='outlined'
          options={[...StudyColumns].map(x => ({...x, label: x.id}))}
          onOptionToggle={(colId) => setColumns(columns.map(
            col => (col.id == colId ? {...col, isVisible: !col.isVisible} : col)
          ))}
          rightIcon={<ChevronDownIcon />}
          selectedOptions={columns.filter(col => col.isVisible).map(x => x.id)}>
          {`${columns.filter(col => !col.isVisible).length} Columns Hidden`}
        </CheckableMenu>
        <Spacer />
        <Box w='600px'>
          <PagesNavigator
            mt={0}
            no_pages={Math.ceil(noStudies / 10)}
            page_no={parseInt(page) || 1}
            onPageClick={onPageClick}/>
        </Box>
      </Flex>

      <Box p={5} bg={'gray.100'} h='100%' position='relative'>
        <Box borderWidth='1px' bg='white' h='calc(100% - 2.5rem)'
          position='absolute'
          borderRadius='12px' overflowX='scroll' w='calc(100% - 2.5rem)'>
          <Table w={table?.getCenterTotalSize()}>
            <Thead>
            {table.getHeaderGroups()?.map(headerGroup => (
              <Tr key={headerGroup.id}>
              {headerGroup.headers?.map(header => (
                <Th
                  position='relative'
                  key={header.id}
                  w={header.getSize()}
                  colSpan={header.colSpan}>
                  <FilterModal columnId={header?.id} name={'text'} type={id2Type(header?.id)}/>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())
                  }
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    position='absolute'
                    right={0}
                    top={0}
                    height='100%'
                    width='5px'
                    cursor='col-resize'
                    background={header.column.getIsResizing() ? 'blue' : 'var(--chakra-colors-chakra-border-color)'}
                    opacity={header.column.getIsResizing() ? 1 : .5} />
                </Th>
              ))}
              </Tr>
            ))}
            </Thead>
            <Tbody h='100%' overflowY='scroll'>
            {(!studiesIsLoading) && table.getRowModel()?.rows?.map(row => (
              <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta;

                return (
                  <Td key={cell.id} pt={1} pb={1} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
              </Tr>
            ))}

            {studiesIsLoading && [... new Array(10)].map((x, i) => (
              <Tr key={i+'-skeleton'}>
              {columns?.filter(col => col.isVisible)?.map(y => (
                <Td key={y.id +'-skeleton'}>
                  <Skeleton w={y.size || 150} h={10}/>
                </Td>
              ))}
              </Tr>
            ))}
            </Tbody>
          </Table> 
        </Box>
      </Box>
    </Box>
  )
}