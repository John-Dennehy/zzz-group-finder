import { allGroups } from "@/db";

export default async function Home() {
	const data = await allGroups;

	return (
		<main>
			<p className="text-lg text-blue-600">Admin Page</p>
			<ul>
				{data.map((group) => (
					<li key={group.id}>
						<p>{group.name}</p>
						<p>{group.description}</p>
						<p>{group.facebook}</p>
					</li>
				))}
			</ul>
		</main>
	);
}