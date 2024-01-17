export type ColumnStaticSize = number | `${number}` | `${number}%` | `${number}px`
export type ColumnDynamicSize = "auto" | `${number}fr`
export type ColumnSize = ColumnStaticSize | ColumnDynamicSize

export type FormActionState = {
  isSuccess: boolean | null
  message: string
}