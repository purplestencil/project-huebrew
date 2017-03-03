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
    bridgeIP: null
};

//Return the bridge address when the function is called
brew.getHueBridgeIpAddress = function () {
    "use strict";
    return brew.bridgeIP || $("#ipAddress").val();
};

//create new user on bridge
brew.createUser = function (userName, successCheck, failCheck) {
    "use strict";
    var data = {
        "username": userName,
        "devicetype": brew.device
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        timeout: 3000,
        url: "http://" + brew.getHueBridgeIpAddress() + "/api/",
        data: JSON.stringify(data),
        success: function (data) {
            successCheck(data);
        },
        error: function (a, err) {
            failCheck(err);
        }
    });
    console.log(data);
};

//connect to bridge
brew.bridgeConnect = function () {
    "use strict";
    console.log("Establishing connection...");
    $("#status").html("Establishing connection...");
    brew.createUser(
        brew.user,
        function (json) {
            console.log(json[0]);
            if (json[0].error) {
                $("#status").html(json[0].error.description);
            } else if (json[0].success) {
                $("#status").html("Connected");
                console.log("Connected with new username:", brew.user);
            } else {
                $("#status").html("Oh no! Something went wrong.");
                console.log("Connection attempt failed. Check your code.");
            }
        },
        function () {
            $("#status").html("Could not locate your Hue Bridge.");
            console.log("Could not locate the bridge.");
        }
    );
};

//add click handler for connect button
document.getElementById("connectBridge").addEventListener("click", function () {
    "use strict";
    brew.bridgeConnect();
});

brew.checkConnection = function (successCheck, failCheck) {
    "use strict";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://" +
            brew.getHueBridgeIpAddress() + "/api/" +
            brew.user + "/config",
        success: successCheck,
        error: function (a, err) {
            failCheck(err);
        }
    });
};

//Store the Hue Bridge IP and update the UI"s text field.
brew.setHueBridgeIpAddress = function (ipAddress) {
    "use strict";
    brew.bridgeIP = ipAddress;
    $("#ipAddress").val(brew.bridgeIP);
};