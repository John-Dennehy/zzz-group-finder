"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
} from "@nextui-org/react";

import React from "react";

interface NewAttendeeTypeModalProps {}

const NewAttendeeTypeModal = ({}: NewAttendeeTypeModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = () => {
    alert("submitted");
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        New AttendeeType
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Group
              </ModalHeader>
              <ModalBody>
                <Input label="Name" placeholder="Name" />
                <Input label="Description" placeholder="Description" />
                <Checkbox>Active</Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewAttendeeTypeModal;
