import {Bindable} from "bookly/types/bindable";
import {Textarea} from "@nextui-org/react";
import {Labeled} from "bookly/types/labeled";

type TextAreaProps = Bindable & Labeled & {
  maxLength: number;
}

export const TextArea = ({maxLength, label, placeholder, bindings}: TextAreaProps) =>
  <Textarea
    animated={false}
    status="primary"
    {...bindings}
    helperText={`optional ${bindings.value.length} / ${maxLength}`}
    label={label}
    placeholder={placeholder}
    fullWidth
    maxLength={maxLength}
  />
