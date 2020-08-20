# Scroll Horizontal

![NPM](https://img.shields.io/npm/l/simple-horizontal-scroll)


## Installation and Setup

- `$ npm i scroll-horizontal`

### Basic Setup

Import the script and call the HorizontalSection() function.

```js
let newHorizontalSection = new HorizontalSection({     
  settings: {
    offsetScroll: 500
  }
}).init()
```

### HTML structure

```html
<div class="section-horizontal-scroll">
  <div class="scroll-wrapper">
    <div class="section-container">
      <div class="line">
        <!-- put your stuff here -->
      </div>
    </div>
  </div>
</div>
```

### Other settings

```js
settings: {
  offsetScroll: 500, // scroll offset (in pixels) when entering and leaving the section (500 recommended)
  disableBefore: 768, // sets minimum screen width to run
  disableAfter: 1024, // sets max screen width to run
  offsetPercent: 20  // integer - same as offsetScroll, but uses viewport width instead of pixels
}
```

If you wan to use padding add this style to your css to fill right-side gap

```css
.line::after {
  content: '';
  display: block;
  width: 120px; /* padding */
  height: 1px;
  flex-shrink: 0;
}
```

## Example

View the example [here]:https://a-angelov.eu/packages/scroll-horizontal/

## Info

The package is still in development. However, it supports common browsers and devices including IE 11.
Current version consists only of minified ES5 javascript file. Visit the repo for more.

### To Do

- [x] Transpile to vanilla
- [x] Transpile to ES5
- [x] Add minified version
- [ ] Run coverage tests
- [x] Add mobile version support
- [x] Add styles
- [ ] Update README
- [x] Create webpage
- [ ] Show examples
- [ ] Window resize support
- [ ] Add CDN
- [ ] Add Yarn
