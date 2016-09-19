# svg-scroll
A simple library to create scroll animations easily – no third party libraries required.

## example

var SvgScroll = require('svg-scroll');

var drawing = new SvgScroll('#svg-drawing');

// hide the drawing
document.addEventListener('DOMContentLoaded', drawing.hide, false);

window.addEventListener("scroll", function(e) {
    // reveal the drawing in the first 40% of the scrolling
    drawing.mapToScroll([0, 0.4], 'reveal', [0, 1]);
    // change color
    drawing.mapToScroll([0.4, 0.5], 'reveal');
    // fade
});

