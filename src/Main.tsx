import MultiSelect from './components/MultiSelect'
import { IOption } from './components/option/Option'
import './components/MultiSelect.css'

const groupedOptions: IOption[] = [
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
      <h3>Array String Multiselect, custom remover component</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white', 'cyan', 'green', 'orange', 'red']}
        type="multiList"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow', 'pink']}
        CustomRemover={() => <div style={{ 'font-size': 'small' }}>🗑</div>}
      />
      <h3>Array String Multiselect, checkbox</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white', 'cyan', 'green', 'orange', 'red']}
        type="multiList"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow', 'pink']}
        selectedOptionDisplay="checkbox"
      />
      <h3>Array String Multiselect, leave selected option in list</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white', 'cyan', 'green', 'orange', 'red']}
        type="multiList"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow', 'pink']}
        selectedOptionDisplay="show"
      />
      <h3>Array Objects MultiSelect, leave selected option in list</h3>
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
        idKey="id"
        displayKey="color"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={[
          {
            id: 3,
            color: 'pink',
          },
        ]}
        selectedOptionDisplay="show"
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
        options={groupedOptions}
        displayKey="value"
        groupByKey="cat"
        groupByDefault="Not categorized"
        disablePreSelectedValues
        selectedValues={[groupedOptions[1]]}
        selectedOptionDisplay="checkbox"
        onSelect={console.log}
      />
      <h3>Single Select</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={['one', 'two', 'three']}
        onSelect={console.log}
        onRemove={console.log}
        type="single"
      />
      <h3>Single Select, remove selected item from list</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={['one', 'two', 'three']}
        onSelect={console.log}
        onRemove={console.log}
        type="single"
        selectedOptionDisplay="hide"
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
        type="single"
        // selectionLimit={1}
      />
      <h3>Grouped Options</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        options={groupedOptions}
        groupByKey="group"
        idKey="key"
        displayKey="value"
        onSelect={console.log}
        onRemove={console.log}
        selectedOptionDisplay="checkbox"
      />
    </>
  )
}

export default MultiSelectDemo
