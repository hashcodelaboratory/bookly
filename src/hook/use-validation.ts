import {useMemo, useState} from "react";

export const useValidation = (value: string) => {
  const [enabled, setEnabled] = useState(false)

  const enableValidation = () => setEnabled(true)
  const disableValidation = () => setEnabled(false)

  const {color, isValid} = useMemo(() => {
    if (value && !enabled) {
      setEnabled(true)
    }

    const isValid = !!value;
    return enabled ? {
      color: isValid ? "success" as const : "error" as const,
      isValid
    } : {
      color: "primary" as const,
      isValid: false,
    };
  }, [value, enabled]);

  return {
    color,
    isValid,
    enabled,
    enableValidation,
    disableValidation
  }
}