"use client"

import { Button } from "@nextui-org/react"
import { useFormStatus } from "react-dom"

type SubmitButtonProps = {
  formId?: string
}

export default function SubmitButton({ formId }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      form={formId}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}
