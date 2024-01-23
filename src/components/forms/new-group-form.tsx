"use client"

import { useCreateForm } from "@/app/form-hooks"
import { Form } from "@/components/ui/form"
import { groupsTable, insertGroupSchema } from "@/server/data/schema"
import { Table } from "drizzle-orm"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"

const newGroupFormMap = {
	fields: {
		name: {
			placeholder: "Group Name",
			type: "text",
			label: "Group Name",
			description: "This is the name of the group.",
			Component: Input,
		},
		description: {
			type: "text",
			label: "Group Description",
			description: "This is the description of the group.",
			Component: Input,
		},
		active: {
			type: "checkbox",
			label: "Group Active",
			description: "This is whether the group is active.",
			Component: Checkbox,
		},
	},
} as const

const defaultValidationSchema = insertGroupSchema.pick({
	name: true,
	description: true,
	active: true,
})

type NewGroupFormProps = {
	tableSchema: Table
	validationSchema: any
	formMap: typeof newGroupFormMap
}
export default function NewGroupForm({
	tableSchema = groupsTable,
	validationSchema = defaultValidationSchema,
	formMap = newGroupFormMap,
}: NewGroupFormProps) {
	const { form, tableColumns, FormFields } = useCreateForm(tableSchema, validationSchema, formMap)

	return (
		<>
			<p>table columns</p>
			{tableColumns.map((column) => (
				<p key={column}>{column}</p>
			))}

			<hr />
			<Form {...form}>
				<FormFields />
			</Form>
		</>
	)
}
