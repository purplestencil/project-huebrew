/*jslint browser: true*/
/*global $, jQuery, console, alert*/

//huebrew object and variables
var brew = {
    //new user created on connect
    user: "",

    //whitelisted users
    testUser: "newdeveloper",
    brUser: "ZKAiaxu0o8aTvLGl3SNUJPv4jZcGVgjcIn-9v-ul",

    //device name
    device: "huebrew#test",

    //bridge IP address on start
    bridgeIP: null,
    
    //selected light 1 on start
    lightId: 1
};

//return the bridge address when the function is called
brew.getBridgeIp = function () {
    "use strict";
    return brew.bridgeIP || $("#ipAddress").val();
};

//create new user on bridge
brew.createUser = function (userName, successCheck, failCheck) {
    "use strict";
    //message body for POST request
    var messageBody = {
        "username": userName,
        "devicetype": brew.device
    };
    //http call
    $.ajax({
        type: "POST",
        dataType: "json",
        timeout: 3000,
        url: "http://" + brew.getBridgeIp() + "/api/",
        data: JSON.stringify(messageBody),
        success: function (data) {
            successCheck(data);
        },
        error: function (a, err) {
            failCheck(err);
        }
    });
    console.log("The following information was passed to the bridge:" + JSON.stringify(messageBody));
};

//connect to bridge
brew.bridgeConnect = function () {
    "use strict";
    console.log("Establishing connection...");
    $("#status").text("Establishing connection...");
    brew.createUser(
        brew.user,
        //successCheck function to check the response from the bridge
        function (response) {
            console.log(response[0]);
            if (response[0].error) {
                $("#status").text(response[0].error.description);
                console.log("Could not establish a connection. \nError " + response[0].error.type + ": " + response[0].error.description);
                alert("Could not establish a connection. \nError " + response[0].error.type + ": " + response[0].error.description);
            } else if (response[0].success) {
                $("#status").text("Successfully connected to the bridge!");
                console.log("Success: Connected to the bridge. \nNew username:", response[0].success.username);
                alert("Success: Connected to the bridge. \nNew username:", response[0].success.username);
            } else {
                $("#status").text("Oh no! Something went wrong.");
                console.log("Undefined error: Connection attempt failed. Check your code.");
                alert("Undefined error: Connection attempt failed. Check your code.");
            }
        },
        //failCheck function
        function () {
            $("#status").text("Error: Could not locate your Hue Bridge.");
            console.log("Could not locate the bridge. Check the IP address you entered.");
            alert("Could not locate the bridge. Check the IP address you entered.");
        }
    );
};

//add click handler for connect button
document.getElementById("connectBridge").addEventListener("click", function () {
    "use strict";
    brew.bridgeConnect();
});

brew.lightConnect = function () {
    "use strict";
    brew.getLights (
    function() {
        //If lights are available, display the lights
        $("#lights").html(response[0]);
    },
    function() {});
};

brew.getLights = function (successCheck, failCheck) {
    "use strict";
    //http call
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://" +
            brew.getBridgeIp() + "/api" +
            brew.user + "/lights",
        success: function (data) {
            successCheck(data);
        },
        error: function (a, err) {
            failCheck(err);
        }
    });
};


//select a light from a list
brew.selectLight = function (lightId) {
    "use strict";
    brew.lightId = lightId;
};

//turn on selected light
brew.lightOn = function () {
    "use strict";
    //call state change request function
    brew.setLightState(brew.lightId, {
        "on": true
    });
};

//turn off selected light
brew.lightOff = function () {
    "use strict";
    //call state change request function
    brew.setLightState(brew.lightId, {
        "on": false
    });
};

//send request to bridge to change the light state
brew.setLightState = function (lightId, state) {
    "use strict";
    //http call
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "http://" +
            brew.getBridgeIp() + "/api" +
            brew.user + "/lights" +
            lightId + "/state",
        data: JSON.stringify(state),
        success: function (data) {},
        error: function (a, err) {}
    });
};