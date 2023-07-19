import {Book} from "bookly/model/book";

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