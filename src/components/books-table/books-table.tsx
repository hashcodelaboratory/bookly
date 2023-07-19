import {Table} from "@nextui-org/react";
import {Book} from "bookly/model/book";
import {columns} from "bookly/components/books-table/columns";
import {useBookContext} from "bookly/context/use-book-context";
import {FullWidthTable} from "bookly/components/books-table/full-width-table";
import {bookColumnToTableColumn} from "bookly/components/books-table/book-column-to-table-column";
import {bookToTableRow} from "bookly/components/books-table/book-to-table-row";

type BooksTableProps = {
  books: Book[]
  onDetailClick: (book: Book) => void
}

export const BooksTable = ({onDetailClick}: BooksTableProps) => {
  const {books} = useBookContext()

  return <FullWidthTable
    shadow={false}
    // @ts-ignore prevent table border
    borderWeight={0}
  >
    <Table.Header columns={columns}>
      {bookColumnToTableColumn}
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
  </FullWidthTable>
}
