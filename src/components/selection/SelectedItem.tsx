import type { IOption, IStyle } from '../option/Option'
import { For } from 'solid-js'

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  isDisablePreSelectedValues: (IOption) => boolean
  displayKey?: string
}

const SelectedItem = ({ selectedValues, style, isDisablePreSelectedValues, displayKey }: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <span
          class="chip"
          classList={{
            singleChip: true,
            disableSelection: isDisablePreSelectedValues(value),
          }}
          style={style['chips']}
        >
          {!displayKey ? (value || '').toString() : value[displayKey]}
        </span>
      )}
    </For>
  )
}

export default SelectedItem
