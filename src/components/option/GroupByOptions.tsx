import type { IOption, IStyle } from './Option'
import { Show, For } from 'solid-js'

type Props = {
  groupedObject: () => object
  style: IStyle
  displayKey?: string
  showCheckbox?: boolean
  optionDisplay: (IOption) => 'show' | 'hide' | 'disable'
  onSelectItem: (Option) => () => void
  disableSelection: (Option) => boolean
  isSelectedValue: (Option) => boolean
}

const GroupByOptions = ({
  groupedObject,
  style,
  displayKey,
  showCheckbox,
  optionDisplay,
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
                <Show when={optionDisplay(option) !== 'hide'}>
                  <li
                    style={style['option']}
                    class="groupChildEle option"
                    classList={{
                      disableSelection:
                        disableSelection(option) || optionDisplay(option) === 'disable',
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
                </Show>
              )}
            </For>
          </>
        )}
      </For>
    </ul>
  )
}

export default GroupByOptions
