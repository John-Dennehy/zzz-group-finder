"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react"
import React from "react"
import { useFormStatus } from "react-dom"

type FormModalProps = {
  formId: string
  buttonLabel: string
  modalTitle: string
  children: React.ReactNode
}

export default function FormModal({ formId, buttonLabel, modalTitle, children }: FormModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} color="primary">
        {buttonLabel}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{modalTitle}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <SubmitButton formId={formId} onClose={onClose} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

type SubmitButtonProps = {
  formId: string
  onClose?: () => void
}

export function SubmitButton({ formId, onClose }: SubmitButtonProps) {
  const { pending, } = useFormStatus()

  const handleClick = () => {
    // keep checking pending until is no longer true, then close modal
    if (pending) {
      setTimeout(() => {
        handleClick()
      }, 1000)
    } else {
      onClose?.()
    }

  }

  return (
    <Button
      form={formId}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      onClick={handleClick}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}