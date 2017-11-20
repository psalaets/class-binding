# class-binding

Evaluate a value with same semantics as [`v-bind:class` in Vue](https://vuejs.org/v2/guide/class-and-style.html).

## Install

`npm install class-binding`

## Usage

```js
import evaluateClassBinding from 'class-binding';

const input = [
  'button',
  {
    warn: true,
    success: false
  }
];

evaluateClassBinding(input); // => ['button', 'warn']
```

## API

`import evaluateClassBinding from 'class-binding';`

### evaluateClassBinding(input)

`input` can be

- String
- Object where property names are class names and values are booleans that determine if that class is included or not
- Array containing Strings and/or Objects

Returns Array of class names

## License

MIT
