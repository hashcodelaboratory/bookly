import {Book} from "bookly/model/book";
import {ModalBodyItem} from "bookly/molecules/modal/modal-body-item";
import {Spacer} from "@nextui-org/react";

type BookModalBodyProps = {
  book: Book
}

export const BookModalBody = ({ book: { author, description }}: BookModalBodyProps) => <>
  <ModalBodyItem label="Description" value={description}/>
  <Spacer y={0.2}/>
  <ModalBodyItem label="Author" value={author}/>
</>