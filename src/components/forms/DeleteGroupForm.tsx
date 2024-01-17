"use client"

import { deleteGroupAction } from "@/app/admin/groups/actions/deleteGroupAction"
import { Group } from "@/services/groups"
import { FormActionState } from "@/utils/utility-types"
import { Button, Tooltip } from "@nextui-org/react"
import { useFormState, useFormStatus } from "react-dom"
import { DeleteIcon } from "../svg/DeleteIcon"

const initialState: FormActionState = {
	isSuccess: null,
	message: "",
}

type DeleteGroupFormProps = {
	group: Group
}

export function DeleteGroupForm({ group }: DeleteGroupFormProps) {
	const [ state, formAction ] = useFormState(deleteGroupAction, initialState)

	const handleDelete = (formData: FormData) => {
		const message = `Are you sure you want to delete ${group.name}?`
		const confirmed = confirm(message)
		if (!confirmed) return

		formAction(formData)
	}

	return (
		<>
			<Tooltip color="danger" content="Delete Group" closeDelay={0}>
				<form action={handleDelete}>
					<input type="hidden" name="id" value={group.id} />
					<DeleteButton />
				</form>
			</Tooltip>
		</>
	)
}

function DeleteButton() {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" aria-disabled={pending} isIconOnly size="md" color="danger">
			<DeleteIcon />
		</Button>
	)
}
