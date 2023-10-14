"use client";

import {
  ChangeHandler,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input, InputProps } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type Fields = {
  name?: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  facebook?: string;
  postCode?: string;
  location?: string;
  phone?: string;
  active?: boolean;
};

const defaultFormProps = {
  defaultValues: {
    active: true,
  },
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

interface FormFields extends InputProps {
  name: keyof Fields;
  componentType: "input" | "textarea";
}

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
];

type FormFieldKeys = keyof Fields;

export function NewGroupForm() {
  const { register, handleSubmit, formState, reset } =
    useForm<Fields>(defaultFormProps);

  const inputProps = (fieldName: FormFieldKeys): InputProps => {
    const fieldProps = formFields.find((field) => field.name === fieldName)!;
    return {
      ...defaultInputProps,
      ...register(fieldName, {
        required: fieldProps.isRequired ? `${fieldName} is required` : false,
      }),
      isInvalid: formState.errors[fieldName] ? true : false,
      errorMessage: formState.errors[fieldName]?.message,
      // ...fieldProps,
      name: fieldName,
      label: fieldProps.label || fieldName,
      type: fieldProps.type || "text",
      placeholder: fieldProps.placeholder,

      classNames: {
        ...defaultInputProps.classNames,
        ...fieldProps.classNames,
        label: fieldProps.isRequired
          ? "after:content-['_*'] after:text-red-500"
          : null,
      },
    };
  };
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
      <Input {...inputProps("name")} />
      <Textarea {...inputProps("description")} />
      <Input {...inputProps("logoUrl")} />

      <Divider />
      <h2>Contact Details</h2>
      {/* <Input
        {...register("website")}
        {...inputProps}
        type="url"
        label="Website"
      />
      <Input
        {...register("facebook")}
        {...inputProps}
        type="url"
        label="Facebook"
      />
      <Input
        {...register("postCode")}
        {...inputProps}
        type="text"
        label="Post Code"
      />
      <Textarea
        {...register("location")}
        {...inputProps}
        type="text"
        label="Location"
      />
      <Input {...register("phone")} {...inputProps} type="tel" label="Phone" /> */}
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
