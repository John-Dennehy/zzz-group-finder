"use client"

import { SelectGroup } from "@/db/schema"
import formatDate from "@/utils/format-date"
import { Button, Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import Link from "next/link"

export type GroupRowFields = Pick<SelectGroup, "name" | "active" | "id" | "description" | "createdAt" | "updatedAt">
type GroupColumns = Omit<GroupRowFields, "id">

type Column = {
  key: keyof GroupColumns | "actions"
  label: string
}

const defaultColumns: Column[] = [
  { key: "name", label: "Name" },
  { key: "active", label: "Active" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "actions", label: "Actions" },
]

type GroupTableProps = {
  items: Partial<GroupRowFields>[]
  columns?: Column[]
}

export function GroupTable({ items, columns }: GroupTableProps) {
  if (!columns) columns = defaultColumns

  if (!items) return <div>loading...</div>
  if (items.length === 0) return <div>No groups found.</div>

  return (
    <Table className="p-2">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name ?? ""}</TableCell>
            <TableCell>
              <Checkbox isSelected={item.active} />
            </TableCell>
            <TableCell>{item.createdAt ? formatDate(item.createdAt) : ""}</TableCell>
            <TableCell>{item.updatedAt ? formatDate(item.updatedAt) : ""}</TableCell>
            <TableCell className="flex flex-row gap-2">
              <Button isIconOnly size="sm" as={Link} href={`/admin/groups/${item.id}`}>
                View
              </Button>
              <Button isIconOnly size="sm">
                Edit
              </Button>
              <Button isIconOnly size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
