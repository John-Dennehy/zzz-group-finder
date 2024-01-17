type Props = {
	children: React.ReactNode,
}

export default async function GroupsLayout(props: Props) {
	return (
		<>
			<p>GroupsLayout</p>


			{props.children}


		</>
	)
}