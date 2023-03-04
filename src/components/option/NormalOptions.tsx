import type { IOption, IStyle } from './Option'
import { Show, For } from 'solid-js'

type Props = {
  options: () => IOption[]
  emptyRecordMsg: string
  style: IStyle
  displayKey?: string
  showCheckbox?: boolean
  optionDisplay: (IOption) => 'show' | 'hide' | 'disable'
  onSelectItem: (Option) => () => void
  disableSelection: (Option) => boolean
  highlightOption: () => number
  isSelectedValue: (Option) => boolean
}

const NormalOptions = ({
  options,
  emptyRecordMsg = 'No Options Available',
  style,
  displayKey,
  showCheckbox,
  optionDisplay,
  onSelectItem,
  disableSelection,
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
          <Show when={optionDisplay(option) !== 'hide'}>
            <li
              style={style['option']}
              class="option"
              classList={{
                disableSelection: disableSelection(option) || optionDisplay(option) === 'disable',
                'highlightOption highlight': highlightOption() === index(),
              }}
              onClick={onSelectItem(option)}
            >
              <Show when={showCheckbox}>
                <input
                  type="checkbox"
                  readOnly
                  class="checkbox optionCheckbox"
                  checked={isSelectedValue(option)}
                />
              </Show>
              <Show when={!!displayKey} fallback={() => (option || '').toString()}>
                {option[displayKey]}
              </Show>
            </li>
          </Show>
        )}
      </For>
    </ul>
  )
}

export default NormalOptions
