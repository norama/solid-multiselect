import {
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
  onMount,
  Component,
  Show,
  Switch,
  Match,
  JSX,
} from 'solid-js'
import type { IOption, IStyle } from './option/Option'
import Loading from './option/Loading'
import NormalOptions from './option/NormalOptions'
import GroupByOptions from './option/GroupByOptions'
import SelectedChips from './selection/SelectedChips'
import SelectedList from './selection/SelectedList'
import SelectedItem from './selection/SelectedItem'
import Remover from './Remover'

const DownArrow = '\u2304'

const defaultProps = {
  emptyRecordMsg: 'No records found',
  options: [],
  selectedValues: [],
  showArrow: false,
  type: 'multiChips',
  style: {},
  placeholder: 'select',
  groupByDefault: 'Others',
  disabled: false,
  searchable: true,
  onSelect: () => {},
  onRemove: () => {},
  avoidHighlightFirstOption: true,
  CustomRemover: Remover,
}

export interface IMultiSelectProps {
  options: IOption[]
  disablePreSelectedValues?: boolean
  selectedValues?: IOption[]
  idKey?: string
  displayKey?: string
  selectedOptionDisplay?: 'show' | 'hide' | 'checkbox'
  selectionLimit?: number
  placeholder?: string
  groupByKey?: string
  groupByDefault?: string
  style?: IStyle
  emptyRecordMsg?: string
  onSelect?: (selectedList: IOption[], selectedItem: IOption) => void
  onRemove?: (selectedList: IOption[], removedItem: IOption) => void
  onSearch?: (value: string) => void
  type?: 'single' | 'multiChips' | 'multiList'
  caseSensitiveSearch?: boolean
  id?: string
  avoidHighlightFirstOption?: boolean
  hidePlaceholder?: boolean
  showArrow?: boolean
  disabled?: boolean
  searchable?: boolean
  loading?: boolean
  loadingMessage?: string
  CustomRemover?: () => JSX.Element
}

export const MultiSelect: Component<IMultiSelectProps> = (props: IMultiSelectProps) => {
  props = mergeProps(defaultProps, props)
  const [local] = splitProps(props, [
    'placeholder',
    'style',
    'type',
    'id',
    'hidePlaceholder',
    'disabled',
    'showArrow',
    'avoidHighlightFirstOption',
  ])
  const {
    placeholder,
    style,
    type,
    id,
    hidePlaceholder,
    disabled,
    showArrow,
    avoidHighlightFirstOption,
  } = local

  const [optionListOpen, setOptionListOpen] = createSignal(false)
  const [highlightOption, setHighlightOption] = createSignal(avoidHighlightFirstOption ? -1 : 0)
  const [inputValue, setInputValue] = createSignal('')
  const [options, setOptions] = createSignal<IOption[]>(props.options)
  const [filteredOptions, setFilteredOptions] = createSignal(props.options)
  const [unfilteredOptions, setUnfilteredOptions] = createSignal(props.options)
  const [selectedValues, setSelectedValues] = createSignal<IOption[]>([...props.selectedValues])
  const [preSelectedValues, setPreSelectedValues] = createSignal([...props.selectedValues])
  const [groupedObject, setGroupedObject] = createSignal({})

  const idKey = props.idKey ?? props.displayKey
  const displayKey = props.displayKey ?? props.idKey
  const singleSelect = type === 'single'
  const selectedOptionDisplay = props.selectedOptionDisplay ?? (singleSelect ? 'show' : 'hide')
  const CustomRemover = props.CustomRemover

  let optionTimeout: any
  let container: HTMLDivElement
  let searchBox: HTMLInputElement
  let searchWrapper: HTMLDivElement

  const isSelectedValue = (item: IOption) => {
    if (idKey) {
      return selectedValues().filter((i: IOption) => i[idKey] === item[idKey]).length > 0
    }
    return selectedValues().filter((i) => i === item).length > 0
  }

  const fadeOutSelection = (item: IOption) => {
    if (singleSelect) {
      return
    }
    if (props.selectionLimit !== selectedValues().length) {
      return false
    }
    return selectedOptionDisplay === 'hide' ? true : !isSelectedValue(item)
  }

  const isDisablePreSelectedValues = (value: IOption) => {
    if (!props.disablePreSelectedValues || !preSelectedValues().length) {
      return false
    }
    if (idKey) {
      return preSelectedValues().filter((i) => i[idKey] === value[idKey]).length > 0
    }
    return preSelectedValues().filter((i) => i === value).length > 0
  }

  const removeSelectedValuesFromOptions = (skipCheck: boolean) => {
    if (!skipCheck && props.groupByKey) {
      groupByOptions(options())
    }
    if (!selectedValues().length && !skipCheck) {
      return
    }
    if (idKey) {
      const optionList = unfilteredOptions().filter((item) => {
        return selectedValues().findIndex((v) => v[idKey] === item[idKey]) === -1 ? true : false
      })
      if (props.groupByKey) {
        groupByOptions(optionList)
      }
      setOptions(optionList)
      setFilteredOptions(optionList)
      // TODO: Fix wait
      setTimeout(() => {
        filterOptionsByInput()
      }, 0)
      return
    }
    const optionList = unfilteredOptions().filter((item) => selectedValues().indexOf(item) === -1)

    setOptions(optionList)
    setFilteredOptions(optionList)
    // TODO: Fix wait
    setTimeout(() => {
      filterOptionsByInput()
    }, 0)
  }

  const initialSetValue = () => {
    if (selectedOptionDisplay === 'hide') {
      removeSelectedValuesFromOptions(false)
    }

    if (props.groupByKey) {
      groupByOptions(options())
    }
  }

  createEffect(() => {
    if (!optionListOpen()) {
      setInputValue('')
      filterOptionsByInput('')
    }
  }, optionListOpen)

  createEffect((prevOptions) => {
    if (JSON.stringify(prevOptions) !== JSON.stringify(props.options)) {
      setOptions(props.options)
      setFilteredOptions(props.options)
      setUnfilteredOptions(props.options)
      setInputValue('')
      filterOptionsByInput('')
    }
    return props.options
  }, props.options)

  createEffect((prevSelectedValues) => {
    if (JSON.stringify(prevSelectedValues) !== JSON.stringify(props.selectedValues)) {
      setSelectedValues(Object.assign([], props.selectedValues))
      setPreSelectedValues(Object.assign([], props.selectedValues))
      setInputValue('')
      filterOptionsByInput('')
    }
  }, props.selectedValues)

  onMount(() => {
    initialSetValue()
  })

  const onSingleSelect = (item: IOption) => {
    setSelectedValues([item])
    setOptionListOpen(false)
  }

  const onRemoveSelectedItem = (item: IOption) => {
    let index = 0
    const newSelectedValues = [...selectedValues()]
    if (idKey) {
      index = newSelectedValues.findIndex((i) => i[idKey] === item[idKey])
    } else {
      index = newSelectedValues.indexOf(item)
    }
    newSelectedValues.splice(index, 1)
    props.onRemove(newSelectedValues, item)
    setSelectedValues(newSelectedValues)
    if (selectedOptionDisplay === 'hide') {
      removeSelectedValuesFromOptions(true)
    }
  }

  const onSelectItem = (item: IOption) => () => {
    if (singleSelect) {
      onSingleSelect(item)
      props.onSelect([item], item)
      setInputValue('')
    } else if (selectedOptionDisplay === 'checkbox' && isSelectedValue(item)) {
      onRemoveSelectedItem(item)
    } else if (props.selectionLimit === selectedValues().length) {
      return
    } else {
      const newValuesSelected: IOption[] = [...selectedValues(), item]
      props.onSelect(newValuesSelected, item)
      setSelectedValues(newValuesSelected)
    }

    if (selectedOptionDisplay === 'hide') {
      removeSelectedValuesFromOptions(true)
    } else {
      filterOptionsByInput()
    }
  }

  const toggleOptionList = () => {
    setOptionListOpen(!optionListOpen())
    setHighlightOption(avoidHighlightFirstOption ? -1 : 0)
  }

  const matchValues = (value: string, search: string) => {
    if (props.caseSensitiveSearch) {
      return value.indexOf(search) > -1
    }
    if (value.toLowerCase) {
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    }
    return value.toString().indexOf(search) > -1
  }

  const filterOptionsByInput = (val = inputValue()) => {
    if (!props.searchable) {
      return
    }
    let newOptions: IOption[]
    if (displayKey) {
      newOptions = filteredOptions().filter((option) => matchValues(option[displayKey], val))
    } else {
      newOptions = filteredOptions().filter((option) => matchValues(option.toString(), val))
    }
    groupByOptions(newOptions)
    setOptions(newOptions)
  }

  const groupByOptions = (options: IOption[]) => {
    const groupBy = props.groupByKey
    const groupedObject = options.reduce(function (r, a) {
      const key = a[groupBy] || props.groupByDefault
      r[key] = r[key] || []
      r[key].push(a)
      return r
    }, Object.create({}))

    setGroupedObject(groupedObject)
  }

  const onInput = (event) => {
    if (singleSelect) {
      setSelectedValues([])
    }

    const val = event.target.value
    setInputValue(val)
    setTimeout(() => {
      filterOptionsByInput(val)
    }, 0)
    if (props.onSearch) {
      props.onSearch(val)
    }
  }

  const onFocus = () => {
    if (optionListOpen()) {
      clearTimeout(optionTimeout)
    } else {
      optionTimeout = setTimeout(() => setOptionListOpen(true), 150)
    }
  }

  const onBlur = () => {
    if (singleSelect) {
      setSelectedValues([...props.selectedValues])
    }

    if (optionListOpen()) {
      optionTimeout = setTimeout(() => {
        setOptionListOpen(false)
      }, 150)
    } else {
      clearTimeout(optionTimeout)
    }
  }

  const RemoverComponent = ({ value }: { value: IOption }) => (
    <Show when={!isDisablePreSelectedValues(value)}>
      <div
        class="closeIcon"
        onClick={() => onRemoveSelectedItem(value)}
        onTouchStart={() => onRemoveSelectedItem(value)}
      >
        <CustomRemover />
      </div>
    </Show>
  )

  return (
    <div
      class="multiSelect-container multiSelectContainer"
      classList={{ disable_ms: disabled }}
      id={id || 'multiSelectContainerSolid'}
      style={style['multiSelectContainer']}
      onBlur={(e) => setOptionListOpen(false)}
      tabIndex={-1}
      ref={container}
    >
      <Show when={type === 'multiList'}>
        <div class="selectedListContainer">
          <SelectedList
            selectedValues={selectedValues}
            style={style}
            displayKey={displayKey}
            disableValue={fadeOutSelection}
            RemoverComponent={RemoverComponent}
          />
        </div>
      </Show>
      <div
        class="search-wrapper searchWrapper"
        classList={{ singleSelect }}
        ref={searchWrapper}
        style={style['searchBox']}
        onClick={(e) => toggleOptionList()}
      >
        <Switch>
          <Match when={type === 'single'}>
            <SelectedItem
              selectedValues={selectedValues}
              style={style}
              disableValue={isDisablePreSelectedValues}
              displayKey={displayKey}
            />
          </Match>
          <Match when={type === 'multiChips'}>
            <SelectedChips
              selectedValues={selectedValues}
              style={style}
              disableValue={isDisablePreSelectedValues}
              displayKey={displayKey}
              RemoverComponent={RemoverComponent}
            />
          </Match>
        </Switch>
        <Show when={props.searchable}>
          <input
            type="text"
            ref={searchBox}
            class="searchBox"
            classList={{ searchSingle: singleSelect }}
            id={`${id || 'search'}_input`}
            onInput={onInput}
            value={inputValue()}
            onFocus={onFocus}
            onBlur={(e) => {
              if (e.relatedTarget === container) {
                return
              }
              if (
                e.relatedTarget instanceof HTMLInputElement &&
                (e.relatedTarget as HTMLInputElement).classList.contains('optionCheckbox') &&
                e.relatedTarget.checked
              ) {
                return
              }
              onBlur()
            }}
            placeholder={
              (singleSelect && selectedValues().length) ||
              (hidePlaceholder && selectedValues().length)
                ? ''
                : placeholder
            }
            style={style['inputField']}
            autocomplete="off"
            disabled={disabled}
            tabIndex={1}
          />
        </Show>
        <Show when={singleSelect || showArrow}>
          <div class="icon_cancel icon_down_dir">{DownArrow}</div>
        </Show>
      </div>

      <div
        class="optionListContainer"
        style={style['optionListContainer']}
        classList={{ displayBlock: optionListOpen(), displayNone: !optionListOpen() }}
      >
        <Show when={props.loading}>
          <Loading style={props.style} loadingMessage={props.loadingMessage} />
        </Show>

        {!props.groupByKey ? (
          <NormalOptions
            options={options}
            emptyRecordMsg={props.emptyRecordMsg}
            style={props.style}
            displayKey={displayKey}
            showCheckbox={selectedOptionDisplay === 'checkbox'}
            onSelectItem={onSelectItem}
            fadeOutSelection={fadeOutSelection}
            highlightOption={highlightOption}
            isSelectedValue={isSelectedValue}
          />
        ) : (
          <GroupByOptions
            groupedObject={groupedObject}
            style={style}
            displayKey={displayKey}
            showCheckbox={selectedOptionDisplay === 'checkbox'}
            onSelectItem={onSelectItem}
            fadeOutSelection={fadeOutSelection}
            isDisablePreSelectedValues={isDisablePreSelectedValues}
            isSelectedValue={isSelectedValue}
          />
        )}
      </div>
    </div>
  )
}

export default MultiSelect
