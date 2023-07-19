import {styled, Table} from "@nextui-org/react";
import {ReactNode} from "react";
import {Testable} from "bookly/types/testable";

const DataCell = styled('div', {
  maxWidth: '150px',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-wrap',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
})

type DataTableCellProps = Testable & {
  value: ReactNode
}

export const DataTableCell = ({id, value}: DataTableCellProps) =>
  <DataCell id={id}>
    {value}
  </DataCell>
