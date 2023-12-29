"use client"

import { SelectGroup } from "@/db/schema"
import formatDate from "@/utils/format-date"
import { Button, Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import type { ColumnSize } from "@/utils/utility-types"
import React from "react"
import Link from "next/link"
import { EyeIcon } from "./svg/EyeIcon"
import { EditIcon } from "./svg/EditIcon"
import { DeleteIcon } from "./svg/DeleteIcon"

export type GroupRowFields = Pick<SelectGroup, "name" | "active" | "id" | "description" | "createdAt" | "updatedAt">
type GroupColumns = Omit<GroupRowFields, "id">


type Column = {
  key: keyof GroupColumns | "actions"
  label: string
  width?: ColumnSize
}

const defaultColumns: Column[] = [
  { key: "name", label: "Name" },
  { key: "active", label: "Active" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "actions", label: "Actions", width: '100px' },
]

type GroupTableProps = {
  items: Partial<GroupRowFields>[]
  columns?: Column[]
}

export function GroupTable({ items, columns }: GroupTableProps) {
  if (!columns) columns = defaultColumns

  if (!items) return <div>loading...</div>
  if (items.length === 0) return <div>No groups found.</div>

  const handleEdit = () => {
    alert("edit")
  }

  const handleDelete = () => {
    alert("delete")
  }

  const handleSetStatus = () => {
    alert("set status")
  }

  // @ts-ignore

  const getWidth = (column: Column) => {
    if (column.width) return column.width
    return "auto"
  }

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
            <TableCell>
              {/* <Tooltip color="primary" content="Toggle Active Status"> */}
              <Checkbox isSelected={item.active} onClick={handleSetStatus} />
              {/* </Tooltip> */}
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
                <Button isIconOnly size="md" onClick={handleEdit}>
                  <EditIcon />
                </Button>
              </Tooltip>

              <Tooltip color="danger" content="Delete Group" closeDelay={0}>
                <Button isIconOnly size="md" color="danger" onClick={handleDelete}>
                  <DeleteIcon />
                </Button>
              </Tooltip>

            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
