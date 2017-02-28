/*jslint browser: true*/
/*global $, jQuery , console*/

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
brew.createUser = function (userName, successCheck, failCheck) {
	"use strict";
    var data = {
		"devicetype" : brew.device,
        "username" : userName
	};
	$.ajax({
		type: 'POST',
		dataType: 'json',
		timeout: 3000,
		url: 'http://' + brew.getHueBridgeIpAddress() + '/api/',
		data: JSON.stringify(data),
		success: function (data) { successCheck(data); },
		error: function (a, err) { failCheck(err); }
	});
};

//connect to bridge
brew.bridgeConnect = function () {
    "use strict";
	$('#status').html("Trying to connect...");
	brew.registerUser(
		brew.user,
		function (json) {
			console.log(json[0]);
			if (json[0].error) {
				$('#status').html(json[0].error.description);
			} else if (json[0].success) {
				$('#status').html('Connected');
				console.log('New username:', brew.user);
			} else {
                $('#status').html('Something went wrong');
			}
		},
		function () {
			$('#status').html('Could not find Hue Bridge');
		}
    );
};

brew.getHueBridgeIpAddress = function () {
	"use strict";
    return brew.bridgeIP || $('#ipAddress').val();
};

//Store the Hue Bridge IP and update the UI's text field.
brew.setHueBridgeIpAddress = function (ipAddress) {
	"use strict";
    brew.bridgeIP = ipAddress;
	$('#ipAddress').val(brew.bridgeIP);
};