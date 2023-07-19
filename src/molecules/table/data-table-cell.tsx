import {styled, Table} from "@nextui-org/react";
import {ReactNode} from "react";

const DataCell = styled('div', {
  maxWidth: '150px',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-wrap',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 4,
})

type DataTableCellProps = {
  value: ReactNode
}

export const DataTableCell = ({value}: DataTableCellProps) =>
  <DataCell>
    {value}
  </DataCell>
