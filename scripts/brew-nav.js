/*JavaScript code for Project Huebrew navigation bar
  Author: Richa Mehta
*/

//define variables
var selector, elems, makeActive, scrollToAnchor, headerOffset;

//navigation active selector
selector = ".nav li";
elems = document.querySelectorAll(selector);
makeActive = function () {
    "use strict";
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("active");
    }
    this.classList.add("active");
};
for (var j = 0; j < elems.length; j++) {
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