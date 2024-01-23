"use client";
import { Input } from "@nextui-org/react";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type FieldProps = {
	label: string;
	placeholder?: string;
	description?: string;
	field: any;
};
export function Field({ label, placeholder, description, field }: FieldProps) {
	return (<FormItem>
		<FormLabel>{label}</FormLabel>
		<FormControl>
			<Input placeholder={placeholder} {...field} />
		</FormControl>
		<FormDescription>{description}</FormDescription>
		<FormMessage />
	</FormItem>);
}
