import {TableColumn} from "bookly/molecules/table/types/table-column";
import {Book} from "bookly/model/book";
import {Table} from "@nextui-org/react";

export const bookColumnToTableColumn = ({key, label}: TableColumn<Book>) => {
  const align = key === 'action' ? 'end' : 'start'

  return (
    <Table.Column
      align={align}
      key={key}>
      {label}
    </Table.Column>
  )
}