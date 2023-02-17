import type { IOption, IStyle } from './Option'
import { Show, For } from 'solid-js'

type Props = {
  options: () => IOption[]
  emptyRecordMsg: string
  style: IStyle
  displayKey?: string
  showCheckbox?: boolean
  singleSelect?: boolean
  onSelectItem: (Option) => () => void
  fadeOutSelection: (Option) => boolean
  highlightOption: () => number
  isSelectedValue: (Option) => boolean
}

const NormalOptions = ({
  options,
  emptyRecordMsg = 'No Options Available',
  style,
  displayKey,
  showCheckbox,
  singleSelect,
  onSelectItem,
  fadeOutSelection,
  highlightOption,
  isSelectedValue,
}: Props) => {
  return (
    <ul class="optionContainer" style={style['optionContainer']}>
      <For
        each={options()}
        fallback={
          <span style={style['notFound']} class="notFound">
            {emptyRecordMsg}
          </span>
        }
      >
        {(option, index) => (
          <li
            style={style['option']}
            class="option"
            classList={{
              disableSelection: fadeOutSelection(option),
              'highlightOption highlight': highlightOption() === index(),
            }}
            onClick={onSelectItem(option)}
          >
            <Show when={showCheckbox && !singleSelect}>
              <input type="checkbox" readOnly class="checkbox" checked={isSelectedValue(option)} />
            </Show>
            <Show when={!!displayKey} fallback={() => (option || '').toString()}>
              {option[displayKey]}
            </Show>
          </li>
        )}
      </For>
    </ul>
  )
}

export default NormalOptions
