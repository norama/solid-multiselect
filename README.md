# MultiSelect

This is a fork of [Solid MultiSelect](https://github.com/digichanges/solid-multiselect).

Changes:

- Included in a SolidJS application containing examples from the [Demo](https://codesandbox.io/s/solidjs-multiselect-demo-db55z?file=/src/main.tsx). MultiSelect component implementation moved to the `src/components` directory.

- In `singleSelect` mode the original selected element is restored upon blur.

- Added `searchable` property: search box with filtering if `true`, no filtering if `false`. Default: `true`. It is useful to set to `false` for simple selects with a few options only.

- `MultiSelect.css` is no longer imported, copy to your project, include and modify accordingly.

# Install

```bash
npm i @norama.matema/solid-multiselect
```

# Clone and Run

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
