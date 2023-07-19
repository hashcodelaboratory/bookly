import {Button, Modal as NextModal, Text} from "@nextui-org/react";
import {FC, ReactNode} from "react";
import {Testable} from "bookly/types/testable";
import {BooklyPageModel} from "../../../cypress/e2e/bookly-page-model";

type ModalProps = Testable & {
  open: boolean,
  onClose: () => void,
  header: string,
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({id, open, onClose, header, children}) => {
  return <NextModal
    id={id}
    blur
    aria-labelledby="modal-title"
    open={open}
    onClose={onClose}
  >
    <NextModal.Header>
      <Text b size={24} id="modal-title" css={{
        textGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}>
        {header}
      </Text>
    </NextModal.Header>
    <NextModal.Body>
      {children}
    </NextModal.Body>
    <NextModal.Footer>
      <Button id={BooklyPageModel.BookDetailModalCancelButton} auto flat color="primary" onPress={onClose}>
        Close
      </Button>
    </NextModal.Footer>
  </NextModal>
}