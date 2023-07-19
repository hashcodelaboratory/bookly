import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";

export type Bindable = {
  bindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
}