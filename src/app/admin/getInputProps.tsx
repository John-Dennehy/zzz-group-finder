import { InputProps } from "@nextui-org/react";
import { Fields } from "./NewGroupForm";
import { FormState, UseFormRegister } from "react-hook-form";

export interface FormFields extends InputProps {
  name: keyof Fields;
  componentType: "input" | "textarea";
}

export function getInputProps(
  formFields: FormFields[],
  defaultInputProps: InputProps,
  register: UseFormRegister<Fields>,
  formState: FormState<Fields>
) {
  return (fieldName: keyof Fields): InputProps => {
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
}
