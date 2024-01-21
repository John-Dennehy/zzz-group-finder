import { CreateGroupForm } from "@/components/forms/CreateGroupForm";

export default function NewGroupPage() {
	const formId = "create-group-form"
	return (
		<>
			<CreateGroupForm formId={formId} />
		</>
	)
}