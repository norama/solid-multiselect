import type { IOption, IStyle } from '../option/Option'
import { For, JSX } from 'solid-js'

type RemoverProps = {
  value: IOption
}

type Props = {
  selectedValues: () => IOption[]
  style: IStyle
  isDisablePreSelectedValues: (IOption) => boolean
  displayKey?: string
  RemoverComponent: (props: RemoverProps) => JSX.Element
}

const SelectedChips = ({
  selectedValues,
  style,
  isDisablePreSelectedValues,
  displayKey,
  RemoverComponent,
}: Props) => {
  return (
    <For each={selectedValues()}>
      {(value) => (
        <span
          class="chip"
          classList={{
            disableSelection: isDisablePreSelectedValues(value),
          }}
          style={style['chips']}
        >
          {!displayKey ? (value || '').toString() : value[displayKey]}
          <RemoverComponent value={value} />
        </span>
      )}
    </For>
  )
}

export default SelectedChips
