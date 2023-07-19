import {Button, Table} from "@nextui-org/react";

type DetailActionCellProps = {
  onPress: () => void
}

export const DetailActionCell = ({onPress}: DetailActionCellProps) =>
  <Table.Cell css={{paddingRight: 0}}>
    <Button
      css={{float: 'right'}}
      onPress={onPress}
      flat
      color="primary"
      auto>
      Detail
    </Button>
  </Table.Cell>