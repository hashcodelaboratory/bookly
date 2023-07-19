import {TableColumnKey} from "bookly/molecules/table/types/table-column-key";

export type TableColumn<T> = {
  label: string
  key: TableColumnKey<T>
}