// ELEMENTS
var lightFitting = new SvgScroll('#light-fitting');
var lightbulb = new SvgScroll('#lightbulb');
var lightbulbContainer = new SvgScroll('#lightbulb-container');
var topShadowStraight = new SvgScroll('#top-shadow-straight');
var bottomShadowStraight = new SvgScroll('#bottom-shadow-straight');
var topShadowTilted = new SvgScroll('#top-shadow-tilted');
var bottomShadowTilted = new SvgScroll('#bottom-shadow-tilted');
var face = new SvgScroll('#face');
var faceUp = new SvgScroll('#face-up');
var hair1 = new SvgScroll('#hair1');
var hair2 = new SvgScroll('#hair2');
var hair3 = new SvgScroll('#hair3');
var hair4 = new SvgScroll('#hair4');


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
    lightbulb.mapToScroll([0.03, 0.04], 'r', [30, 18]);
    lightFitting.mapToScroll([0.03, 0.07], 'reveal', [0, 1]);
    lightbulb.mapToScroll([0.06, 0.08], 'r', [18, 21.6])
    topShadowStraight.mapToScroll([0.07, 0.1], 'opacity', [0, 1]);
    bottomShadowStraight.mapToScroll([0.07, 0.1], 'opacity', [0, 1]);
    lightbulb.mapToScroll([0.1, 0.12], 'fill', ['#877F5C', '#F89406']);
    // bulb drops
    lightbulbContainer.mapToScroll([0.25, 0.35], 'top', ['-5vh', '30vh']);
    lightbulb.mapToScroll([0.25, 0.27], 'fill', ['#F89406', '#000000']);
    topShadowStraight.mapToScroll([0.26, 0.28], 'opacity', [1, 0]);
    bottomShadowStraight.mapToScroll([0.26, 0.28], 'opacity', [1, 0]);
    // floor gets drawn
    face.mapToScroll([0.15, 0.27], 'revealReverse', [0, 0.8]);
    // face appears
    face.mapToScroll([0.34, 0.39], 'revealReverse', [0.8, 1]);
    // floor disappears
    face.mapToScroll([0.39, 0.41], 'reveal', [1, 0.15]);
    // bulb reaches face
    lightbulb.mapToScroll([0.3, 0.39], 'fill', ['#000000', '#F89406']);
    topShadowTilted.mapToScroll([0.38, 0.385], 'opacity', [0, 1]);
    bottomShadowTilted.mapToScroll([0.38, 0.385], 'opacity', [0, 1]);
    // hairs appear
    hair1.mapToScroll([0.43, 0.48], 'reveal', [0, 1]);
    hair2.mapToScroll([0.48, 0.53], 'revealReverse', [0, 1]);
    hair3.mapToScroll([0.53, 0.58], 'reveal', [0, 1]);
    hair4.mapToScroll([0.58, 0.63], 'revealReverse', [0, 1]);
    // face switch
    face.mapToScroll([0.65, 0.78], 'opacity', [1, 0]);
    faceUp.mapToScroll([0.65, 0.72], 'opacity', [0, 1]);
    // bulb goes up again
    lightbulbContainer.mapToScroll([0.68, 0.85], 'top', ['30vh', '-5vh']);
    topShadowTilted.mapToScroll([0.68, 0.75], 'opacity', [1, 0]);
    bottomShadowTilted.mapToScroll([0.68, 0.75], 'opacity', [1, 0]);
    // all lines disappear
    lightFitting.mapToScroll([0.82, 0.93], 'reveal', [1, 0]);
    hair1.mapToScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair2.mapToScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair3.mapToScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair4.mapToScroll([0.85, 0.93], 'opacity', [1, 0]);
});
