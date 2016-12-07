svg-scroll
==========

**A minimalist Javascript library to create scroll animations easily – no third-party dependencies.**

The current use case is the animation of fixed (CSS: `position: fixed`) SVG graphics over a long page (1000+ px of height). The amount of scrolling is used to determine the current state of the animation and make it flow.

If you can't quite visualize it yet, why not go see the [DEMO](https://annatraussnig.github.io/svg-scroll/demo/)? 

## Installation

```
npm install svg-scroll
```

## Simple Example

```javascript
var wrappedElement = new svgScroll.ScrollWrapper('#my-svg-path');

document.addEventListener('DOMContentLoaded', wrappedElement.hide, false);

window.addEventListener("scroll", function(e) {
    wrappedElement.reveal([0, 0.8], [0, 1]);
    wrappedElement.changeOnScroll([0.7, 0.9], 'stroke', ['#bc3c2f', '#ecd093']);
    wrappedElement.changeOnScroll([0.9, 1], 'opacity', [1, 0]);
});
```
See this example in full action [HERE](https://annatraussnig.github.io/svg-scroll/simple/).

## Documentation

### ScrollWrapper

The one and only focus of svg-scroll is the `ScrollWrapper`, which return an object exposing 4 methods to streamline the creation of SVG scroll animations.

#### usage

```javascript
var ScrollWrapper = svgScroll.ScrollWrapper;
var wrappedElement = new ScrollWrapper('#some-css-selector');
```
#### new ScrollWrapper(selector)

| Param   |      Type      |  Description |
|----------|:-------------:|--------------|
| selector |  String | CSS selctor string |

#### Methods

+ `changeOnScroll`
+ `hide`
+ `reveal` 
+ `toggleClass`

### changeOnScroll

#### usage

```javascript
wrappedElement.changeOnScroll([0.4, 0.7], 'opacity', [1, 0]);
```

Where `wrappedElement` is a `ScrollWrapper` object. 

The snippet above gradually changes the opacity of `wrappedElement` from 1 to 0 as the viewer scrolls from 40% to 70% of the total page length.

This flexible method can be used on any kind of DOM elements – notably divs containing SVG graphics (see DEMO source code for example). It also parses a few different formats of property values.

#### changeOnScroll(scrollPositions, propertyName, propertyValues)

| Param   |      Type      |  Description |
|---------|----------------|--------------|
| scrollPositions |  Array(2) | [inital, final] boundaries of the change, as fraction of the total page length.| 
| propertyName |  String  Function  | Name of the style property or element attribute to change - or a setter function (see below).|
| propertyValues |  Array(2)  | [initial, final] values of the property. The values can be numbers, colors (hex), or value/unit strings (see examples below).  |

**Setter functions** should take the following form: 
`propertySetter(element, propertyValue)`, for instance: 

```javascript
function setStroke(element, color) {
element.style.stroke = color;
}

wrappedElement.changeOnScroll([0.7, 0.9], setStroke, ['#bc3c2f', '#ecd093']);
```

**Supported value formats**:

```javascript
// numbers
wrappedElement.changeOnScroll([0, 1], 'opacity', [1, 0]);
// (hex) colors
wrappedElement.changeOnScroll([0, 1], 'fill', ['#F89406', '#000000']);
// value/unit strings
wrappedElement.changeOnScroll([0, 1], 'top', ['-5vh', '3vh']);
```

### hide

#### usage

```javascript
wrappedSvgPath.hide();
```

Where `wrappedElement` is a `ScrollWrapper` object. 

Fully hides an SVG path to reveal it later. The original element has to be an SVG path.

*No arguments.*

### reveal

#### usage

```javascript
wrappedElement.reveal([0, 0.8], [0, 0.5]);
```

Where `wrappedElement` is a `ScrollWrapper` object.

The snippet above reveals the first half (from 0 to 0.5) of the path as the viewer scrolls from 40% to 70% of the total page length.

The original element has to be an SVG path.

#### reveal(scrollPositions, pathFractions, isReverse)

| Param   |      Type      |  Description |
|---------|----------------|--------------|
| scrollPositions |  Array(2) | [inital, final] boundaries of the reveal, as fraction of the total page length.| 
| pathFractions |  Array(2)  | [initial, final] visible fractions of the path.  |
| isReverse | Bool  | *Optional.* Reverses the direction of the path. Useful when the reveal goes the wrong way. |

Note on **pathFractions**: it is totally possible to have an initial  bigger than the final pathFraction. This will produce a gradual concealement of the path:

```javascript
wrappedElement.reveal([0.5, 1], [1, 0], false);
```

### toggleClass

#### usage

```javascript
wrappedElement.toggleClass([0.5, 0.8], 'highlighted');
```

Where `wrappedElement` is a `ScrollWrapper` object.

The snippet above adds the class `highlighted` to the element when the viewer is scrolling from 50% to 80% of the total page length. The class is absent otherwise.

This method will also work on non-SVG elements.

#### toggled(scrollPositions, className)

| Param   |      Type      |  Description |
|---------|----------------|--------------|
| scrollPositions |  Array(2) | [inital, final] boundaries of the reveal, as fraction of the total page length.| 
| className | String  | Name of the class to toggle. |

## License

MIT Licensed. Copyright (c) Anna Traussnig 2016.