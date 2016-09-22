//! svg-scroll.js
//! version : 0.1.0
//! author  : Anna Traussnig
//! license : MIT

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.svgScroll = factory()
}(this, function () { 'use strict';

    function ScrollWrapper(selector) {
        this.element = document.querySelector(selector);
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

    function interpolateValue(coefficient, extrema, isColor) {
        return isColor ? getColorMix(coefficient, extrema) :
            extrema[0] + coefficient * (extrema[1] - extrema[0]);
    }

    function mapToScroll(scrollPositions, propertyValues, getPropertyValue, setProperty, propertyName) {
        var relativeScrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

        if (relativeScrollFraction > 0 && relativeScrollFraction < 1) {
            if (relativeScrollFraction < 0.1) {
                setProperty(propertyValues[0], propertyName);
            } else if (relativeScrollFraction > 0.9) {
                setProperty(propertyValues[1], propertyName);
            } else {
                var value = getPropertyValue(relativeScrollFraction, propertyValues);
                setProperty(value, propertyName);
            }
        }
    }

    ScrollWrapper.prototype.setProperty = function(value, property) {
        if (typeof property === 'function') {
            property(this.element, value);
        } 
        else if (this.element.hasAttribute(property)) {
            this.element.setAttribute(property, value);
        } else {
            this.element.style[property] = value;
        }
    }

    ScrollWrapper.prototype.setDashOffset = function(direction) {
        return function(value) {
            var pathLength = this.element.getTotalLength();
            var drawLength = pathLength * value;
            this.element.style.strokeDashoffset = pathLength - (direction * drawLength);
        }
    }

    ScrollWrapper.prototype.changeOnScroll = function(scrollPositions, propertyName, propertyValues) {
        mapToScroll(scrollPositions, propertyValues, function(coefficient, extrema) {
            var isString = typeof extrema[0] == 'string';
            var isColor = (isString && extrema[0].substring(0, 1) === '#');
            var numericalPropertyValues = (isColor || !isString) ? extrema : extrema.map(parseFloat);
            var value = interpolateValue(coefficient, numericalPropertyValues, isColor);
            var unit = isString ? extrema[0].split(numericalPropertyValues[0])[1] : '';
            return String(value).concat(unit);
        }, this.setProperty.bind(this), propertyName);
    }

    ScrollWrapper.prototype.reveal = function(scrollPositions, propertyValues, isReverse) {
        var direction = isReverse ? -1 : 1;
        mapToScroll(scrollPositions, propertyValues, interpolateValue, this.setDashOffset(direction).bind(this));
    }

    ScrollWrapper.prototype.hide = function() {
        var pathLength = this.element.getTotalLength();
        this.element.style.strokeDasharray = pathLength + ' ' + pathLength;
        this.element.style.strokeDashoffset = pathLength;
        this.element.getBoundingClientRect();
    }

    ScrollWrapper.prototype.toggleClass = function(scrollPositions, className) {
        var scrollFraction = getScrollFraction(scrollPositions[0], scrollPositions[1]);

        if (scrollFraction > 0 && scrollFraction < 1) {
            this.element.classList.add(className);
        } else {
            this.element.classList.remove(className);
        }
    }

    return {
        'ScrollWrapper': ScrollWrapper 
    };
}));