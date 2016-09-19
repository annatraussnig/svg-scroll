// ELEMENTS
var lightFitting = svgScroll.getElement('#light-fitting');
var lightbulb = svgScroll.getElement('#lightbulb');
var lightbulbContainer = svgScroll.getElement('#lightbulb-container');
var topShadowStraight = svgScroll.getElement('#top-shadow-straight');
var bottomShadowStraight = svgScroll.getElement('#bottom-shadow-straight');
var topShadowTilted = svgScroll.getElement('#top-shadow-tilted');
var bottomShadowTilted = svgScroll.getElement('#bottom-shadow-tilted');
var face = svgScroll.getElement('#face');
var faceUp = svgScroll.getElement('#face-up');
var hair1 = svgScroll.getElement('#hair1');
var hair2 = svgScroll.getElement('#hair2');
var hair3 = svgScroll.getElement('#hair3');
var hair4 = svgScroll.getElement('#hair4');


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
