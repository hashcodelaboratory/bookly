import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";
import {Input} from "bookly/molecules/input";

type SearchProps = {
  queryBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
}

export const Search = ({queryBindings}: SearchProps) => <Input
  bindings={queryBindings}
  status="primary"
  label="Search"
  placeholder="search by title, author or description content..."
/>