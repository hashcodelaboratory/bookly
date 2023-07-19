import {Button, Spacer, styled, Table, useAsyncList, useCollator} from "@nextui-org/react";
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
  onDetailClick: (book: Book) => void
}

// eslint-disable-next-line react/display-name
const bookToTableRow = (onDetailClick: (book: Book) => void) => (book: Book) => {
  const onClick = () => onDetailClick(book)

  return (
    <Table.Row key={book.key}>
      {(columnKey) => columnKey === "action" ?
        <Table.Cell css={{paddingRight: 0}}>
          <Button
            css={{float: 'right'}}
            onClick={onClick}
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
      align={align}
      key={key}>
      {label}
    </Table.Column>
  )
}

export const BooksTable = ({books, onDetailClick}: BooksTableProps) =>
  <Table
    shadow={false}
    css={{
      padding: "0",
      height: "auto",
      minWidth: "100%"
    }}
    // @ts-ignore prevent table border
    borderWeight={0}
  >
    <Table.Header columns={columns}>
      {bookTableColumnToTableColumn}
    </Table.Header>
    <Table.Body items={books}>
      {bookToTableRow(onDetailClick)}
    </Table.Body>
    <Table.Pagination
      css={{display: books.length > 0 ? undefined : 'none'}}
      rounded
      align="center"
      rowsPerPage={8}
    />
  </Table>
