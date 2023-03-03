import type { IOption } from '../option/Option'
import { JSX } from 'solid-js'

export type ItemProps = {
  value: IOption
  displayKey?: string
  disabled: boolean
  style: JSX.CSSProperties
}

export type RemoverProps = {
  value: IOption
}

export type RemovableItemProps = ItemProps & {
  RemoverComponent: (props: RemoverProps) => JSX.Element
}
