import type { IOption, IStyle } from '../option/Option'
import type { ItemProps } from './Selection'
import { For, JSX } from 'solid-js'

const Item = ({ value, displayKey, disabled, style }: ItemProps) => (
  <span
    class="chip"
    classList={{
      singleChip: true,
      disableSelection: disabled,
    }}
    style={style}
  >
    {!displayKey ? (value || '').toString() : value[displayKey]}
  </span>
)

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  disableValue: (IOption) => boolean
  displayKey?: string
  CustomItem?: (props: ItemProps) => JSX.Element
}

const SelectedItem = ({
  selectedValues,
  style,
  disableValue,
  displayKey,
  CustomItem = Item,
}: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <CustomItem
          value={value}
          displayKey={displayKey}
          disabled={disableValue(value)}
          style={style['chips']}
        />
      )}
    </For>
  )
}

export default SelectedItem
