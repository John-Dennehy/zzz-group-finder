"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InferredGroupValues, insertGroupZodSchema } from "@/db/schema"
import { FormActionState } from "@/utils/utility-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks";

import { Dispatch, SetStateAction } from "react"
import { Control, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import createGroupAction from "@/actions/create-group-action"
import { Button } from "../ui/button"

// used to indicate the status of the form submission. To be updated by the formAction
export const initialState: FormActionState = {
	isSuccess: null,
	message: "",
}

const formSteps = [
	{
		order: 0,
		name: "Group",
		fields: [ "name", "description", "logoUrl", "active" ],
	},
	{
		order: 1,
		name: "Opening Hours",
		fields: [ "openingHours" ],
	},
	{
		order: 2,
		name: "Location",
		fields: [ "location" ],
	},
	{
		order: 99,
		name: "Complete",
	},
]

export function CreateGroupForm({
	formAction,
	formId,
	isActive,
	setIsActive,
}: {
	formAction?: (payload: FormData) => void
	formId?: string
	isActive?: "true" | undefined
	setIsActive?: Dispatch<SetStateAction<"true" | undefined>>
}) {
	const form = useForm<InferredGroupValues>({
		resolver: zodResolver(insertGroupZodSchema),
	})
	const { execute, result } = useAction(createGroupAction);

	const { handleSubmit, control } = form

	const onValid = (data: InferredGroupValues) => {
		execute(data);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={handleSubmit(onValid)} className="space-y-8">
					<InputField
						fieldName="name"
						label="Group Name"
						placeholder="Group Name"
						// description="Group Name"
						control={control}
					/>

					<TextAreaField
						fieldName="description"
						label="Description"
						placeholder="Description of the group"
						// description="Description"
						control={control}
					/>

					<InputField
						fieldName="logoUrl"
						label="Logo URL"
						placeholder="URL for the logo	image"
						// description="Logo URL"
						control={control}
					/>

					<CheckboxField
						fieldName="active"
						label="Active"
						// description="Active"
						control={control}
					/>
					<Button type="submit">Submit</Button>
				</form>
				{result.data && <p>Group created successfully</p>}
				{result.fetchError && <p>Group creation failed: Fetch Error</p>}
				{result.serverError && <p>Group creation failed: Server Error</p>}
				{result.validationErrors && <p>Group creation failed: Validation Error</p>}
			</Form>
		</>
	)
}

type InputFieldProps = {
	control: Control<InferredGroupValues>
	fieldName: keyof InferredGroupValues
	label?: string
	placeholder?: string
	description?: string
}

function InputField({ control, placeholder, description, fieldName, label }: InputFieldProps) {
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}

						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

type TextAreaFieldProps = {
	control: Control<InferredGroupValues>
	fieldName: keyof InferredGroupValues
	label?: string
	placeholder?: string
	description?: string
}

function TextAreaField({ control, placeholder, description, fieldName, label }: TextAreaFieldProps) {
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea
							{...field}
							placeholder={placeholder}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}


type CheckboxFieldProps = {
	control: Control<InferredGroupValues>
	fieldName: keyof InferredGroupValues
	label?: string
	description?: string
}

function CheckboxField({ control, fieldName, label, description }: CheckboxFieldProps) {
	return (
		<FormField
			control={control}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Checkbox {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}