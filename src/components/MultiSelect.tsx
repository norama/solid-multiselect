import {
  createEffect,
  createSignal,
  mergeProps,
  splitProps,
  onMount,
  Component,
  Show,
} from 'solid-js'
import type { IOption, IStyle } from './option/Option'
import Loading from './option/Loading'
import NormalOptions from './option/NormalOptions'
import GroupByOptions from './option/GroupByOptions'
import SelectedList from './SelectedList'

// const DownArrow = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png';
const DownArrow =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Angle_down_font_awesome.svg/1200px-Angle_down_font_awesome.svg.png'

const defaultProps = {
  emptyRecordMsg: 'No records found',
  options: [],
  selectedValues: [],
  showArrow: false,
  singleSelect: false,
  style: {},
  placeholder: 'select',
  groupBy: '',
  disabled: false,
  searchable: true,
  onSelect: () => {},
  onRemove: () => {},
  avoidHighlightFirstOption: true,
}

export interface IMultiSelectProps {
  options: IOption[]
  disablePreSelectedValues?: boolean
  selectedValues?: IOption[]
  idKey?: string
  displayKey?: string
  showCheckbox?: boolean
  selectionLimit?: number
  placeholder?: string
  groupBy?: string
  style?: IStyle
  emptyRecordMsg?: string
  onSelect?: (selectedList: IOption[], selectedItem: IOption) => void
  onRemove?: (selectedList: IOption[], selectedItem: IOption) => void
  onSearch?: (value: string) => void
  singleSelect?: boolean
  caseSensitiveSearch?: boolean
  id?: string
  closeOnSelect?: boolean
  avoidHighlightFirstOption?: boolean
  hidePlaceholder?: boolean
  showArrow?: boolean
  disabled?: boolean
  searchable?: boolean
  loading?: boolean
  loadingMessage?: string
}

export const MultiSelect: Component<IMultiSelectProps> = (props: IMultiSelectProps) => {
  props = mergeProps(defaultProps, props)
  const [local] = splitProps(props, [
    'placeholder',
    'style',
    'singleSelect',
    'id',
    'hidePlaceholder',
    'disabled',
    'showArrow',
    'avoidHighlightFirstOption',
  ])
  const {
    placeholder,
    style,
    singleSelect,
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

  let optionTimeout: any
  let searchBox: HTMLInputElement
  const searchWrapper = (el: HTMLDivElement) => el.addEventListener('click', listenerCallback)

  const isSelectedValue = (item: IOption) => {
    if (idKey) {
      return selectedValues().filter((i: IOption) => i[idKey] === item[idKey]).length > 0
    }
    return selectedValues().filter((i) => i === item).length > 0
  }

  const fadeOutSelection = (item: IOption) => {
    if (props.singleSelect) {
      return
    }
    if (props.selectionLimit == -1) {
      return false
    }
    if (props.selectionLimit != selectedValues().length) {
      return false
    }
    if (props.selectionLimit == selectedValues().length) {
      if (!props.showCheckbox) {
        return true
      } else {
        if (isSelectedValue(item)) {
          return false
        }
        return true
      }
    }
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
    if (!skipCheck && props.groupBy) {
      groupByOptions(options())
    }
    if (!selectedValues().length && !skipCheck) {
      return
    }
    if (idKey) {
      const optionList = unfilteredOptions().filter((item) => {
        return selectedValues().findIndex((v) => v[idKey] === item[idKey]) === -1 ? true : false
      })
      if (props.groupBy) {
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
    if (!props.showCheckbox && !props.singleSelect) {
      removeSelectedValuesFromOptions(false)
    }

    if (props.groupBy) {
      groupByOptions(options())
    }
  }

  createEffect((prevOptions) => {
    if (JSON.stringify(prevOptions) !== JSON.stringify(props.options)) {
      setOptions(props.options)
      setFilteredOptions(props.options)
      setUnfilteredOptions(props.options)
      // TODO: Fix wait
      setTimeout(() => {
        initialSetValue()
      }, 0)
    }
    return props.options
  }, props.options)

  createEffect((prevSelectedValues) => {
    if (JSON.stringify(prevSelectedValues) !== JSON.stringify(props.selectedValues)) {
      setSelectedValues(Object.assign([], props.selectedValues))
      setPreSelectedValues(Object.assign([], props.selectedValues))
      // TODO: Fix wait
      setTimeout(() => {
        initialSetValue()
      }, 0)
    }
    return props.selectedValues
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
    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true)
    }
    if (!props.closeOnSelect && searchBox) {
      searchBox.focus()
    }
  }

  const onSelectItem = (item: IOption) => () => {
    if (singleSelect) {
      onSingleSelect(item)
      props.onSelect([item], item)
      setInputValue('')
      return
    }
    if (isSelectedValue(item)) {
      onRemoveSelectedItem(item)
      return
    }
    if (props.selectionLimit == selectedValues().length) {
      return
    }

    const newValuesSelected: IOption[] = [...selectedValues(), item]

    props.onSelect(newValuesSelected, item)

    setSelectedValues(newValuesSelected)

    if (!props.showCheckbox) {
      removeSelectedValuesFromOptions(true)
    } else {
      filterOptionsByInput()
    }

    if (!props.closeOnSelect && searchBox) {
      searchBox.focus()
    }
  }

  const listenerCallback = () => {
    if (searchBox) {
      searchBox.focus()
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
    const groupBy = props.groupBy
    const groupedObject = options.reduce(function (r, a) {
      const key = a[groupBy] || 'Others'
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
    if (singleSelect) {
      setOptions(props.options)
    }
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

  const onArrowKeyNavigation = (e) => {
    if (
      e.keyCode === 8 &&
      !inputValue() &&
      !props.disablePreSelectedValues &&
      selectedValues().length
    ) {
      onRemoveSelectedItem(selectedValues().length - 1)
    }
    if (!options().length) {
      return
    }
    if (e.keyCode === 38) {
      if (highlightOption() > 0) {
        setHighlightOption((previousState) => previousState - 1)
      } else {
        setHighlightOption(options().length - 1)
      }
    } else if (e.keyCode === 40) {
      if (highlightOption() < options().length - 1) {
        setHighlightOption((previousState) => previousState + 1)
      } else {
        setHighlightOption(0)
      }
    } else if (e.key === 'Enter' && options().length && optionListOpen()) {
      if (highlightOption() === -1) {
        return
      }
      onSelectItem(options()[highlightOption()])()
    }
  }

  return (
    <div
      class="multiSelect-container multiSelectContainer"
      classList={{ disable_ms: disabled }}
      id={id || 'multiSelectContainerSolid'}
      style={style['multiSelectContainer']}
      onBlur={() => setOptionListOpen(false)}
      tabIndex={0}
    >
      <div
        class="search-wrapper searchWrapper"
        classList={{ singleSelect }}
        ref={searchWrapper}
        style={style['searchBox']}
        onClick={() => toggleOptionList()}
      >
        <SelectedList
          singleSelect={singleSelect}
          selectedValues={selectedValues}
          style={style}
          isDisablePreSelectedValues={isDisablePreSelectedValues}
          onRemoveSelectedItem={onRemoveSelectedItem}
          displayKey={displayKey}
        />
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
            onBlur={onBlur}
            placeholder={
              (singleSelect && selectedValues().length) ||
              (hidePlaceholder && selectedValues().length)
                ? ''
                : placeholder
            }
            onKeyDown={onArrowKeyNavigation}
            style={style['inputField']}
            autocomplete="off"
            disabled={disabled}
          />
        </Show>
        <Show when={singleSelect || showArrow}>
          <img class="icon_cancel icon_down_dir" src={DownArrow} />
        </Show>
      </div>
      <div
        class="optionListContainer"
        classList={{ displayBlock: optionListOpen(), displayNone: !optionListOpen() }}
      >
        {props.loading && <Loading style={props.style} loadingMessage={props.loadingMessage} />}
        {!props.groupBy ? (
          <NormalOptions
            options={options}
            emptyRecordMsg={props.emptyRecordMsg}
            style={props.style}
            displayKey={displayKey}
            showCheckbox={props.showCheckbox}
            singleSelect={props.singleSelect}
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
            showCheckbox={props.showCheckbox}
            singleSelect={props.singleSelect}
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
