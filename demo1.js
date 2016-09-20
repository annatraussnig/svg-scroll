// ELEMENTS
var drawing = new SvgScroll('#drawing');

// INITIAL STATE
document.addEventListener('DOMContentLoaded', function(){ 
    drawing.hide();
    window.scrollTo(0,0);
}, false);


function setStroke(element, color) {
    element.style.stroke = color;
}

window.onbeforeunload = function(){ window.scrollTo(0,0); }

// ANIMATION
window.addEventListener("scroll", function(e) {
    drawing.reveal([0, 0.8], [0, 1]);
    drawing.changeOnScroll([0.7, 0.8], 'stroke', ['#bc3c2f', '#ecd093']);
    drawing.changeOnScroll([0.8, 9], 'top', ['-25px', '-40px']);
    drawing.changeOnScroll([0.9, 1], 'opacity', [1, 0]);
});
