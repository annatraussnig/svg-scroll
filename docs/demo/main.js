var ScrollWrapper = svgScroll.ScrollWrapper;

// ELEMENTS
var lightFitting = new ScrollWrapper('#light-fitting');
var lightbulb = new ScrollWrapper('#lightbulb');
var lightbulbContainer = new ScrollWrapper('#lightbulb-container');
var topShadow = new ScrollWrapper('#top-shadow');
var bottomShadow = new ScrollWrapper('#bottom-shadow');

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

// INITIAL STATE
document.addEventListener('DOMContentLoaded', function(){ 
    lightFitting.hide();
    window.scrollTo(0,0);
}, false);
window.onbeforeunload = function(){ window.scrollTo(0,0); }


// ANIMATION
window.addEventListener("scroll", function(e) {
    lightbulb.changeOnScroll([0, 0.1], 'r', [27, 18]);
    lightFitting.reveal([0, 0.2], [0, 1]);
    lightbulb.changeOnScroll([0.2, 0.25], 'r', [18, 21.6])
    lightbulb.changeOnScroll([0.2, 0.25], 'fill', ['#877F5C', '#F89406']);
    topShadow.changeOnScroll([0.25, 0.3], 'opacity', [0, 1]);
    bottomShadow.changeOnScroll([0.25, 0.3], 'opacity', [0, 1]);
    lightFitting.reveal([0.65, 1], [1, 0]);
    bottomShadow.changeOnScroll([0.7, 0.8], 'opacity', [1, 0]);
    topShadow.changeOnScroll([0.75, 0.85], 'opacity', [1, 0]);

    // matching code highlights
    code1.toggleClass([0, 0.1], 'highlighted');
    code2.toggleClass([0, 0.2], 'highlighted');
    code3.toggleClass([0.2, 0.25], 'highlighted')
    code4.toggleClass([0.2, 0.25], 'highlighted');
    code5.toggleClass([0.25, 0.3], 'highlighted');
    code6.toggleClass([0.25, 0.3], 'highlighted');
    code7.toggleClass([0.65, 1], 'highlighted');
    code8.toggleClass([0.7, 0.8], 'highlighted');
    code9.toggleClass([0.75, 0.85], 'highlighted');
});
