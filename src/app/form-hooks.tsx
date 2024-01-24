import { Checkbox } from "@/components/ui/checkbox"
import { Input, InputProps } from "@/components/ui/input"
import { Textarea, TextareaProps } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckboxProps } from "@radix-ui/react-checkbox"
import { getTableColumns, Table } from "drizzle-orm"

import { useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"

type MappedBaseField = {
  name: string
  label: string
  description?: string
}

type MappedInput = MappedBaseField & {
  Component: typeof Input
  componentProps?: InputProps
}

type MappedTextarea = MappedBaseField & {
  Component: typeof Textarea
  componentProps?: TextareaProps
}

type MappedCheckbox = MappedBaseField & {
  Component: typeof Checkbox
  componentProps?: CheckboxProps
}

type MappedFields = MappedInput | MappedTextarea | MappedCheckbox

export type FormMap = {
  fields: MappedFields[]
}

export function useCreateForm<ValidationSchema extends z.ZodTypeAny>(
  tableSchema: Table,
  validationSchema: ValidationSchema,
  formMap: FormMap,
  useFormProps?: UseFormProps<z.input<ValidationSchema>>, // UseFormProps<z.input<ValidationSchema>> =
) {
  // react-hook-form
  type NewGroupForm = z.input<typeof validationSchema>
  const form = useForm<NewGroupForm>({
    resolver: zodResolver(validationSchema),
    ...useFormProps,
  })

  const tableColumns = getTableColumns(tableSchema)
  const tableColumnKeys = Object?.keys(tableColumns)

  // validate if every formMap field key is a valid table columns
  if (!formMap.fields.every((field) => tableColumnKeys.includes(field.name))) {
    console.error("ERRORS", { formMap }, { tableColumnKeys })
    throw new Error("Form map fields must be valid table columns")
  }

  return { form, tableColumns: tableColumnKeys, tableSchema, validationSchema, formMap }
}
