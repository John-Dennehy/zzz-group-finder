"use client";

import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input, InputProps } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FormFields, getInputProps } from "../app/admin/getInputProps";

export type Fields = {
  name?: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  facebook?: string;
  postCode?: string;
  location?: string;
  phone?: string;
  active?: boolean;
  hours?: {
    weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
    open: string;
    close: string;
  }[];
};

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
    isRequired: true,
  },
  {
    componentType: "input",
    name: "logoUrl",
    type: "url",
    label: "Logo URL",
  },
  {
    componentType: "input",
    name: "website",
    type: "url",
    label: "Website",
  },
  {
    componentType: "input",
    name: "facebook",
    type: "url",
    label: "Facebook",
  },
  {
    componentType: "input",
    name: "postCode",
    type: "text",
    label: "Post Code",
  },
  {
    componentType: "input",
    name: "location",
    type: "text",
    label: "Location",
  },
  {
    componentType: "input",
    name: "phone",
    type: "tel",
    label: "Phone",
  },
  {
    componentType: "input",
    name: "active",
    type: "checkbox",
    label: "Active",
  },
  {
    componentType: "input",
    name: "hours",
    type: "checkbox",
    label: "Hours",
  },
];

export function NewGroupForm() {
  const { register, handleSubmit, formState, reset } = useForm<Fields>({
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

  const onValidSubmit: SubmitHandler<Fields> = (data) => {
    console.log("Success: ", data);
    alert("Success");
    reset();
  };

  const onInvalidSubmit: SubmitErrorHandler<Fields> = (data) => {
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
      <Textarea {...inputProps("location")} />
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
