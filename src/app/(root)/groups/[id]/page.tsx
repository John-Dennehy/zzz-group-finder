import db from "@/db/connection"
import { groups } from "@/db/schema"
import formatDate from "@/utils/format-date"
import { eq } from "drizzle-orm"

export default async function GroupPage({ params }: { params: { id: string } }) {
	const data = await db.query.groups.findFirst({
		where: eq(groups.id, params.id),
	})
	if (!data) return <div>loading...</div>

	const { name, description, id, active, createdAt, deletedAt, logoUrl, updatedAt, verifiedAt } = data

	return (
		<div>
			<h1>{name}</h1>
			<p>{id}</p>
			<p>{description}</p>
			<p>{logoUrl}</p>
			<p>{active}</p>
			<p>{formatDate(createdAt)}</p>
			<p>{formatDate(updatedAt)}</p>
			<p>{formatDate(deletedAt)}</p>
			<p>{formatDate(verifiedAt)}</p>
		</div>
	)
}
