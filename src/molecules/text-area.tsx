import {Bindable} from "bookly/types/bindable";
import {Textarea} from "@nextui-org/react";
import {Labeled} from "bookly/types/labeled";
import {Testable} from "bookly/types/testable";

type TextAreaProps = Bindable & Labeled & Testable & {
  maxLength: number;
}

export const TextArea = ({id, maxLength, label, placeholder, bindings}: TextAreaProps) =>
  <Textarea
    id={id}
    animated={false}
    status="primary"
    {...bindings}
    helperText={`optional ${bindings.value.length} / ${maxLength}`}
    label={label}
    placeholder={placeholder}
    fullWidth
    maxLength={maxLength}
  />
