"use client"

import SubmitButton from "@/components/SubmitButton"
import { InsertGroup } from "@/db/schema"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { useFormState } from "react-dom"
import { createGroupAction } from "./create-group-action"

export type FormState = InsertGroup
export const initialState: FormState = {
  name: "",
  description: "",
  logoUrl: "",
}

export default function CreateGroupForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [state, formAction] = useFormState(createGroupAction, initialState)

  return (
    <>
      <Button onPress={onOpen} color="primary">
        New Group
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalBody>
            <form id="group-form" action={formAction} className="flex w-full flex-col gap-4">
              <Input label="Name" name="name" />
              <Input label="Description" name="description" />
              <Input label="Logo URL" name="logoUrl" />
            </form>
          </ModalBody>
          <ModalFooter>
            <SubmitButton formId="group-form" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
