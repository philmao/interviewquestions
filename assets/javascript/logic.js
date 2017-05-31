// Initialize Firebase
var config = {
    apiKey: "AIzaSyD15_MQCpSIeLmOaujqowZkF-djMIi0UlY",
    authDomain: "interviewquestions-ca991.firebaseapp.com",
    databaseURL: "https://interviewquestions-ca991.firebaseio.com",
    projectId: "interviewquestions-ca991",
    storageBucket: "interviewquestions-ca991.appspot.com",
    messagingSenderId: "139540148275"
};
firebase.initializeApp(config);

var database = firebase.database();


//Setup linkedIn login
    var liLogin = function() { // Setup an event listener to make an API call once auth is complete
        IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
        IN.Event.on(IN, 'auth', getProfileData);
    }

    var getProfileData = function() { // Use the API call wrapper to request the member's basic profile data
        IN.API.Profile("me").fields("id,firstName,lastName,email-address,picture-urls::(original),public-profile-url,location:(name)").result(function (me) {
            var profile = me.values[0];
            var id = profile.id;
            var firstName = profile.firstName;
            var lastName = profile.lastName;
            var emailAddress = profile.emailAddress;
            var pictureUrl = profile.pictureUrls.values[0];
            var profileUrl = profile.publicProfileUrl;
            var country = profile.location.name;

            /*var user = {
              emailId: emailAddress,
              profile: {
                fName: firstName,
                lName: lastName,
                pUrl: profileUrl
              }
            };*/

        });
    }
    // Handle the successful return from the API call
    function onSuccess(data) {
        console.log(data);
    }

    // Handle an error response from the API call
    function onError(error) {
        console.log(error);
    }

    //function to logout from the session
    var liLogout = function() {
        IN.User.logout(callbackFunction);
        }

    function callbackFunction() {
        alert("You have successfully logged out.")
        }

$(document).ready(function() {


// function created for initial start screen

function initialScreen() {
    startScreen = "<div class='container'><form class='form-signin'><h2 class='form-signin-heading'>Please sign in</h2><label for='inputEmail' class='sr-only'>Email address</label><input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus><label for='inputPassword' class='sr-only'>Password</label><input type='password' id='inputPassword' class='form-control' placeholder='Password'><div class='checkbox'><label><input type='checkbox' value='remember-me'> Remember me</label></div><button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button></form></div>";
    $(".mainArea").html(startScreen);

// original text deleted from above


}

// call initial start screen

initialScreen ();

// on mouseclick the new HTML screen is generated

$("body").on("click", ".btn-block", function(event){
    generateHTML();
    // timerWrapper();


}); //closing onclick start-button event after generating new HTML page


function generateHTML() {
    newHTML = "<p>hi</p>";
    $(".mainArea").html(newHTML);

}});


$.ajax({
    type: "GET",
    url: "./assets/json/html.json",
    dataType: "json",
    success: function(result) {
        console.log(result);
    }

});


// $.getJSON("html.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });