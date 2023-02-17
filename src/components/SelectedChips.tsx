import type { IOption, IStyle } from './option/Option'
import { Show, For } from 'solid-js'

const X = '\u2573'

type Props = {
  singleSelect?: boolean
  selectedValues: () => IOption[]
  style: IStyle
  isDisablePreSelectedValues: (IOption) => boolean
  onRemoveSelectedItem: (IOption) => void
  displayKey?: string
}

const SelectedChips = ({
  singleSelect,
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
            singleChip: singleSelect,
            disableSelection: isDisablePreSelectedValues(value),
          }}
          style={style['chips']}
        >
          {!displayKey ? (value || '').toString() : value[displayKey]}
          <Show when={!singleSelect && !isDisablePreSelectedValues(value)}>
            <span class="icon_cancel closeIcon" onClick={() => onRemoveSelectedItem(value)}>
              {X}
            </span>
          </Show>
        </span>
      )}
    </For>
  )
}

export default SelectedChips
