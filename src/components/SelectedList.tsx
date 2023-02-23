import type { IOption, IStyle } from './option/Option'
import { Show, For } from 'solid-js'

const X = '\u2573'

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
                <div class="icon_cancel closeIcon" onMouseDown={() => onRemoveSelectedItem(value)}>
                  {X}
                </div>
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
