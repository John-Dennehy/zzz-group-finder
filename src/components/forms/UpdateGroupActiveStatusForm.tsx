"use client";
import { Checkbox } from "@nextui-org/react";
import { ChangeEvent, useOptimistic } from "react";
import { Group } from "@/server/queries/groups";
import { FormActionState } from "@/utils/utility-types";
import { updateGroupAction } from "@/server/actions/updateGroupAction";
import { useFormState, useFormStatus } from "react-dom";


const initialState: FormActionState = {
	isSuccess: null,
	message: "",
}


type Props = {
	group: Group;
};

export function UpdateGroupActiveStatusForm({ group }: Props) {
	const [ state, formAction ] = useFormState(updateGroupAction, initialState)
	const { pending } = useFormStatus();

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		// event.preventDefault()
		event.currentTarget.form?.requestSubmit()
	}


	const handleSetStatus = (formData: FormData) => {
		const message = `Are you sure you want to set ${group.name} to ${!group.active ? "active" : "inactive"}?`

		// if clicked toggle current state and update server
		const confirmed = confirm(message)
		if (!confirmed) return;

		formAction(formData)

	};

	return (
		<>
			<form action={handleSetStatus}>
				<input type="hidden" name="id" value={group.id} />
				<input type="hidden" name="active" value={`${!group.active}`} />
				<Checkbox isSelected={group.active} type="submit" aria-disabled={pending} isDisabled={pending} onChange={handleCheckboxChange} />
			</form>
		</>
	);
}
