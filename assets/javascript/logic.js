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

var interviewQuestions = {

    indexNumber: 0,
    maxTime: 30,
    maxQuestions: 10,
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    timer: 0,
    state: 0,

    startGame: function() {

        $("#mainArea").empty();
        console.log("started");

        // timer = interviewQuestions.maxTime;
        // intervalId = setInterval(interviewQuestions.decrement, 1000);

        // $("#timer").text("Time Remaining: " + interviewQuestions.maxTime + " secs");

        for(var j = 0; j < questions.length; j++) {

            var questionLine = $("<p>");
            questionLine.text(questions[j].question);
            $("#mainArea").append(questionLine);
            console.log(questions[j].question);

            for(var i = 0; i < questions[j].choices.length; i++) {
                var answerChoice = $("<input>");
                answerChoice.attr("value", i + 1);  // value '0' is unanswered
                answerChoice.attr("type","radio");
                answerChoice.attr("name","question" + j);
                answerChoice.attr("class", "radioButtons");
                $("#mainArea").append(answerChoice);
                $("#mainArea").append("<b>" + questions[j].choices[i] + "</b><br>");
                console.log(questions[j].choices[i]);
            }
        }
        $("#mainArea").append("<button id='doneButton'>Done</button>");

    },
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

    $.ajax({
    url: 'assets/json/html.json',
    type: 'get',
    error: function(data){
        console.log("Unable to get data");
    },
    success: function(data){
        var myData = jQuery.parseJSON(data);
        //do something with data
        console.log(data);   
        console.log(myData);          

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
    interviewQuestions.startGame();


}); //closing onclick start-button event after generating new HTML page


