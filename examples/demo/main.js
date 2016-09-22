var ScrollWrapper = svgScroll.ScrollWrapper;

// ELEMENTS
var lightFitting = new ScrollWrapper('#light-fitting');
var lightbulb = new ScrollWrapper('#lightbulb');
var lightbulbContainer = new ScrollWrapper('#lightbulb-container');
var topShadowStraight = new ScrollWrapper('#top-shadow-straight');
var bottomShadowStraight = new ScrollWrapper('#bottom-shadow-straight');
var topShadowTilted = new ScrollWrapper('#top-shadow-tilted');
var bottomShadowTilted = new ScrollWrapper('#bottom-shadow-tilted');
var face = new ScrollWrapper('#face');
var faceUp = new ScrollWrapper('#face-up');
var hair1 = new ScrollWrapper('#hair1');
var hair2 = new ScrollWrapper('#hair2');
var hair3 = new ScrollWrapper('#hair3');
var hair4 = new ScrollWrapper('#hair4');

// CODE SNIPPETS
var code1 = new ScrollWrapper('#code-1');
var code2 = new ScrollWrapper('#code-2');
var code3 = new ScrollWrapper('#code-3');
var code4 = new ScrollWrapper('#code-4');
var code5 = new ScrollWrapper('#code-5');
var code6 = new ScrollWrapper('#code-6');
var code7 = new ScrollWrapper('#code-7');
var code8 = new ScrollWrapper('#code-8');
var code9 = new ScrollWrapper('#code-9');
var code10 = new ScrollWrapper('#code-10');
var code11 = new ScrollWrapper('#code-11');
var code12 = new ScrollWrapper('#code-12');
var code13 = new ScrollWrapper('#code-13');
var code14 = new ScrollWrapper('#code-14');
var code15 = new ScrollWrapper('#code-15');
var code16 = new ScrollWrapper('#code-16');
var code17 = new ScrollWrapper('#code-17');
var code18 = new ScrollWrapper('#code-18');
var code19 = new ScrollWrapper('#code-19');
var code20 = new ScrollWrapper('#code-20');
var code21 = new ScrollWrapper('#code-21');
var code22 = new ScrollWrapper('#code-22');
var code23 = new ScrollWrapper('#code-23');
var code24 = new ScrollWrapper('#code-24');
var code25 = new ScrollWrapper('#code-25');
var code26 = new ScrollWrapper('#code-26');
var code27 = new ScrollWrapper('#code-27');
var code28 = new ScrollWrapper('#code-28');
var code29 = new ScrollWrapper('#code-29');
var code30 = new ScrollWrapper('#code-30');

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
    lightbulb.changeOnScroll([0.03, 0.04], 'r', [30, 18]);
    lightFitting.reveal([0.03, 0.07], [0, 1]);
    lightbulb.changeOnScroll([0.06, 0.08], 'r', [18, 21.6])
    topShadowStraight.changeOnScroll([0.07, 0.1], 'opacity', [0, 1]);
    bottomShadowStraight.changeOnScroll([0.07, 0.1], 'opacity', [0, 1]);
    lightbulb.changeOnScroll([0.1, 0.12], 'fill', ['#877F5C', '#F89406']);
    // bulb drops
    lightbulbContainer.changeOnScroll([0.25, 0.35], 'top', ['-5vh', '30vh']);
    lightbulb.changeOnScroll([0.25, 0.27], 'fill', ['#F89406', '#000000']);
    topShadowStraight.changeOnScroll([0.26, 0.28], 'opacity', [1, 0]);
    bottomShadowStraight.changeOnScroll([0.26, 0.28], 'opacity', [1, 0]);
    // floor gets drawn
    face.reveal([0.15, 0.27], [0, 0.8], true);
    // face appears
    face.reveal([0.34, 0.39], [0.8, 1], true);
    // floor disappears
    face.reveal([0.39, 0.41], [1, 0.15]);
    // bulb reaches face
    lightbulb.changeOnScroll([0.3, 0.39], 'fill', ['#000000', '#F89406']);
    topShadowTilted.changeOnScroll([0.38, 0.385], 'opacity', [0, 1]);
    bottomShadowTilted.changeOnScroll([0.38, 0.385], 'opacity', [0, 1]);
    // hairs appear
    hair1.reveal([0.43, 0.48], [0, 1]);
    hair2.reveal([0.48, 0.53], [0, 1], true);
    hair3.reveal([0.53, 0.58], [0, 1]);
    hair4.reveal([0.58, 0.63], [0, 1], true);
    // face switch
    face.changeOnScroll([0.65, 0.78], 'opacity', [1, 0]);
    faceUp.changeOnScroll([0.65, 0.72], 'opacity', [0, 1]);
    // bulb goes up again
    lightbulbContainer.changeOnScroll([0.68, 0.85], 'top', ['30vh', '-5vh']);
    topShadowTilted.changeOnScroll([0.68, 0.75], 'opacity', [1, 0]);
    bottomShadowTilted.changeOnScroll([0.68, 0.75], 'opacity', [1, 0]);
    // all lines disappear
    lightFitting.reveal([0.82, 0.93], [1, 0]);
    hair1.changeOnScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair2.changeOnScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair3.changeOnScroll([0.85, 0.93], 'opacity', [1, 0]);
    hair4.changeOnScroll([0.85, 0.93], 'opacity', [1, 0]);

    // matching code highlights
    code1.toggleClass([0.03, 0.04], 'highlighted');
    code2.toggleClass([0.03, 0.07], 'highlighted');
    code3.toggleClass([0.06, 0.08], 'highlighted')
    code4.toggleClass([0.07, 0.1], 'highlighted');
    code5.toggleClass([0.07, 0.1], 'highlighted');
    code6.toggleClass([0.1, 0.12], 'highlighted');
    code7.toggleClass([0.25, 0.35], 'highlighted');
    code8.toggleClass([0.25, 0.27], 'highlighted');
    code9.toggleClass([0.26, 0.28], 'highlighted');
    code10.toggleClass([0.26, 0.28], 'highlighted');
    code11.toggleClass([0.15, 0.27], 'highlighted');
    code12.toggleClass([0.34, 0.39], 'highlighted');
    code13.toggleClass([0.39, 0.41], 'highlighted');
    code14.toggleClass([0.3, 0.39], 'highlighted');
    code15.toggleClass([0.38, 0.385], 'highlighted');
    code16.toggleClass([0.38, 0.385], 'highlighted');
    code17.toggleClass([0.43, 0.48], 'highlighted');
    code18.toggleClass([0.48, 0.53], 'highlighted');
    code19.toggleClass([0.53, 0.58], 'highlighted');
    code20.toggleClass([0.58, 0.63], 'highlighted');
    code21.toggleClass([0.65, 0.78], 'highlighted');
    code22.toggleClass([0.65, 0.72], 'highlighted');
    code23.toggleClass([0.68, 0.85], 'highlighted');
    code24.toggleClass([0.68, 0.75], 'highlighted');
    code25.toggleClass([0.68, 0.75], 'highlighted');
    code26.toggleClass([0.82, 0.93], 'highlighted');
    code27.toggleClass([0.85, 0.93], 'highlighted');
    code28.toggleClass([0.85, 0.93], 'highlighted');
    code29.toggleClass([0.85, 0.93], 'highlighted');
    code30.toggleClass([0.85, 0.93], 'highlighted');
});
