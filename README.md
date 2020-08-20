# Scroll Horizontal

![NPM](https://img.shields.io/npm/l/simple-horizontal-scroll)


## Installation

- `$ npm i scroll-horizontal`

## Usage

Examples coming soon

### How to use

```js
let aboutUsSection = new HorizontalSection({
  selector: '.horizontal-section-of-pain-and-sorrow',
  sectionContainer: '.stick-section',
  pseudoHeight: '.set-height',
  
  settings: {
    hardOffset: 500,
    // offsetPercent: 20
  }
}).init()
```

## Info

The package is still in development. However, it supports common browsers and devices including IE 11

## To Do

- [ ] Transpile to vanilla
- [x] Transpile to ES5
- [x] Add minified version
- [ ] Run coverage tests
- [ ] Add mobile version support
- [ ] Add styles
- [ ] Update README
- [ ] Create webpage
- [ ] Show examples