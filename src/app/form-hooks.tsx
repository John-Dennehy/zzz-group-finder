
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nextui-org/react"
import { Table, getTableColumns } from "drizzle-orm"
import { FC } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod"

type TextInput = {
  type: "text" | "email" | "password"
  label: string
  placeholder?: string
  description?: string
  Component: React.FC
}

type Checkbox = {
  type: "checkbox"
  label: string
  description?: string
  Component: React.FC
}
type InputFields = TextInput | Checkbox
type FormMap = {
  fields: {
    [ key: string ]: InputFields
  }
}

export function useCreateForm<ValidationSchema extends z.ZodTypeAny>(
  tableSchema: Table,
  validationSchema: ValidationSchema,
  formMap: FormMap,
) {

  // react-hook-form
  type NewGroupForm = z.input<typeof validationSchema>
  const form = useForm<NewGroupForm>({
    resolver: zodResolver(validationSchema),
  })

  const tableColumns = getTableColumns(tableSchema)

  const tableColumnKeys = Object?.keys(tableColumns)
  const formMapFieldKeys = Object?.keys(formMap.fields)


  // validate if every formMap field key is a valid table columns
  if (!formMapFieldKeys.every((key) => tableColumnKeys.includes(key))) {
    throw new Error("Form map fields must be valid table columns")
  }

  const formMapFields = Object?.entries(formMap.fields)

  // map over formMapFields to create a list of FormField components
  const FormFields: FC = () => (
    <>
      {formMapFields.map(([ key, fieldData ]) => (
        <FormField
          key={key}
          name={key}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldData.label}</FormLabel>
              <FormControl>
                <Input placeholder={fieldData.label} {...field} />
              </FormControl>
              <FormDescription>{fieldData.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  )


  return { form, tableColumns: tableColumnKeys, FormFields, tableSchema, validationSchema, formMap }
}
