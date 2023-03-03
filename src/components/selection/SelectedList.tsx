import type { IOption, IStyle } from '../option/Option'
import type { RemovableItemProps, RemoverProps } from './Selection'
import { Show, For, JSX } from 'solid-js'

const Item = ({ value, displayKey, disabled, style, RemoverComponent }: RemovableItemProps) => (
  <div
    style={style}
    class="option"
    classList={{
      disableSelection: disabled,
    }}
  >
    <RemoverComponent value={value} />
    <Show when={!!displayKey} fallback={() => (value || '').toString()}>
      {value[displayKey]}
    </Show>
  </div>
)

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  displayKey?: string
  disableValue: (IOption) => boolean
  RemoverComponent: (props: RemoverProps) => JSX.Element
  CustomItem?: (props: RemovableItemProps) => JSX.Element
}

const SelectedList = ({
  selectedValues,
  style,
  displayKey,
  disableValue,
  RemoverComponent,
  CustomItem = Item,
}: Props) => {
  return (
    <Show when={selectedValues().length}>
      <ul class="selectedList" style={style['selectedListContainer']}>
        <For each={selectedValues()}>
          {(value) => (
            <li>
              <CustomItem
                value={value}
                displayKey={displayKey}
                disabled={disableValue(value)}
                style={style['option']}
                RemoverComponent={RemoverComponent}
              />
            </li>
          )}
        </For>
      </ul>
    </Show>
  )
}

export default SelectedList
