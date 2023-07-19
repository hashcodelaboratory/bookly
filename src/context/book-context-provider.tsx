import {FC, ReactNode, useState} from "react";
import {BookContext} from "bookly/context/book-context";
import {Book} from "bookly/model/book";

type BookContextProviderProps = {
  children: ReactNode
}

export const BookContextProvider: FC<BookContextProviderProps> = ({
  children
}) => {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => setBooks([book, ...books])

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  )
}