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


var questionArray = [];
var intervalId;

var questions = [{
    question: "Who was the second US president?",
    choices: [ "John Adams", "George Washington", "John Quincy Adams", "Thomas Jefferson" ],
    correctAnswer: 1,
}, {
    question: "In the 1951 science fiction movie, The Day The Earth Stood Still, what was the name of the robot?",
    choices: [ "Gort", "Klaatu", "Robby" ],
    correctAnswer: 2,
}, {
    question: "In the Dirty Harry movies starring Clint Eastwood as Dirty Harry, what was Harry's last name?",
    choices: [ "Callahan", "Flint", "Harrigan", "Steele" ],
    correctAnswer: 1,
}, {
    question: "What is the state capital of California?",
    choices: [ "Sacramento", "Reno", "Portland", "Fresno" ],
    correctAnswer: 1,
}, {
    question: "Which state has the most population?",
    choices: [ "Texas", "New York", "California", "Florida" ],
    correctAnswer: 3,
}];

var myData;

var interviewQuestions = {

    indexNumber: 0,
    maxTime: 30,
    maxQuestions: 10,
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    timer: 0,
    state: 0,


    doneGame: function() {
        $("#doneButton").hide();

        // clearInterval(intervalId);
        // $("#timer").text("");

        for(i = 0; i < questions.length; i++) {

            var name = "question" + i;
            var temp = parseInt($('input[name="' + name + '"]:checked').val());

            if(isNaN(temp)) {
                interviewQuestions.unansweredCount++;
            }
            else if (temp === questions[i].correctAnswer) {
                interviewQuestions.correctCount++;
            }
            else {
                interviewQuestions.incorrectCount++;
            }
        }

        $("#mainArea").empty();
        console.log("done");

        $("#mainArea").append("<h2>All Done!</h2>");
        $("#mainArea").append("<h2>Correct Answers: " + interviewQuestions.correctCount + "</h2>");
        $("#mainArea").append("<h2>Incorrect Answers: " + interviewQuestions.incorrectCount + "</h2>");
        $("#mainArea").append("<h2>Unanswered: " + interviewQuestions.unansweredCount + "</h2>");


    },
    // decrement: function() {

    //     timer -= 1;

    //     $("#timer").text("Time Remaining:  " + timer + " secs");

    //     if (timer === 0) {
    //       clearInterval(intervalId);
    //       interviewQuestions.doneGame();
    //     }
    // }
}

// function created for initial start screen
function initialScreen() {
    startScreen = "<div class='container'><form class='form-signin'>";
    startScreen += "<h2 class='form-signin-heading'>Please sign in</h2>";
    startScreen += "<label for='firstName' class='sr-only'>First Name</label>";
    startScreen += "<input type='email' id='inputEmail' class='form-control' placeholder='First Name' required autofocus>";
    startScreen += "<label for='lastName' class='sr-only'>Last Name</label>";
    startScreen += "<input type='email' id='inputEmail' class='form-control' placeholder='Last Name' required autofocus>";
    startScreen += "<label for='inputEmail' class='sr-only'>Email address</label>";
    startScreen += "<input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus>";
    startScreen += "<label for='inputPassword' class='sr-only'>Password</label>";
    startScreen += "<input type='password' id='inputPassword' class='form-control' placeholder='Password'>";
    startScreen += "<div class='checkbox'>";
    startScreen += "<label><input type='checkbox' value='remember-me'> Remember me</label>";
    startScreen += "</div>";
    startScreen += "<button id='signin' class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button></form></div>";
    // startScreen += "<script type='in/Login'></script>";
    $(".mainArea").html(startScreen);

// original text deleted from above


}

function generateHTML() {
    newHTML = "<p>Please choose a subject:</p>";
    newHTML += "<label><input type='radio' name='subject' id='html' value='html.json'>HTML</label><br>";
    newHTML += "<label><input type='radio' name='subject' id='css' value='css.json'>CSS</label><br>";
    newHTML += "<label><input type='radio' name='subject' id='javascript' value='javascript.json'>Javascript</label><br>";
    newHTML += "<label><input type='radio' name='subject' id='jQuery' value='jquery.json'>JQuery</label><br>";
    newHTML += "<button id='submitSubject' class='btn btn-lg btn-primary btn-block' type='submit'>Submit</button></form></div>";
    $(".mainArea").html(newHTML);

}

$(document).ready(function() {

    // call initial start screen
    initialScreen ();

});

function processSubject(event) {

    var temp = $('input[name="subject"]:checked').val();
    console.log(temp);

    var queryURL = "./assets/json/" + temp;
    console.log(queryURL);

    $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "json",
        success: function(result) {
            myData = result.interview;

            $(".mainArea").empty();

            for(var j = 0; j < result.interview.length; j++) {

                var questionLine = $("<p>");
                questionLine.text(result.interview[j].question);
                $(".mainArea").append(questionLine);
                console.log(result.interview[j].question);

                for(var i = 0; i < result.interview[j].choices.length; i++) {
                    var answerChoice = $("<input>");
                    answerChoice.attr("value", i + 1);  // value '0' is unanswered
                    answerChoice.attr("type","radio");
                    answerChoice.attr("name","question" + j);
                    answerChoice.attr("class", "radioButtons");
                    $(".mainArea").append(answerChoice);
                    $(".mainArea").append("<b>" + result.interview[j].choices[i] + "</b><br>");
                    console.log(result.interview[j].choices[i]);
                }
            }
        },
        error: function(result){
            console.log("Unable to get data");
        }

    });    
}

$("body").on("click", "#signin", function(event){

    event.preventDefault();

    generateHTML();


}); //closing onclick start-button event after generating new HTML page


$("body").on("click", "#submitSubject", function(event){

    event.preventDefault();

    processSubject(event); 


}); //closing onclick start-button event after generating new HTML page

