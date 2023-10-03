import Link from 'next/link'
import { Button } from '@nextui-org/button'; 

export default function NotFound() {
	return (
		<div>
			<h2>Page Not Found</h2>
			<Button>
				<Link href="/">Return Home</Link>
			</Button>
		</div>
	)
}