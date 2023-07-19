import {useState} from "react";
import {Book} from "bookly/model/book";

export const useBookDetail = () => {
  const [isBookDetailVisible, setIsBookDetailVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const openBookDetailModal = () => setIsBookDetailVisible(true);
  const closeDetail = () => setIsBookDetailVisible(false);

  const openDetail = (book: Book) => {
    openBookDetailModal()
    setSelectedBook(book)
  }

  return {
    isBookDetailVisible,
    selectedBook,
    closeDetail,
    openDetail
  }
}