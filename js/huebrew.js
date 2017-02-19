/*JavaScript code for Project Huebrew
  Author: Richa Mehta
*/

//navigation active selector
$(".nav li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})

//to adjust top offset for fixed navbar when jumping to anchor
var shiftWindow = function() { scrollBy(0, -50) };
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);

//huebrew object
var brew = {
	//new user created on connect
	newUser: null,

	//whitelisted users
	emUser: "602ecb0a344eca46ee838a8445685b4",
	brUser: "ZKAiaxu0o8aTvLGl3SNUJPv4jZcGVgjcIn-9v-ul",

	//device name
	device: 'huebrew#richa',

	//bridge IP address
	bridgeIP:  null,
	lastIP: "192.168.0.3"
};

