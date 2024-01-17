"use client";
import { Checkbox } from "@nextui-org/react";
import { ChangeEvent, useOptimistic } from "react";
import { Group } from "@/services/groups";
import { FormActionState } from "@/utils/utility-types";
import { updateGroupAction } from "@/app/(auth)/admin/groups/actions/group-actions";
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
	const [ optimisticState, addOptimistic ] = useOptimistic(
		group.active,
		// updateFn
		(currentState, optimisticValue) => { return !currentState },

	);
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
				<Checkbox isSelected={optimisticState} type="submit" aria-disabled={pending} isDisabled={pending} onChange={handleCheckboxChange} />
			</form>
		</>
	);
}
