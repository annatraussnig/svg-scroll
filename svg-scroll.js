// LIBRARIE
var svgScroll = {
   getElement: function (id ) {
      return new this.WrapperClass( document.getElementById( id ) );
   },
   WrapperClass: function ( element) {
      this.element = element;
   }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

function rgbToHex(colorArray) {
    var hex = [];
    for (var i = 0; i < 3; i++) {
        hex.push(Math.clip(colorArray[i], 0, 255).toString(16).substring(0,2));
    }
    return "#" + hex.join("");
}

// the "blend" factor is a number between 0 and 1 determine whether 
// the new colour should be closer from colour 1 or colour 2
function getColorMix(blend, colors) {
    var rgb1 = hexToRgb(colors[0]);
    var rgb2 = hexToRgb(colors[1]);
    var newRgb = [];
        
    for (var i = 0; i < 3; i ++) {
        newRgb.push(rgb1[i] + blend * (rgb2[i] - rgb1[i]));
    }
    return rgbToHex(newRgb);
}

SvgScroll.prototype.setDashOffset = function(value, direction) {
    var pathLength = this.getTotalLength();
    var drawLength = pathLength * value;
    this.style.strokeDashoffset = pathLength - (direction * drawLength);
}

SvgScroll.prototype.hide = function() {
    var pathLength = this.getTotalLength();
    this.style.strokeDasharray = pathLength + ' ' + pathLength;
    this.style.strokeDashoffset = pathLength;
    this.getBoundingClientRect();
}

SvgScroll.prototype.reveal = function(percentage) {
    this.setDashOffset(percentage, 1);
}

SvgScroll.prototype.revealReverse = function(percentage) {
    this.setDashOffset(percentage, -1);
}

SvgScroll.prototype.setColor = function(c) {
    this.style.fill = c;
}

SvgScroll.prototype.setRadius = function(r) {
    this.setAttribute('r', r);
}

SvgScroll.prototype.setOpacity = function(o) {
    this.setAttribute('opacity', o);
}

SvgScroll.prototype.setTop = function(t) {
    this.style.top = t + 'vh';
}

function getTotalScrollFraction() {
    return (document.documentElement.scrollTop + document.body.scrollTop) / 
           (document.documentElement.scrollHeight - document.documentElement.clientHeight);
}

Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

function getScrollFraction(startPoint, endPoint) {
    var totalScrollFraction = getTotalScrollFraction();
    var scrollFractionWithinPoints = (totalScrollFraction - startPoint) / (endPoint - startPoint)
    return Math.clip(scrollFractionWithinPoints, 0, 1);
}

function getPropertyValue(relativeScrollFraction, propertyValues, interpolationFn) {
    return interpolationFn ? interpolationFn(relativeScrollFraction, propertyValues) :
        propertyValues[0] + relativeScrollFraction * (propertyValues[1] - propertyValues[0]);
}

// setPropertyMethod is a string, the name of the object method to use to set the property
// default propertyValues [0, 1]
SvgScroll.prototype.mapToScroll = function(scrollPositions, setPropertyMethod, propertyValues, interpolationFn) {
    var propertyValues = propertyValues || [0, 1];
    var relativeScrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

    if (relativeScrollFraction > 0 && relativeScrollFraction < 1) {
        var propertyValue = getPropertyValue(relativeScrollFraction, propertyValues, interpolationFn);
        this[setPropertyMethod](propertyValue);

        // making sure the element reaches the boundary condition
        if (relativeScrollFraction < 0.1) {
            this[setPropertyMethod](propertyValues[0]);
        } else if (relativeScrollFraction > 0.9) {
            this[setPropertyMethod](propertyValues[1]);
        }
    }
}


// ELEMENTS
var lightFitting = document.querySelector('#light-fitting');
var lightbulb = document.querySelector('#lightbulb');
var lightbulbContainer = document.querySelector('#lightbulb-container');
var topShadowStraight = document.querySelector('#top-shadow-straight');
var bottomShadowStraight = document.querySelector('#bottom-shadow-straight');
var topShadowTilted = document.querySelector('#top-shadow-tilted');
var bottomShadowTilted = document.querySelector('#bottom-shadow-tilted');
var face = document.querySelector('#face');
var faceUp = document.querySelector('#face-up');
var hair1 = document.querySelector('#hair1');
var hair2 = document.querySelector('#hair2');
var hair3 = document.querySelector('#hair3');
var hair4 = document.querySelector('#hair4');


// INITIAL STATE
document.addEventListener('DOMContentLoaded', function(){ 
    lightFitting.hide();
    face.hide();
    hair1.hide();
    hair2.hide();
    hair3.hide();
    hair4.hide();
    window.scrollTo(0,0);
}, false);
window.onbeforeunload = function(){ window.scrollTo(0,0); }


// ANIMATION
window.addEventListener("scroll", function(e) {
    // bulb appears
    lightbulb.mapToScroll([0.03, 0.04], 'setRadius', [30, 18]);
    lightFitting.mapToScroll([0.03, 0.07], 'reveal');
    lightbulb.mapToScroll([0.06, 0.08], 'setRadius', [18, 21.6])
    topShadowStraight.mapToScroll([0.07, 0.1], 'setOpacity');
    bottomShadowStraight.mapToScroll([0.07, 0.1], 'setOpacity');
    lightbulb.mapToScroll([0.1, 0.12], 'setColor', ['#877F5C', '#F89406'], getColorMix);
    // bulb drops
    lightbulbContainer.mapToScroll([0.25, 0.35], 'setTop', [-5, 30]);
    lightbulb.mapToScroll([0.25, 0.27], 'setColor', ['#F89406', '#000000']);
    topShadowStraight.mapToScroll([0.26, 0.28], 'setOpacity', [1, 0]);
    bottomShadowStraight.mapToScroll([0.26, 0.28], 'setOpacity', [1, 0]);
    // floor gets drawn
    face.mapToScroll([0.15, 0.27], 'revealReverse', [0, 0.8]);
    // face appears
    face.mapToScroll([0.34, 0.39], 'revealReverse', [0.8, 1]);
    // floor disappears
    face.mapToScroll([0.39, 0.41], 'reveal', [1, 0.15]);
    // bulb reaches face
    lightbulb.mapToScroll([0.3, 0.39], 'setColor', ['#000000', '#F89406']);
    topShadowTilted.mapToScroll([0.38, 0.385], 'setOpacity');
    bottomShadowTilted.mapToScroll([0.38, 0.385], 'setOpacity');
    // hairs appear
    hair1.mapToScroll([0.43, 0.48], 'reveal');
    hair2.mapToScroll([0.48, 0.53], 'revealReverse');
    hair3.mapToScroll([0.53, 0.58], 'reveal');
    hair4.mapToScroll([0.58, 0.63], 'revealReverse');
    // face switch
    face.mapToScroll([0.65, 0.78], 'setOpacity', [1, 0]);
    faceUp.mapToScroll([0.65, 0.72], 'setOpacity');
    // bulb goes up again
    lightbulbContainer.mapToScroll([0.68, 0.85], 'setTop', [30, -5]);
    topShadowTilted.mapToScroll([0.68, 0.75], 'setOpacity', [1, 0]);
    bottomShadowTilted.mapToScroll([0.68, 0.75], 'setOpacity', [1, 0]);
    // all lines disappear
    lightFitting.mapToScroll([0.82, 0.93], 'reveal', [1, 0]);
    hair1.mapToScroll([0.85, 0.93], 'setOpacity', [1, 0]);
    hair2.mapToScroll([0.85, 0.93], 'setOpacity', [1, 0]);
    hair3.mapToScroll([0.85, 0.93], 'setOpacity', [1, 0]);
    hair4.mapToScroll([0.85, 0.93], 'setOpacity', [1, 0]);
});
