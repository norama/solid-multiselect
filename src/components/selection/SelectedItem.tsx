import type { IOption, IStyle } from '../option/Option'
import { For } from 'solid-js'

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  disableValue: (IOption) => boolean
  displayKey?: string
}

const SelectedItem = ({ selectedValues, style, disableValue, displayKey }: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <span
          class="chip"
          classList={{
            singleChip: true,
            disableSelection: disableValue(value),
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
