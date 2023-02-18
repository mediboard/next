import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text
} from '@chakra-ui/react'
import StudyTableRow from './StudyTableRow';
import studyHttpClient from '../services/clientapis/StudyHttpClient';
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'


const availableItems = [
  'id',
  'external ids',
  'completed date',
  'title',
  'description',
  'sponsor',
  'phase',
  'purpose',
  'intervention type',
  'age group',
  'gender',
  'has results',
  'stopped reason',
  'status',
  'conditions',
  'treatments'
]

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

const StudyColumns = [
  {
    accessorKey: 'id',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'external ids',
    accessorFn: row => row.nct_id,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'completed date',
    accessorFn: row => row.completion_date,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'title',
    accessorFn: row => row.short_title,
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'description',
    accessorFn: row => row.description,
    cell: info => <Text>{info.getValue()}</Text>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'sponsor',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'phase',
    accessorFn: row => convertPhase(row.phase || 'PHASE_1'),
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    id: 'purpose',
    accessorFn: row => normalCase(row.purpose),
    cell: info => info.getValue(),
    footer: props => props.column.id,
  }
]

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const defaultColumns = [
  {
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
]

export default function StudiesTable(props) {
  const { ...kv } = props;

  const [studies, setStudies] = useState(() => []);
  const [noPages, setNoPages] = useState(undefined);
  const [visibleItems, setVisibleItems] = useState(availableItems);

  const router = useRouter();

  const { treatments, conditions, q, gender, page } = router.query;

  useEffect(() => {
    fetchStudiesFromQuery();
  }, [treatments, conditions, q, page])

  async function fetchStudiesFromQuery(hardRefresh=false) {
    const params = {
      'q': q,
      'conditions': conditions,
      'treatments': treatments,
      'gender': gender,
    }

    studyHttpClient.search(page || 1, params).then(data => {
      let studiesToAdd = data['studies'];

      setData(() => studiesToAdd);
      setNoPages(Math.ceil(data['total'] / 10))
    })
  }

  function onPageClick(page) {
    router.query.page = page;
    router.push(router, undefined, { shallow: true });
  }

  const [data, setData] = useState(() => [])
  const [columns] = useState(() => [...StudyColumns])

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <Table
      {...{
        style: {
          border: '1px solid lightgray',
          width: table?.getCenterTotalSize(),
        },
      }}>
      <Thead>
        {table.getHeaderGroups()?.map(headerGroup => (
          <Tr key={headerGroup.id}>
          {headerGroup.headers?.map(header => (
            <Th
              {...{
                key: header.id,
                colSpan: header.colSpan,
                style: {
                  width: header.getSize(),
                },
              }}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              <div
                {...{
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: `resizer ${
                    header.column.getIsResizing() ? 'isResizing' : ''
                  }`
                }}/>
            </Th>
          ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel()?.rows?.map(row => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;

              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table> 
  )

  // return (
  //   <TableContainer>
  //     <Table variant='simple'>
  //       <Thead>
  //         <Tr>
  //         {visibleItems.map(x => (
  //           <Th key={x+'-key'}>
  //           {x}
  //           </Th>
  //         ))}
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //       {studies.map(study => (
  //         <StudyTableRow key={study.id+'-row'} 
  //           study={study}
  //           visibleItems={visibleItems}/>
  //       ))}
  //       </Tbody>
  //     </Table>
  //   </TableContainer>
  // );
}