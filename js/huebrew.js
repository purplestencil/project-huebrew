/*JavaScript code for Project Huebrew
  Author: Richa Mehta
*/

//navigation active selector
var selector, elems, makeActive;
selector = ".nav li";
elems = document.querySelectorAll(selector);
makeActive = function () {
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("active");
    }
    this.classList.add("active");
};
for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener("mousedown", makeActive);
}


//to adjust top offset for fixed navbar when jumping to anchor
var scrollToAnchor, headerOffset;
headerOffset = 56;
scrollToAnchor = function() { 
  scrollBy(0, -headerOffset) 
};
if (location.hash) {
  scrollToAnchor();
}
window.addEventListener("hashchange", scrollToAnchor);


//huebrew object
var brew = {
	//new user created on connect
	user: "brewUser",

	//whitelisted users
	testUser: "newdeveloper",
	brUser: "ZKAiaxu0o8aTvLGl3SNUJPv4jZcGVgjcIn-9v-ul",

	//device name
	device: "huebrew#richa",

	//bridge IP address on start
	bridgeIP:  null
};

//create new user on bridge
brew.createUser = function(userName, successCheck, failCheck) {
	var data = {
		"devicetype" : brew.device, 
		"username" : userName
	};
	$.ajax ({
		type: 'POST',
		dataType: 'json',
		timeout: 3000,
		url: 'http://' + brew.getHueBridgeIpAddress() +'/api/',
		data: JSON.stringify(data),
		success: function(data) { successCheck(data) },
		error: function(a, err) { failCheck(err) }
	});
};

//connect to bridge
brew.bridgeConnect = function()
{
	$('#status').html("Trying to connect...");
	brew.registerUser(
		brew.user,
		function(json)
		{
			console.log(json[0]);
			if (json[0].error)
			{
				$('#status').html(json[0].error.description);
			}
			else if (json[0].success)
			{
				$('#status').html('Connected');
				console.log('New username:', brew.user);
			}
			else
			{
				$('#status').html('Something went wrong');
			}
		},
		function()
		{
			$('#status').html('Could not find Hue Bridge');
		});
};

brew.getHueBridgeIpAddress = function()
{
	return brew.bridgeIP || $('#ipAddress').val();
};

//Store the Hue Bridge IP and update the UI's text field.
brew.setHueBridgeIpAddress = function(ipAddress)
{
	brew.bridgeIP = ipAddress;
	$('#ipAddress').val(brew.bridgeIP);
};