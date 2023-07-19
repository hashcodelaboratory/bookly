import {Book} from "bookly/model/book";

// TODO: possible enhancement to integrate i18n to localize strings
export const columns: {key: keyof Book | "action", label: string}[] = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "action",
    label: "Action",
  },
];