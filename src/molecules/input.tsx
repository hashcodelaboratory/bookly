import {Input as NextUIInput} from "@nextui-org/react";
import {Bindable} from "bookly/types/bindable";

type Variant = "primary" | "error" | "success"

type InputProps = Bindable & {
  status: Variant;
  label: string;
  placeholder: string;
  color?: Variant
  helperColor?: Variant
  helperText?: string;
}

export const Input = ({bindings, status, label, placeholder, color, helperText, helperColor}: InputProps) =>
  <NextUIInput
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