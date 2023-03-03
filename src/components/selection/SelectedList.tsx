import type { IOption, IStyle } from '../option/Option'
import { Show, For, JSX } from 'solid-js'

type RemoverProps = {
  value: IOption
}

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  displayKey?: string
  disableValue: (IOption) => boolean
  RemoverComponent: (props: RemoverProps) => JSX.Element
}

const SelectedList = ({
  selectedValues,
  style,
  displayKey,
  disableValue,
  RemoverComponent,
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
                disableSelection: disableValue(value),
              }}
            >
              <RemoverComponent value={value} />
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
