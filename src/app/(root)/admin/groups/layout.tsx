type Props = {
	children: React.ReactNode
}

export default async function GroupsLayout(props: Props) {
	return (
		<>
			<p>/admin/groups/layout.tsx</p>
			{props.children}
		</>
	)
}
