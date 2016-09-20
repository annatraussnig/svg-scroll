function SvgScroll(selector) {
    this.element = document.querySelector(selector);
}

SvgScroll.prototype.setDashOffset = function(value, direction) {
    var pathLength = this.element.getTotalLength();
    var drawLength = pathLength * value;
    this.element.style.strokeDashoffset = pathLength - (direction * drawLength);
}

SvgScroll.prototype.hide = function() {
    var pathLength = this.element.getTotalLength();
    this.element.style.strokeDasharray = pathLength + ' ' + pathLength;
    this.element.style.strokeDashoffset = pathLength;
    this.element.getBoundingClientRect();
}

SvgScroll.prototype.reveal = function(percentage) {
    this.setDashOffset(percentage, 1);
}

SvgScroll.prototype.revealReverse = function(percentage) {
    this.setDashOffset(percentage, -1);
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

function getValue(relativeScrollFraction, propertyValues, isColor) {
    return isColor ? getColorMix(relativeScrollFraction, propertyValues) :
        propertyValues[0] + relativeScrollFraction * (propertyValues[1] - propertyValues[0]);
}

SvgScroll.prototype.setProperty = function(property, value) {
    if (typeof property === 'function') {
        property(this.element, value);
    } else if (property === 'reveal') {
        this.reveal(value);
    }  else if (property === 'revealReverse') {
        this.revealReverse(value);
    }
    else if (this.element.hasAttribute(property)) {
        this.element.setAttribute(property, value);
    } else {
        this.element.style[property] = value;
    }
}

SvgScroll.prototype.execOnScroll = function(scrollPositions, property, propertyValues, getPropertyValue) {
    var relativeScrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

    if (relativeScrollFraction > 0 && relativeScrollFraction < 1) {
        if (relativeScrollFraction < 0.1) {
            this.setProperty(property, propertyValues[0]);
        } else if (relativeScrollFraction > 0.9) {
            this.setProperty(property, propertyValues[1]);
        } else {
            var value = getPropertyValue(relativeScrollFraction, propertyValues);
            this.setProperty(property, value);
        }
    }
}

SvgScroll.prototype.mapToScroll = function(scrollPositions, property, propertyValues) {
    this.execOnScroll(scrollPositions, property, propertyValues, function(coefficient, extrema) {
        var isString = typeof extrema[0] == 'string';
        var isColor = (isString && extrema[0].substring(0, 1) === '#');
        var numericalPropertyValues = (isColor || !isString) ? extrema : extrema.map(parseFloat);
        var value = getValue(coefficient, numericalPropertyValues, isColor);
        var unit = isString ? extrema[0].split(numericalPropertyValues[0])[1] : '';
        return value + unit;
    });
}
