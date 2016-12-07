// ELEMENT
var wrappedElement = new svgScroll.ScrollWrapper('#drawing');

// INITIAL STATE
document.addEventListener('DOMContentLoaded', function(){ 
    wrappedElement.hide();
    window.scrollTo(0,0);
}, false);

// ANIMATION
window.addEventListener("scroll", function(e) {
    wrappedElement.reveal([0, 0.8], [0, 1]);
    wrappedElement.changeOnScroll([0.7, 0.9], 'stroke', ['#bc3c2f', '#ecd093']);
    wrappedElement.changeOnScroll([0.9, 1], 'opacity', [1, 0]);
});

window.onbeforeunload = function(){ window.scrollTo(0,0); }
