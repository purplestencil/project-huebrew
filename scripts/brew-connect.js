/*jslint browser: true*/
/*global $, jQuery, console, alert*/

//huebrew object
var brew = {
    //new user created on connect
    user: "",

    //whitelisted users
    testUser: "newdeveloper",
    brUser: "ZKAiaxu0o8aTvLGl3SNUJPv4jZcGVgjcIn-9v-ul",

    //device name
    device: "huebrew#test",

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
        url: "http://" + brew.getHueBridgeIpAddress() + "/api/",
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
        //check the response from the bridge
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