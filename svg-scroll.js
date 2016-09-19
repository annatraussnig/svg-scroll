// LIBRARIE
function SvgScroll(selector) {
   return new Object(document.querySelector(selector));
}

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
