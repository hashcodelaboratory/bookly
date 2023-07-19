import {Text} from "@nextui-org/react";

type ModalBodyItemProps<T> = {
  label: string,
  value: T
}

export const ModalBodyItem = <T, >({label, value}: ModalBodyItemProps<T>) =>
  <Text size={14} color="grey">
    <Text b size={14} color="secondary">{label}: </Text>{value?.toString() ?? '-'}
  </Text>
