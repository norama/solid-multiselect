import MultiSelect from './components/MultiSelect'
import { IOption } from './components/option/Option'
import './components/MultiSelect.css'
import { Show, createSignal } from 'solid-js'
import Collapsible from './Collapsible'

const groupedOptions: IOption[] = [
  { key: 'yellow', value: 'amarillo', group: 'colors' },
  { key: 'pink', value: 'rosa', group: 'colors' },
  { key: 'xs', value: 'small', group: 'sizes' },
  { key: 'm', value: 'medium', group: 'sizes' },
  { key: 'hide', value: 'hide', group: 'sizes' },
]

const handleSingleSelect = (data) => {
  console.log('data')
  console.log(data)
}

const MultiSelectDemo = () => {
  const [selected, setSelected] = createSignal([])

  return (
    <>
      <h3>
        Array String Multiselect, custom selected and remover components, selected items shown as
        disabled in option list
      </h3>
      <MultiSelect
        options={[
          'yellow',
          'blue',
          'pink',
          'white',
          'cyan',
          'green',
          'orange',
          'red',
          'řepa',
          'čočka',
        ]}
        type="multiList"
        onSelect={(selectedList) => {
          console.log(selectedList)
          setSelected(selectedList)
        }}
        onRemove={(selectedList) => {
          console.log(selectedList)
          setSelected(selectedList)
        }}
        selectedOptionDisplay="show"
        optionDisplay={(option) => (selected().includes(option) ? 'disable' : 'show')}
        CustomRemover={() => <div style={{ 'font-size': 'small' }}>🗑</div>}
        CustomSelectedItem={Collapsible}
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
      <h3>Array String Multiselect, leave selected option in list, disable option 'orange'</h3>
      <MultiSelect
        options={['yellow', 'blue', 'pink', 'white', 'cyan', 'green', 'orange', 'red']}
        type="multiList"
        onSelect={console.log}
        onRemove={console.log}
        selectedValues={['yellow', 'pink']}
        selectedOptionDisplay="show"
        optionDisplay={(option: string) => (option === 'orange' ? 'disable' : 'show')}
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

      <h3>With disabled option selected, custom selected item rendering</h3>
      <MultiSelect
        options={groupedOptions}
        displayKey="value"
        groupByKey="cat"
        groupByDefault="Not categorized"
        disablePreSelectedValues
        selectedValues={[groupedOptions[1]]}
        selectedOptionDisplay="checkbox"
        onSelect={console.log}
        CustomRemover={() => <div style={{ 'font-size': 'small' }}>🗑</div>}
        CustomSelectedItem={({ value, disabled, RemoverComponent }) => (
          <div
            style={{
              opacity: disabled ? 0.6 : 1,
              background: 'lightgreen',
              'border-radius': '5px',
              padding: '3px',
              margin: '0 3px',
              display: 'flex',
              'align-items': 'center',
              width: 'fit-content',
            }}
          >
            {value['value']}
            <Show when={!disabled}>
              <RemoverComponent value={value} />
            </Show>
          </div>
        )}
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
      <h3>Single Select with handler, non-searchable, custom seleted item rendering</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        emptyRecordMsg="here your empty message"
        options={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']}
        selectedValues={['two']}
        searchable={false}
        onSelect={handleSingleSelect}
        onRemove={console.log}
        type="single"
        CustomSelectedItem={({ value }) => (
          <div style={{ border: '2px solid green', padding: '5px' }}>{value as string}</div>
        )}
      />
      <h3>Grouped Options, some disabled or hidden</h3>
      <MultiSelect
        style={{ notFound: { color: 'green' } }}
        options={groupedOptions}
        groupByKey="group"
        idKey="key"
        displayKey="value"
        optionDisplay={(option) =>
          option['key'] === 'hide' ? 'hide' : option['key'] === 'xs' ? 'disable' : 'show'
        }
        onSelect={console.log}
        onRemove={console.log}
        selectedOptionDisplay="checkbox"
      />
    </>
  )
}

export default MultiSelectDemo
