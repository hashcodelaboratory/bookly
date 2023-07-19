import {Input} from "@nextui-org/react";
import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";

type SearchProps = {
  queryBindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
}

export const Search = ({queryBindings}: SearchProps) => {
  return <Input
    {...queryBindings}
    animated={false}
    status="primary"
    label="Search"
    placeholder="search by title, author or description content..."
    clearable
    fullWidth
  />
}