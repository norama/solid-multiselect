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
    <ul class="optionContainer" style={style['optionContainer']}>
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
              <span class="icon_cancel closeIcon" onClick={() => onRemoveSelectedItem(value)}>
                {X}
              </span>
            </Show>
            <Show when={!!displayKey} fallback={() => (value || '').toString()}>
              {value[displayKey]}
            </Show>
          </li>
        )}
      </For>
    </ul>
  )
}

export default SelectedList
