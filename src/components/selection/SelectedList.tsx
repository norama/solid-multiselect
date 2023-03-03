import Remover from '../Remover'
import type { IOption, IStyle } from '../option/Option'
import { Show, For } from 'solid-js'

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  displayKey?: string
  isDisablePreSelectedValues: (IOption) => boolean
  onRemoveSelectedItem: (Option) => void
  fadeOutSelection: (Option) => boolean
}

const SelectedList = ({
  selectedValues,
  style,
  displayKey,
  isDisablePreSelectedValues,
  onRemoveSelectedItem,
  fadeOutSelection,
}: Props) => {
  return (
    <Show when={selectedValues().length}>
      <ul class="selectedList" style={style['selectedListContainer']}>
        <For each={selectedValues()}>
          {(value) => (
            <li
              style={style['option']}
              class="option"
              classList={{
                disableSelection: fadeOutSelection(value),
              }}
            >
              <Show when={!isDisablePreSelectedValues(value)}>
                <Remover onClick={() => onRemoveSelectedItem(value)} />
              </Show>
              <Show when={!!displayKey} fallback={() => (value || '').toString()}>
                {value[displayKey]}
              </Show>
            </li>
          )}
        </For>
      </ul>
    </Show>
  )
}

export default SelectedList
