"use client"

import { FormMap } from "@/app/form-hooks"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { groupsTable, insertGroupSchema } from "@/server/data/schema"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Table } from "drizzle-orm"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const newGroupFormMap: FormMap = {
  fields: [
    {
      name: "name",
      label: "Group Name",
      description: "This is the name of the group.",
      Component: Input,
    },
    {
      name: "description",
      label: "Group Description",
      description: "This is the description of the group.",
      Component: Textarea,
      componentProps: { placeholder: "GroupDescription" },
    },
    {
      name: "logoUrl",
      label: "Group Logo URL",
      description: "This is the URL of the group logo, including the prefix (for example https://)",
      Component: Input,
      componentProps: { placeholder: "https://example.com/logo.png" },
    },
    {
      name: "active",
      label: "Group Active",
      description: "This is whether the group is active.",
      Component: Checkbox,
      componentProps: {},
    },
  ],
} as const

const defaultValidationSchema = insertGroupSchema.pick({
  name: true,
  description: true,
  active: true,
})

type NewGroupFormProps = {
  tableSchema: Table
  validationSchema: any
  formMap: typeof newGroupFormMap
}
export default function NewGroupForm({
  tableSchema = groupsTable,
  validationSchema = defaultValidationSchema,
  formMap = newGroupFormMap,
}: NewGroupFormProps) {
  // const { form } = useCreateForm(tableSchema, validationSchema, formMap)

  const form = useForm<z.input<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  })

  const handleValid = (values: typeof validationSchema) => {
    alert(`valid submit: ${JSON.stringify(values)}`)
  }

  const handleInvalid = () => {
    alert("invalid submit")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValid, handleInvalid)} className="flex flex-col gap-4">
        {formMap.fields.map((formField) => {
          const { Component, componentProps, name, label, description } = formField

          const getProps = (field: ControllerRenderProps) => {
            let props = { ...componentProps }

            //	add props that require `field` for Checkbox
            if (Component === Checkbox)
              props = {
                ...componentProps,
                checked: field.value,
                onCheckedChange: field.onChange,
              }

            return { ...field, ...props }
          }

          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Component {...getProps(field)} />
                  </FormControl>
                  <FormDescription>{description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <Button type="submit">Submit</Button>
      </form>
      <DevTool control={form.control} />
    </Form>
  )
}
