import {Input as NextUIInput} from "@nextui-org/react";
import {BindingsChangeTarget} from "@nextui-org/react/types/use-input/use-input";

type Variant = "primary" | "error" | "success"

type InputProps = {
  bindings: {
    value: string;
    onChange: (event: BindingsChangeTarget) => void;
  }
  status: Variant;
  label: string;
  placeholder: string;
  color?: Variant
  helperColor?: Variant
  helperText?: string;
}

export const Input = ({bindings, status, label, placeholder, color, helperText, helperColor}: InputProps) => <NextUIInput
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