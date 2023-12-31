import {Book} from "bookly/model/book";
import {Button, styled, Table} from "@nextui-org/react";
import {DataTableCell} from "bookly/molecules/table/data-table-cell";
import {Key} from "react";
import {BooklyPageModel} from "../../../cypress/e2e/bookly-page-model";

const RightAlignedButton = styled(Button, {
  float: 'right'
})

export const bookToTableRow = (onDetailClick: (book: Book) => void) =>
  // eslint-disable-next-line react/display-name
  (book: Book) => {
  const onClick = () => onDetailClick(book)

  const actionCell = <Table.Cell css={{paddingRight: 0}}>
    <RightAlignedButton
      id={BooklyPageModel.BooksTableDetailButton}
      onClick={onClick}
      flat
      color="primary"
      auto>
      Detail
    </RightAlignedButton>
  </Table.Cell>

  const dataCell = (columnKey: Key) => <Table.Cell css={{verticalAlign: 'top'}}>
    <DataTableCell id={BooklyPageModel.BookTitleInTableRow + "-" + book[columnKey as keyof typeof book].replace(" ", "-")} value={book[columnKey as keyof typeof book]}/>
  </Table.Cell>

  return (
    <Table.Row key={book.key}>
      {(columnKey) => columnKey === "action" ? actionCell :
        dataCell(columnKey)
      }
    </Table.Row>
  )
}
