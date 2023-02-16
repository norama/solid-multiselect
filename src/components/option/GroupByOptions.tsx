import type { IOption, IStyle } from './Option'
import { Show, For } from 'solid-js'

type Props = {
  groupedObject: () => object
  style: IStyle
  isObject?: boolean
  displayValue?: string
  showCheckbox?: boolean
  singleSelect?: boolean
  onSelectItem: (Option) => () => void
  fadeOutSelection: (Option) => boolean
  isDisablePreSelectedValues: (Option) => boolean
  isSelectedValue: (Option) => boolean
}

const GroupByOptions = ({
  groupedObject,
  style,
  isObject,
  displayValue,
  showCheckbox,
  singleSelect,
  onSelectItem,
  fadeOutSelection,
  isDisablePreSelectedValues,
  isSelectedValue,
}: Props) => {
  return (
    <ul class="optionContainer" style={style['optionContainer']}>
      <For each={Object.keys(groupedObject())}>
        {(objKey) => (
          <>
            <li class="groupHeading" style={style['groupHeading']}>
              {objKey}
            </li>
            <For each={groupedObject()[objKey]}>
              {(option: IOption) => (
                <li
                  style={style['option']}
                  class="groupChildEle option"
                  classList={{
                    disableSelection:
                      fadeOutSelection(option) || isDisablePreSelectedValues(option),
                  }}
                  onClick={onSelectItem(option)}
                >
                  <Show when={showCheckbox && !singleSelect}>
                    <input
                      type="checkbox"
                      class="checkbox"
                      readOnly
                      checked={isSelectedValue(option)}
                    />
                  </Show>
                  {isObject ? option[displayValue] : (option || '').toString()}
                </li>
              )}
            </For>
          </>
        )}
      </For>
    </ul>
  )
}

export default GroupByOptions
