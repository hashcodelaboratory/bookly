import {Button, styled, Table} from "@nextui-org/react";
import {Book} from "bookly/model/book";
import {columns} from "bookly/components/books-table/columns";
import {DataTableCell} from "bookly/molecules/table/data-table-cell";

type TableColumnKey<T> = "action" | keyof T

type TableColumn<T> = {
  label: string
  key: TableColumnKey<T>
}

type BooksTableProps = {
  books: Book[]
  onDetailPress: (book: Book) => void
}

// eslint-disable-next-line react/display-name
const bookToTableRow = (onDetailPress: (book: Book) => void) => (book: Book) => {
  const onPress = () => onDetailPress(book)

  return (
    <Table.Row key={book.key}>
      {(columnKey) => columnKey === "action" ?
        <Table.Cell css={{paddingRight: 0}}>
          <Button
            css={{float: 'right'}}
            onPress={onPress}
            flat
            color="primary"
            auto>
            Detail
          </Button>
        </Table.Cell> :
        <Table.Cell css={{ verticalAlign: 'top' }}>
          <DataTableCell value={book[columnKey as keyof typeof book]}/>
        </Table.Cell>
      }
    </Table.Row>
  )
}

const bookTableColumnToTableColumn = ({key, label}: TableColumn<Book>) => {
  const align = key === 'action' ? 'end' : 'start'

  return (
    <Table.Column
      allowsSorting
      align={align}
      key={key}>
      {label}
    </Table.Column>
  )
}

export const BooksTable = ({books, onDetailPress}: BooksTableProps) => {

  return <Table
    shadow={false}
    css={{
      padding: "0",
      height: "auto",
      minWidth: "100%"
    }}
    color="primary"
    // @ts-ignore prevent table border
    borderWeight={0}
  >
    <Table.Header columns={columns}>
      {bookTableColumnToTableColumn}
    </Table.Header>
    <Table.Body items={books}>
      {bookToTableRow(onDetailPress)}
    </Table.Body>
    <Table.Pagination
      css={{display: books.length > 0 ? undefined : 'none'}}
      rounded
      align="center"
      rowsPerPage={8}
    />
  </Table>
}