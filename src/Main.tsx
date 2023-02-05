import MultiSelect from './components/MultiSelect'
import { Option } from './components/Option'
import './components/MultiSelect.css'

const groupedOptions: Option[] = [
  { key: 'yellow', value: 'amarillo', group: 'colors' },
  { key: 'pink', value: 'rosa', group: 'colors' },
  { key: 'xs', value: 'small', group: 'sizes' },
  { key: 'm', value: 'medium', group: 'sizes' },
]

const handleSingleSelect = (data) => {
  console.log('data')
  console.log(data)
}

const MultiSelectDemo = () => {
  return (
    <>
      <h3>Array String Multiselect</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white']}
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow', 'pink']}
      />
      <h3>Array Objects MultiSelect</h3>
      <MultiSelect
        options={[
          {
            id: 1,
            color: 'yellow',
          },
          {
            id: 2,
            color: 'blue',
          },
          {
            id: 3,
            color: 'pink',
          },
        ]}
        isObject
        displayValue="color"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={[
          {
            id: 3,
            color: 'pink',
          },
        ]}
      />
      <h3>Limit 2 elements, non-searchable</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white']}
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow']}
        selectionLimit={2}
        searchable={false}
      />
      <h3>Empty Record Msg and Color</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={[]}
        onSelect={console.log}
        onRemove={console.log}
        selectionLimit={2}
      />

      <h3>With disabled option selected</h3>
      <MultiSelect
        isObject
        options={groupedOptions}
        displayValue="value"
        groupBy="cat"
        disablePreSelectedValues
        selectedValues={[groupedOptions[1]]}
        showCheckbox={true}
        onSelect={console.log}
      />

      <h3>Single Select</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={['one', 'two', 'three']}
        onSelect={console.log}
        onRemove={console.log}
        singleSelect
        // selectionLimit={1}
      />
      <h3>Single Select with handler, non-searchable</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']}
        selectedValues={['two']}
        searchable={false}
        onSelect={handleSingleSelect}
        onRemove={console.log}
        singleSelect
        // selectionLimit={1}
      />
      <h3>Grouped Options</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        options={groupedOptions}
        groupBy="group"
        displayValue={'value'}
        onSelect={console.log}
        onRemove={console.log}
        showCheckbox={true}
        isObject
      />
    </>
  )
}

export default MultiSelectDemo
