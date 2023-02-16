import type { IOption, IStyle } from './option/Option'
import { Show, For } from 'solid-js'

type Props = {
  singleSelect?: boolean
  selectedValues: () => IOption[]
  style: IStyle
  isDisablePreSelectedValues: (IOption) => boolean
  onRemoveSelectedItem: (IOption) => void
  displayValue?: string
  isObject?: boolean
  customCloseIcon?: Element | string
  closeIconType: () => string
}

const SelectedList = ({
  singleSelect,
  selectedValues,
  style,
  isDisablePreSelectedValues,
  onRemoveSelectedItem,
  displayValue,
  isObject,
  customCloseIcon,
  closeIconType,
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
          {!isObject ? (value || '').toString() : value[displayValue]}
          <Show when={!isDisablePreSelectedValues(value)}>
            <Show
              when={!customCloseIcon}
              fallback={() => (
                <i class="custom-close" onClick={() => onRemoveSelectedItem(value)}>
                  {customCloseIcon}
                </i>
              )}
            >
              <img
                class="icon_cancel closeIcon"
                src={closeIconType()}
                onClick={() => onRemoveSelectedItem(value)}
              />
            </Show>
          </Show>
        </span>
      )}
    </For>
  )
}

export default SelectedList
