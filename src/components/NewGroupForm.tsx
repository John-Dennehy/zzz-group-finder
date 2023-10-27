"use client";

import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input, InputProps } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FormFields, getInputProps } from "../app/admin/getInputProps";
import { GroupInsert } from "@/db/schema";
import { type } from "os";

const defaultInputProps: InputProps = {
  size: "md",
  labelPlacement: "inside",
  isClearable: true,
  fullWidth: false,
  classNames: {
    // label: "w-40 ",
    base: "min-w-[300px]",
    clearButton: "hover:text-default-900",
    mainWrapper: "flex flex-col gap-1 bg-blue-300",
    description: "text-default-400",
  },
} as const;

const formFields: FormFields[] = [
  {
    componentType: "input",
    name: "name",
    placeholder: "Provide a name for the group",
    type: "text",
    label: "Group name",
    isRequired: true,
  },
  {
    componentType: "textarea",
    name: "description",
    label: "Description",
    isRequired: false,
  },
  {
    componentType: "input",
    name: "logoUrl",
    type: "url",
    label: "Logo URL",
  },
  {
    componentType: "input",
    name: "postCode",
    type: "text",
    label: "Post Code",
    isRequired: true,
  },
  {
    componentType: "input",
    name: "address",
    type: "text",
    label: "Where",
    isRequired: true,
  },
  {
    componentType: "input",
    name: "active",
    type: "checkbox",
    label: "Active",
    isRequired: true,
  },
];

type NewGroupFormProps = {
  insertCallback: (data: GroupInsert) => void;
};

export function NewGroupForm({ insertCallback }: NewGroupFormProps) {
  const { register, handleSubmit, formState, reset } = useForm<GroupInsert>({
    defaultValues: {
      active: true,
    },
  });

  const inputProps = getInputProps(
    formFields,
    defaultInputProps,
    register,
    formState
  );
  // const handleDbInsert = async (data: GroupInsert) => {
  //   await insertGroup(data);
  // };

  const onValidSubmit: SubmitHandler<GroupInsert> = (data) => {
    insertCallback(data);
    console.log("Success: ", data);
    alert("Success");
    reset();
  };

  const onInvalidSubmit: SubmitErrorHandler<GroupInsert> = (data) => {
    console.log("error: ", data);
  };

  return (
    <form
      className="flex flex-col flex-wrap md:flex-nowrap md:mb-0 gap-4 "
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <h2>What</h2>
      <Input autoFocus {...inputProps("name")} />
      <Textarea {...inputProps("description")} />
      <Divider />
      <Input {...inputProps("logoUrl")} />
      <Divider />
      <h2>Where</h2>
      <Input {...inputProps("postCode")} />
      <Textarea {...inputProps("address")} />
      <Divider />
      <Checkbox
        {...register("active", {
          required: "This is required",
        })}
        color="primary"
        defaultSelected
      >
        Group is active
      </Checkbox>

      <Button className="w-full" color="primary" size="md" type="submit">
        Submit
      </Button>
    </form>
  );
}
