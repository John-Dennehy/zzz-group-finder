"use client"

import { createGroupFormAction } from "@/server/actions/createGroupAction"
import { useState } from "react"
import { useFormState } from "react-dom"
import { CreateGroupForm, initialState } from "./CreateGroupForm"
import FormModal from "./FormModal"

export function CreateGroupFormModal() {
	const formId = "create-group-form"
	const [ isActive, setIsActive ] = useState<"true" | undefined>()
	const [ state, formAction ] = useFormState(createGroupFormAction, initialState)

	return (
		<FormModal formId={formId} buttonLabel="Create New Group" modalTitle="New Group">
			<CreateGroupForm formId={formId} isActive={isActive} setIsActive={setIsActive} formAction={formAction} />
			{/* <HTMLForm formId={formId} isActive={isActive} setIsActive={setIsActive} formAction={formAction} /> */}
		</FormModal>
	)
}
