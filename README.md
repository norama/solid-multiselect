# MultiSelect

This is a fork of [Solid MultiSelect](https://github.com/digichanges/solid-multiselect).

The original [Demo](https://codesandbox.io/s/solidjs-multiselect-demo-db55z?file=/src/main.tsx)
is deployed [HERE](https://solid-multiselect.vercel.app/).

Changes:

- MultiSelect component is included in a SolidJS application containing examples from the
  [Demo](https://codesandbox.io/s/solidjs-multiselect-demo-db55z?file=/src/main.tsx).
  The MultiSelect component source is moved to the `src/components` directory.

- Major property changes, see below.

- Added `searchable` property: search box with filtering if `true`, no filtering if `false`. Default: `true`. It is useful to set to `false` for simple selects with a few options only.

- `MultiSelect.css` is no longer imported, copy to your project, include and modify accordingly.

# Properties

- `type`: selector type:
  - `single`: single select
  - `multiChips`: multi select with chip display in selector (default)
  - `multiList`: multi select with list display above selector
- `options`: option array of strings, numbers or records
- `selectedValues`: array of selected options
- `idKey`: key of `id` field (unique ID for comparison) in case of record options
- `displayKey`: key of field to display in case of record in case of record options (default: same as `idKey`)
- `selectedOptionDisplay`: selected option display:
  - `show`: leave selected option in list and enable multiple selection of same item
    (default for `type = 'single'`: leave item in list but no multiple selection)
  - `hide`: remove selected options from list
    (default for `type = 'multiChips'` and `type = 'multiList'`)
  - `checkbox`: chow checkbox which toggles selected state
- `optionDisplay`: `(IOption) => 'show' | 'hide' | 'disabled'` determines whether the option is to be
  shown / hidden / shown as disabled (default: `'show'` for all)
- `selectionLimit`: max number of selected items
- `searchable`: `true` for quick search input in selector
- `caseSensitiveSearch`: `true` for case sensitive quick search
- `disabled`: `true` if disabled
- `id`: widget `id`
- `showArrow`: show down arrow
- `groupByKey`: key of field for grouping options in case of record options,
  the key is also used for group title
- `groupByDefault`: group if group-by-key is missing (default: 'Others')
- `onSelect`: `(selectedList: IOption[], selectedItem: IOption) => void` select callback
- `onRemove`: `(selectedList: IOption[], removedItem: IOption) => void` remove callback
- `onSearch`: `(value: string) => void` search
- `placeholder`: placeholder in search input (default: 'select')
- `emptyRecordMsg`: no record matching search string message (default: 'No records found')
- `loading`: `true` if loading state
- `loadingMessage`: message shown in loading state (default: 'loading...')
- `style`: custom styles grouped by components:

```typescript
{
  multiSelectContainer?: JSX.CSSProperties
  optionListContainer?: JSX.CSSProperties
  selectedListContainer?: JSX.CSSProperties
  optionContainer?: JSX.CSSProperties
  option?: JSX.CSSProperties
  inputField?: JSX.CSSProperties
  notFound?: JSX.CSSProperties
  loadingMessage?: JSX.CSSProperties
}
```

- `CustomRemover`: `() => JSX.Element` remover component which removes item from selection upon click (default: `X` sign, relevant only if `type` is not `single`)
- `CustomSelectedItem`: `(props: RemovableItemProps) => JSX.Element` selected item renderer where `RemovableItemProps` is

```typescript
{
  value: IOption
  displayKey?: string
  disabled: boolean
  style: JSX.CSSProperties
  RemoverComponent: ({ value }: {value: IOption}) => JSX.Element
}
```

`RemoverComponent` will be a wrapper around the possiby custom remover component, just render with the value, e.g.:

```typescript
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
```

# Install as npm package

```bash
npm i '@norama.matema/solid-multiselect'
```

# Clone and Run project

## Git clone

```bash
git clone https://github.com/norama/solid-multiselect.git .
```

## Install dependencies

```bash
$ npm install # or pnpm install or yarn install
```

## Build and publish npm package

### `npm run npmbuild`

Creates the compiled component files in the `npmdist` directory.

### `npm publish`

Publishes the component, also runs the above npm build script before.
Do not forget to increase the version in `package.json`.

## Solid-JS application with MultiSelect examples

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
