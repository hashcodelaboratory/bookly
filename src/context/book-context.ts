import {Book} from "bookly/model/book";
import {createContext} from "react";

type BookContext = {
  books: Book[]
  addBook: (book: Book) => void
}

export const BookContext = createContext<BookContext | undefined>({
  books: [],
  addBook: (book: Book) => {}
})