"use client"

import { Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

import * as z from "zod"

const formSchema = z.object({
	username: z.string().min(2).max(50),
})

export default function NewGroupForm() {
	const form = useForm<z.infer<typeof formSchema>>()
	return (
		<FormField
			control={form.control}
			name="username"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input placeholder="shadcn" {...field} />
					</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

