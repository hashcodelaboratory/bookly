import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";
import {Input} from "bookly/molecules/input";
import {BooklyPageModel} from "../../cypress/e2e/bookly-page-model";

type SearchProps = {
  queryBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
}

export const Search = ({queryBindings}: SearchProps) => <Input
  id={BooklyPageModel.BookSearchInput}
  bindings={queryBindings}
  status="primary"
  // TODO: possible enhancement to integrate i18n to localize strings
  label="Search"
  placeholder="search by title, author or description content..."
/>