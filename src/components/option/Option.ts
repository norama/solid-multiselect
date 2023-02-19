import { JSX } from 'solid-js'

export type IOption = Record<string, string | number | boolean | unknown> | string | number

export type IStyle = {
  multiSelectContainer?: JSX.CSSProperties
  optionListContainer?: JSX.CSSProperties
  selectedListContainer?: JSX.CSSProperties
  optionContainer?: JSX.CSSProperties
  option?: JSX.CSSProperties
  notFound?: JSX.CSSProperties
  loadingMessage?: JSX.CSSProperties
}
