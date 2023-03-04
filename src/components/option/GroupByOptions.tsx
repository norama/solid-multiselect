import type { IOption, IStyle } from './Option'
import { Show, For } from 'solid-js'

type Props = {
  groupedObject: () => object
  style: IStyle
  displayKey?: string
  showCheckbox?: boolean
  onSelectItem: (Option) => () => void
  disableSelection: (Option) => boolean
  isSelectedValue: (Option) => boolean
}

const GroupByOptions = ({
  groupedObject,
  style,
  displayKey,
  showCheckbox,
  onSelectItem,
  disableSelection,
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
                    disableSelection: disableSelection(option),
                  }}
                  onClick={onSelectItem(option)}
                >
                  <Show when={showCheckbox}>
                    <input
                      type="checkbox"
                      class="checkbox optionCheckbox"
                      readOnly
                      checked={isSelectedValue(option)}
                    />
                  </Show>
                  {!!displayKey ? option[displayKey] : (option || '').toString()}
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
