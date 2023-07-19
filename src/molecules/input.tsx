import {Input as NextUIInput} from "@nextui-org/react";
import {Bindable} from "bookly/types/bindable";
import {Testable} from "bookly/types/testable";

type Variant = "primary" | "error" | "success"

type InputProps = Bindable & Testable & {
  status: Variant;
  label: string;
  placeholder: string;
  color?: Variant
  helperColor?: Variant
  helperText?: string;
}

export const Input = ({id, bindings, status, label, placeholder, color, helperText, helperColor}: InputProps) =>
  <NextUIInput
    id={id}
    {...bindings}
    animated={false}
    status={status}
    label={label}
    color={color}
    placeholder={placeholder}
    helperText={helperText}
    helperColor={helperColor}
    clearable
    fullWidth
  />