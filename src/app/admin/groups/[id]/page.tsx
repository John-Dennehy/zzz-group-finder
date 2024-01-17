export default function GroupPage({
	params: { id },
}: {
	params: { id: string };
}) {
	return <div className="card">{id}</div>;
}