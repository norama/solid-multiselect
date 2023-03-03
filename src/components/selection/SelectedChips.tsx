import Remover from '../Remover'
import type { IOption, IStyle } from '../option/Option'
import { Show, For } from 'solid-js'

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  isDisablePreSelectedValues: (IOption) => boolean
  onRemoveSelectedItem: (IOption) => void
  displayKey?: string
}

const SelectedChips = ({
  selectedValues,
  style,
  isDisablePreSelectedValues,
  onRemoveSelectedItem,
  displayKey,
}: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <span
          class="chip"
          classList={{
            disableSelection: isDisablePreSelectedValues(value),
          }}
          style={style['chips']}
        >
          {!displayKey ? (value || '').toString() : value[displayKey]}
          <Show when={!isDisablePreSelectedValues(value)}>
            <Remover onClick={() => onRemoveSelectedItem(value)} />
          </Show>
        </span>
      )}
    </For>
  )
}

export default SelectedChips
