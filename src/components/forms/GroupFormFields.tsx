"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { FormSchema } from "./GroupForm";

type GroupFormFieldsProps = {
  control: Control<FormSchema>;
};

export function GroupFormFields({ control }: GroupFormFieldsProps) {
  return formFields.map((formField) => (
    <FormField
      key={formField.name}
      control={control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input placeholder={formField.placeholder} {...field} />
          </FormControl>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage>{formField.message}</FormMessage>
        </FormItem>
      )}
    />
  ));
}

interface IFormFields extends FormSchema {
  name: string;
  fieldType: string;
  label: string;
  placeholder?: string;
  message?: string;
}

export const formFields: IFormFields[] = [
  {
    fieldType: "text",
    name: "name",
    label: "GroupName",
    placeholder: "Jolly Tots",
    description: "Enter the groups name",
  },
  {
    fieldType: "text",
    name: "address",
    label: "Address",
    placeholder: "1 High Street",
    description: "Enter the groups address",
  },
  {
    fieldType: "text",
    name: "postCode",
    label: "Post Code",
    placeholder: "AB1 2CD",
    description: "Enter the groups post code",
  },
  {
    fieldType: "text",
    name: "description",
    label: "Description",
    placeholder: "A group for parents and toddlers",
    description: "Enter the groups description",
  },
  {
    fieldType: "text",
    name: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/jollytots",
    description: "Enter the groups facebook page",
  },
  {
    fieldType: "text",
    name: "url",
    label: "Website",
    placeholder: "https://jollytots.com",
    description: "Enter the groups website",
  },
  {
    fieldType: "text",
    name: "logoUrl",
    label: "Logo",
    placeholder: "https://jollytots.com/logo.png",
    description: "Enter the groups logo",
  },
];
