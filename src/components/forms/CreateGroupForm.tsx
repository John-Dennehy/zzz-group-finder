"use client"

import { createGroupAction } from "@/app/admin/groups/actions/createGroupAction"
import { FormActionState } from "@/utils/utility-types"
import { Checkbox, Input } from "@nextui-org/react"
import { useState } from "react"
import { useFormState } from "react-dom"
import FormModal from "./FormModal"
import { useForm } from "react-hook-form"

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

export function CreateGroupForm() {
	const formId = "create-group-form"
	const [ isActive, setIsActive ] = useState<"true" | undefined>()
	const [ state, formAction ] = useFormState(createGroupAction, initialState)

	return (
		<FormModal formId={formId} buttonLabel="Create New Group" modalTitle="New Group">
			<ReactHookForm />
			<HTMLForm formId={formId} isActive={isActive} setIsActive={setIsActive} formAction={formAction} />
		</FormModal>
	)
}


type Form1Props = {
	formAction: any
	formId: string
	isActive: "true" | undefined
	setIsActive: any
}
function HTMLForm({ formAction, formId, isActive, setIsActive }: Form1Props) {
	return (
		<form action={formAction} id={formId} className="flex w-full flex-col gap-4">
			<Input label="Name" name="name" />
			<Input label="Description" name="description" />
			<Input label="Logo URL" name="logoUrl" />

			<Checkbox form={formId} name="active" value={isActive} onChange={() => setIsActive("true")}>
				Active
			</Checkbox>
		</form>);
}

function ReactHookForm() {
	return (
		<div>Form 2!</div>
	);
}