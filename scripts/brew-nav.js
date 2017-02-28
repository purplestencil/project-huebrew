/*jslint browser: true*/
/*global $, jQuery , console, scrollBy*/

//define variables
var selector, elems, makeActive, scrollToAnchor, headerOffset;

//navigation active selector
selector = ".nav li";
elems = document.querySelectorAll(selector);
makeActive = function () {
    "use strict";
    var i;
    for (i = 0; i < elems.length; i += 1) {
        elems[i].classList.remove("active");
    }
    this.classList.add("active");
};
var i;
for (i = 0; i < elems.length; i += 1) {
    elems[i].addEventListener("mousedown", makeActive);
}


//to adjust top offset for fixed navbar when jumping to anchor

headerOffset = 56;
scrollToAnchor = function () {
    "use strict";
    scrollBy(0, -headerOffset);
};
if (location.hash) {
    scrollToAnchor();
}
window.addEventListener("hashchange", scrollToAnchor);