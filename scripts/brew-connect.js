/*jslint browser: true, devel: true, passfail: false, sloppy: true, sub: true, vars: true*/
/*global $, jQuery, console, alert*/


//huebrew object and variables
var brew = {
    //new user created on connect
    user: null,

    //bridge IP address on start
    bridgeIp: null,

    //device name
    device: 'huebrew#test',

    //whitelisted user for testing
    testUser: 'newdeveloper',

    //home bridge parameters
    userHome: 'pEwPPVsunqWcKRCBRxfhbelb2YkV2fe1J-LQ4XgJ',
    bridgeIpHome: '192.168.0.3',

    //select light 1 by default on start
    lightId: 1,

    //variable to hold light response
    lightResponse: null
};

//return the bridge address when the function is called
brew.getBridgeIp = function () {
    brew.bridgeIp = $('#ipAddress').val();
    return brew.bridgeIp;
};

//store the bridge address
brew.setBridgeIp = function (ipAddress) {
    brew.bridgeIp = ipAddress;
};

//create new user on bridge
brew.createUser = function (userName, successCheck, failCheck) {
    //message body for POST request
    var messageBody = {
        'devicetype': brew.device
    };
    //http call
    $.ajax({
        type: 'POST',
        dataType: 'json',
        timeout: 3000,
        url: 'http://' + brew.getBridgeIp() + '/api/',
        data: JSON.stringify(messageBody),
        success: function (data) {
            successCheck(data);
        },
        error: function (a, err) {
            failCheck(err);
        }
    });
    console.log('Request body:' + JSON.stringify(messageBody));
    console.log('Connecting to bridge at: ' + brew.getBridgeIp());
    //brew.setBridgeIp(brew.getBridgeIp());
};

//connect to bridge
brew.bridgeConnect = function () {
    console.log('Establishing connection...');
    $('#status').html('<p class="form-text">Establishing connection...</p>');
    brew.createUser(
        brew.user,
        //successCheck function to check the response from the bridge
        function (response) {
            //log response to console
            console.log('Response received: ' + response);
            console.log('Response details: ' + JSON.stringify(response));
            //check if response returned is an error or a success
            if (response[0].error) {
                $('#status').html('<p class="fail-text">Error: ' + response[0].error.description + '</p>');
                console.log('Could not establish a connection. \nError ' + response[0].error.type + ': ' + response[0].error.description);
            } else if (response[0].success) {
                $('#status').html('<p class="success-text">Connected!</p>');
                console.log('Success: Connected to the bridge. \nNew username: ' + response[0].success.username);
                brew.user = response[0].success.username;
                brew.user = 'newdeveloper';
            } else {
                $('#status').html('<p class="fail-text">Undefined error. Try again.</p>');
                console.log('Undefined error: Connection attempt failed.');
            }
        },
        //failCheck function
        function () {
            $('#status').html('<p class="fail-text">Error: No bridge found</p>');
            console.log('Could not locate the bridge. Check the Ip address you entered.');
        }
    );

    brew.lightConnect();
};

//get request for all lights -- does not work with simulator
brew.getLights = function (successCheck, failCheck) {
    //http call
    $.ajax({
        type: 'GET',
        dataType: 'json',
        timeout: 3000,
        url: 'http://' + brew.bridgeIp + '/api/' + brew.user + '/lights',
        //url: 'http://' + brew.bridgeIp + '/api/' + brew.user,
        success: function (data) {
            successCheck(data);
        },
        error: function (a, err) {
            failCheck(err);
        }
    });
};

//get info about all connected lights -- does not work with simulator
brew.lightConnect = function () {
    brew.getLights(
        //successCheck function to check the response from the bridge
        function (response) {
            //save light response
            brew.lightResponse = response;
            //log response to console
            console.log('Connected to: ' + brew.bridgeIp);
            console.log('Light response received: ' + response);
            //console.log('Response spot check: ' + JSON.stringify(brew.lightResponse[1].state));
            //If lights are not available, display an error
            /*if (response[0].error) {
                $('#status').html('<p class="fail-text">Error: ' + response[0].error.description + '</p>');
                console.log('Could not retrieve light information. \nError ' + response[0].error.type + ': ' + response[0].error.description);
            }*/
            //$('#lights').html(JSON.stringify(response));
        },
        //failCheck function
        function () {
            console.log('Could not locate the bridge to get light information. Check your connection settings.');
        }
    );
};


//send request to bridge to change the light state
brew.setLightState = function (lightId, state) {
    brew.selectLight(lightId);
    //http call
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: 'http://' +
            brew.bridgeIp + '/api/' +
            brew.user + '/lights/' +
            lightId + '/state',
        data: JSON.stringify(state),
        success: function (data) {},
        error: function (a, err) {}
    });
    console.log('Request body:' + JSON.stringify(state));
    //brew.setBridgeIp(brew.getBridgeIp());
    brew.lightConnect();
};

//select a light from a list
brew.selectLight = function (lightId) {
    brew.lightId = lightId;
};

//turn on selected light
brew.lightOn = function () {
    //call state change request function
    brew.setLightState(brew.lightId, {
        'on': true
    });
};

//turn off selected light
brew.lightOff = function () {
    //call state change request function
    brew.setLightState(brew.lightId, {
        'on': false
    });
};

var btnElem = [];
var flag = 1;

brew.lightButton = function (lightId) {
    brew.selectLight(lightId);
/*    if (brew.lightResponse[lightId].state.on) {
        brew.lightOff();
        btnElem = 'lightButton' + lightId;
        $('#' + btnElem).html('Turn On');
        console.log('Light is now turned off');
    } else {
        brew.lightOn();
        btnElem = 'lightButton' + lightId;
        $('#' + btnElem).html('Turn Off');
        console.log('Light is now turned on');
    }*/
    if (flag % 2 === 0) {
        brew.lightOff();
        btnElem = 'lightButton' + lightId;
        $('#' + btnElem).html('Turn On');
        console.log('Light is now turned off');
    } else {
        brew.lightOn();
        btnElem = 'lightButton' + lightId;
        $('#' + btnElem).html('Turn Off');
        console.log('Light is now turned on');
    }
    flag++;
    console.log('Flag is now ' + flag + '. Light will toggle.');
};

//add click handler for connect button
document.getElementById('connectBridge').addEventListener('click', function () {
    brew.bridgeConnect();
});

//add click handler for test home connection button
document.getElementById('connectHome').addEventListener('click', function () {
    //set parameters for testing home bridge
    brew.user = brew.userHome;
    brew.bridgeIp = brew.bridgeIpHome;
    //get lights available on home bridge
    brew.lightConnect();
});

//add click handler for get light details button
/*document.getElementById('getLightInfo').addEventListener('click', function () {
    brew.lightConnect();
});*/

//add click handler to display light information
document.getElementById('showLights').addEventListener('click', function () {
    brew.lightConnect();
    //$('#lights').html(JSON.stringify(brew.lightResponse));
    //$('#lights').html(' ');
    $('#light-btns').html(' ');
    console.log('Light response: ' + JSON.stringify(brew.lightResponse));
    var lightNum = 0;
    var lightName = [];
    var lightBtnDiv = [];
    for (var i in brew.lightResponse) {
        lightNum++;
        lightName[i] = brew.lightResponse[i].name;
        /*        if (brew.lightResponse[i].state.on) {
                    lightBtnDiv[i] = '<div class="form-text">Light ' + lightNum + ': ' + lightName[i] + '<button type="button" class="btn btn-default btn-xs custom-btn" id="lightButton' + lightNum + '" onclick="brew.lightButton(' + lightNum + ')">Turn Off</button></div></br>';
                } else {
                    lightBtnDiv[i] = '<div class="form-text">Light ' + lightNum + ': ' + lightName[i] + '<button type="button" class="btn btn-default btn-xs custom-btn" id="lightButton' + lightNum + '" onclick="brew.lightButton(' + lightNum + ')">Turn On</button></div></br>';
                }*/
        lightBtnDiv[i] = '<div class="form-text">Light ' + lightNum + ': ' + lightName[i] + '<button type="button" class="btn btn-default btn-xs custom-btn" id="lightButton' + lightNum + '" onclick="brew.lightButton(' + lightNum + ')">Turn On</button></div></br>'
        //$('#lights').append(lightNameDiv[i]);
        $('#light-btns').append(lightBtnDiv[i]);
    }
});

/*'<div><input type="radio" id="lightBtn' + lightNum + '" name="lightBtn" class="btn-group blue" /><label for="lightBtn' + lightNum + '" onclick="brew.setLightState(' + lightNum + ', off)">Light ' + lightNum + ': ' + lightName[i] + '</label></div>'*/

/*'<div><br/><input type="checkbox"' + toggleCheck[i] + 'data-toggle="toggle" data-on="Light ' + lightNum + ': ' + lightName[i] + ' (' + lightState[i] + ')" data-off="Light ' + lightNum + ': ' + lightName[i] + ' (' + lightState[i] + ')" data-onstyle="success" data-offstyle="danger" data-size="large"><br/></div>'*/

/*'<div class="btn-group btn-toggle"><button class="btn btn-sm btn-default' + activeOn[i] + '">Light ' + lightNum + ': ' + lightName[i] + ' (' + lightState[i] + ')</button><button class="btn btn-sm btn-primary' + activeOff[i] + '">OFF</button></div>'*/

/*'<div class="form-text"></br><input type="checkbox"' + toggleCheck[i] + 'id="lightSwitch' + lightNum + '" class="switch-control"><label for="lightSwitch' + lightNum + '">Light ' + lightNum + ': ' + lightName[i] + ' (' + lightState[i] + ')</label></br></div>' */
