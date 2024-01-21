"use client"

import { SelectGroup } from "@/data/schema"
import formatDate from "@/utils/format-date"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import type { ColumnSize } from "@/utils/utility-types"
import React from "react"
import Link from "next/link"
import { EyeIcon } from "./svg/EyeIcon"
import { EditIcon } from "./svg/EditIcon"
import { Group } from "@/server/groups"
import { DeleteGroupForm } from "./forms/DeleteGroupForm"
import { UpdateGroupActiveStatusForm } from "./forms/UpdateGroupActiveStatusForm"

export type GroupRowFields = Pick<SelectGroup, "name" | "active" | "id" | "description" | "createdAt" | "updatedAt">
// type GroupColumns = Omit<GroupRowFields, "id">
type GroupColumns = GroupRowFields

type Column = {
  key: keyof GroupColumns | "actions"
  label: string
  width?: ColumnSize
}

const defaultColumns: Column[] = [
  { key: "name", label: "Name" },
  { key: "id", label: "ID" },
  { key: "active", label: "Active" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "actions", label: "Actions", width: '100px' },
]

type GroupTableProps = {
  groups: Group[]
  columns?: Column[]
  onEdit?: (item: Group) => void
  onDelete?: (item: Group) => void
  onSetStatus?: (item: Group) => void
}



export function GroupTable({ groups: items, columns, onEdit, onDelete, onSetStatus }: GroupTableProps) {
  if (!columns) columns = defaultColumns

  if (!items) return <div>loading...</div>
  if (items.length === 0) return <div>No groups found.</div>

  const handleEdit = (item: Group) => {
    // implement edit if callback is provided
    if (onEdit) return onEdit(item)

    alert("edit")
  }



  const getWidth = (column: Column) => {
    if (column.width) return column.width
    return "auto"
  }

  // sort items by updatedAt in ascending order, with undefined values first
  items.sort((a, b) => {
    if (a.updatedAt === undefined) return 0
    if (b.updatedAt === undefined) return 0
    if (a.updatedAt < b.updatedAt) return 1
    if (a.updatedAt > b.updatedAt) return -1
    return 0
  })


  return (
    <Table className="p-2">
      <TableHeader columns={columns}>
        {(column) =>
          <TableColumn
            key={column.key}
            align="center"
            /** @ts-ignore */
            width={getWidth(column)}>
            {column.label}
          </TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name ?? ""}</TableCell>
            <TableCell>{item.id ?? ""}</TableCell>
            <TableCell>
              <UpdateGroupActiveStatusForm group={item} />

            </TableCell>
            <TableCell>{item.createdAt ? formatDate(item.createdAt) : ""}</TableCell>
            <TableCell>{item.updatedAt ? formatDate(item.updatedAt) : ""}</TableCell>
            <TableCell className="flex flex-row gap-1 justify-end">

              <Tooltip color="primary" content="View Group" closeDelay={0}>
                <Button isIconOnly size="md" as={Link} href={`/admin/groups/${item.id}`}>
                  <EyeIcon />
                </Button>
              </Tooltip>

              <Tooltip color="primary" content="Edit Group" closeDelay={0}>
                <Button isIconOnly size="md" onClick={
                  () => handleEdit(item)
                }>
                  <EditIcon />
                </Button>
              </Tooltip>

              <DeleteGroupForm group={item} />

            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}


