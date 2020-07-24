# blueprint-sass-compile

a handy little package to compile blueprint.scss from source

## usage

```
yarn install --dev blueprint-sass-compile
```

### `package.json`
```json
{
  "scripts": {
    "build:css": "blueprint-sass-compile <path>",
    "watch:css": "blueprint-sass-compile <path> --watch",
  }
}
```

### `_blueprint_variables.scss`
Make a file to hold all your Blueprint variable overrides. Be sure to import this first thing in your main Sass file.
```scss
@import '~@blueprintjs/core/lib/scss/variables';

$g: 4px;

//
// Blueprint public vars
//
$pt-grid-size: $g * 2;
$pt-border-radius: $g;

$pt-font-size: $g * 3;
$pt-font-size-large: $pt-font-size + 1px;
$pt-font-size-small: $pt-font-size - 1px;
$pt-line-height: 4 / 3;

//
// Blueprint component vars
//
$card-padding: $g * 3;

$menu-item-border-radius: $pt-border-radius;
$menu-item-line-height: $pt-grid-size * 2;
```


### `vendor.scss`
In your root Sass file, import your overrides file _before_ importing Blueprint source files. Then import all packages from `src/`.

For performance reasons, it can be nice to split your external stylesheets to a separate `vendor.scss` because these will likely change much less frequently than your application styles.

This will produce a single `vendor.css` file that contains all the compiled Blueprint styles in one file, from all four libraries below.

```scss
// import your overrides first
@import 'blueprint_variables';

// then each blueprint package from `/src/` NOT `/lib/css/`
@import '~@blueprintjs/core/src/blueprint';
@import '~@blueprintjs/datetime/src/blueprint-datetime';
@import '~@blueprintjs/select/src/blueprint-select';
@import '~@blueprintjs/table/src/table';
```

## put it together

```sh
> yarn build:css
yarn run v1.22.4
$ blueprint-sass-compile src/styles
Rendering Complete, saving .css file...
Wrote CSS to /src/styles/application.css
Wrote Source Map to /src/styles/application.css.map
GET https://raw.githubusercontent.com/palantir/blueprint/develop/resources/icons/16px/chevron-right.svg
GET https://raw.githubusercontent.com/palantir/blueprint/develop/resources/icons/16px/more.svg
GET https://raw.githubusercontent.com/palantir/blueprint/develop/resources/icons/16px/small-tick.svg
GET https://raw.githubusercontent.com/palantir/blueprint/develop/resources/icons/16px/small-minus.svg
Rendering Complete, saving .css file...
Wrote CSS to /src/styles/vendor.css
Wrote Source Map to /src/styles/vendor.css.map
Wrote 2 CSS files to /src/styles
✨  Done in 2.82s.
```
