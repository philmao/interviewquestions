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
	url: 'assets/json/html.json',
	type: 'get',
	error: function(data){

	},
	success: function(data){
		data = jQuery.parseJSON(data);
		//do something with data
		console.log(data);          
	}
});
