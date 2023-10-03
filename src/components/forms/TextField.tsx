"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  message?: string;
  control: ReturnType<typeof useForm>["control"];
};
export function TextField({
  control,
  name,
  label,
  placeholder,
  description,
  message,
}: TextFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
