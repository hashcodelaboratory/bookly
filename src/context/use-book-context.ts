import {useContext} from "react";
import {BookContext} from "bookly/context/book-context";

const MISSING_PROVIDER_ERROR_MESSAGE = "Missing provider for BookContext"

export const useBookContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(MISSING_PROVIDER_ERROR_MESSAGE)
  }

  return context
}