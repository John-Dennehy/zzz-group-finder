"use client";

import { Input, Checkbox } from "@nextui-org/react";
import FormModal from "./FormModal";
import { useFormState } from "react-dom";
import { createGroupAction } from "@/app/(auth)/admin/groups/actions/createGroupAction";
import { FormActionState } from "@/utils/utility-types";
import { useState } from "react";


// used to indicate the status of the form submission. To be updated by the formAction 
export const initialState: FormActionState = {
	isSuccess: null,
	message: ""
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
	}
]

export function CreateGroupForm() {
	const formId = "create-group-form"
	const [ isActive, setIsActive ] = useState<"true" | undefined>()
	const [ state, formAction ] = useFormState(createGroupAction, initialState)



	return (
		<FormModal formId={formId} buttonLabel="Create New Group" modalTitle="New Group">
			<form action={formAction} id={formId} className="flex w-full flex-col gap-4">
				<Input label="Name" name="name" />
				<Input label="Description" name="description" />
				<Input label="Logo URL" name="logoUrl" />

				<Checkbox form={formId} name="active" value={isActive} onChange={
					() => setIsActive("true")
				}>Active</Checkbox>
			</form>
			{state.isSuccess && <div>success</div>}
			{state.message && <div>{state.message}</div>}

		</FormModal>);
}
