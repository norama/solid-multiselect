import type { IOption, IStyle } from '../option/Option'
import type { RemovableItemProps, RemoverProps } from './Selection'
import { For, JSX } from 'solid-js'

const Item = ({ value, displayKey, disabled, style, RemoverComponent }: RemovableItemProps) => (
  <span
    class="chip"
    classList={{
      disableSelection: disabled,
    }}
    style={style}
  >
    {!displayKey ? (value || '').toString() : value[displayKey]}
    <RemoverComponent value={value} />
  </span>
)

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  disableValue: (IOption) => boolean
  displayKey?: string
  RemoverComponent: (props: RemoverProps) => JSX.Element
  CustomItem?: (props: RemovableItemProps) => JSX.Element
}

const SelectedChips = ({
  selectedValues,
  style,
  disableValue,
  displayKey,
  RemoverComponent,
  CustomItem = Item,
}: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <CustomItem
          value={value}
          displayKey={displayKey}
          disabled={disableValue(value)}
          style={style['chip']}
          RemoverComponent={RemoverComponent}
        />
      )}
    </For>
  )
}

export default SelectedChips
