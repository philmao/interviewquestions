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

<<<<<<< HEAD
<<<<<<< HEAD
var database = firebase.database();
=======
=======
//set the database and then set a refernece to the databse
var database = firebase.database();
var usersRef = database.ref('/users');
var id;

var startTime;
var endTime;
var duration;
var profilePic;
var photo;
var score;
var hScore = 0;

>>>>>>> d6dac9b78ddf85c6105e39b0595cf8d887b10d2e
// START COPY OF LOGIC.JS FILE
// ******************************************************************
$(document).ready(function() {

    console.log(window.location.href);
    // call initial start screen
    if (window.location.href.match('index.html') != null) {
        console.log("index.html ready");

        initialScreen();
    };
    if (window.location.href.match('index2.html') != null) {
        console.log("index2.html ready");

        //function to display user's name, pic and logout button
        displayProfileInfo();
    };
    if (window.location.href.match('index3.html') != null) {
        console.log("index3.html ready");

        //function to display user's name, pic and logout button
        displayProfileInfo();
        startTime = moment();

        $("#page3").css({ visibility: "hidden"}); 
        // $("#page3").hide();
        interviewQuestions.getJsonData();

    };
});

// on mouseclick the new HTML screen is generated
$('body').on('click', '#signin', function(event) {

    // $('.mainArea').hide();
    generateSecondHTML();

});
$('body').on('click', '#st', function(event) {

    // $('.mainArea').hide();
    generateSecondHTML();

});   

// function for creation of initial start screen
function initialScreen() {
    startScreen = "<div class='container'><form class='form-signin'>"
    startScreen += "<div class='welcome'>Welcome!</div>"
    startScreen += "<h4 class='form-signin-heading'>Please sign in</h4>"
    startScreen += "<label for='inputEmail' class='sr-only'>Email address</label>"
    startScreen += "<input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus>"
    startScreen += "<label for='inputPassword' class='sr-only'>Password</label>"
    startScreen += "<input type='password' id='inputPassword' class='form-control' placeholder='Password'>"
    startScreen += "<div class='checkbox'><label><input type='checkbox' value='remember-me'> Remember me</label></div>"
    startScreen += "<button id='signin' class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button></form></div>";
    $('.mainArea').html(startScreen);

}

// function for creation of second page with subject options
function generateSecondHTML() {

    window.location.href = "index2.html";
}

$('body').on('click', '.selector', function(event) {

    console.log("click subject");
    if(interviewQuestions.processSubject()) {
        generateThirdHTML();
    }
<<<<<<< HEAD

    // $('.mainArea').hide();
>>>>>>> 4c288ac597cb5c326f5408155d41bacfd8eb025d

=======
});
>>>>>>> d6dac9b78ddf85c6105e39b0595cf8d887b10d2e


<<<<<<< HEAD
=======
    window.location.href = "index3.html";

}


var angleStart = -360;

// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li)
               .css({ transform: 'rotate('+now+'deg)' })
               .find('label')
                  .css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// show / hide the options
function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;
    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
    }
}

$('.selector button').click(function(e) {
    toggleOptions($(this).parent());
});

setTimeout(function() { toggleOptions('.selector'); }, 100);
>>>>>>> 4c288ac597cb5c326f5408155d41bacfd8eb025d

//function to calculate the highest score
function highScore(lScore) {
    console.log("Just came to highScore function");
    if(lScore > hScore)
        hScore = lScore;
    $("#hScore").html(hScore);
}

function displayProfileInfo() {
    photo = sessionStorage.getItem('Picture');
    id = sessionStorage.getItem('MemberId');
    firstName = sessionStorage.setItem('firstName');

    $("#name").append(firstName);
    $('img').attr("src", photo);
    $("#pic").append(profilePic); 
}

//Setup linkedIn login
//linkedIn functions, attaching auth eventhandler
function OnLinkedInFrameworkLoad() {
    IN.Event.on(IN, "auth", OnLinkedInAuth);
}

//retrieving user profile
function OnLinkedInAuth() {
    IN.API.Profile("me").result(getProfileData);
}

function getProfileData(profiles) {

    var member = profiles.values[0];
    id = member.id;
    console.log('set id', id);

    var firstName = member.firstName; 
    var lastName = member.lastName; 
    photo = member.pictureUrl; 
    var headline = member.headline; 
    
    //use information captured above
    console.log("First name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Picture", photo);
    console.log("Member Id:",member.id);
    sessionStorage.setItem('Picture',photo);
    sessionStorage.setItem('MemberId',id);
    sessionStorage.setItem('firstName', firstName);
    initRefreshScoreData();
}

//this function, gets user details based on member id
function initRefreshScoreData() {
    
    usersRef.orderByChild("memberId").equalTo(id).on("child_added", function(snapshot) {
    console.log(snapshot.val());

    //get the snapshot of user's score, duration and testDate based on member id
    var localScore = snapshot.val().score;
    var localDuration = snapshot.val().duration;
    var localTestDate = snapshot.val().testDate;

    //highest score
    highScore(localScore);
    console.log("Came back to orderByChild");

    // Add user's score data into the table
    $("#score-table > tbody").append("<tr><td>" + localScore + "</td><td>" + localDuration + "</td><td>" +
    localTestDate + "</td></tr>");
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
    alert("You have successfully logged out.");
    //init();
    globalInit();
}

//set all the global variables to zero
function globalInit() {
    //$("#name").val("");
    startTime = 0;
    endTime = 0;
    duration = 0;
    profilePic = "";

}


var questionArray = [];
var intervalId;

var myData;
var queryURL;
var subject;

var interviewQuestions = {

    indexNumber: 0,
    maxTime: 30,
    maxQuestions: 10,
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    timer: 0,

<<<<<<< HEAD
    initialScreen: function() {
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

    // Question var
    currentQuestion: 0,
    userAnswers: [],
    correctAnswers: [],
    maxQuestions: 10,
    reviewFlag: 0,

    },
    displaySubject: function() {
        newHTML = "<p>Please choose a subject:</p>";
        // newHTML += "<input type='button' class='btn btn-default btn-lg answerBtn' name='subject' id='html' value='HTML'>";
        // newHTML += "<input type='button' class='btn btn-default btn-lg answerBtn' name='subject' id='css' value='CSS'>";
        // newHTML += "<input type='button' class='btn btn-default btn-lg answerBtn' name='subject' id='javascript' value='Javascript'>";
        // newHTML += "<input type='button' class='btn btn-default btn-lg answerBtn' name='subject' id='jQuery' value='JQuery'>";
        newHTML += "<label><input type='radio' name='subject' id='html' value='html.json'>HTML</label><br>";
        newHTML += "<label><input type='radio' name='subject' id='css' value='css.json'>CSS</label><br>";
        newHTML += "<label><input type='radio' name='subject' id='javascript' value='javascript.json'>Javascript</label><br>";
        newHTML += "<label><input type='radio' name='subject' id='jQuery' value='jquery.json'>JQuery</label><br>";
        newHTML += "<button id='submitSubject' class='btn btn-lg btn-primary btn-block' type='submit'>Submit</button></form></div>";
        $(".mainArea").html(newHTML);

    },
    processSubject: function() {



        var name = $('input[type="checkbox"]:checked').next("label").html();
        var temp = $('input[type="checkbox"]:checked').val();

        console.log(name);
        console.log(temp);

        if(typeof temp == 'undefined') {
            console.log("temp is undefined");
            return false;
        }

        var url = './assets/json/' + temp;
        sessionStorage.setItem('subject', name);
        sessionStorage.setItem('queryURL', url);
        console.log(url);

        return true;
    },
    getJsonData: function() {

        subject = sessionStorage.getItem('subject');
        queryURL = sessionStorage.getItem('queryURL');

        console.log(subject);
        console.log(queryURL);

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function(result) {
                startTime = moment();
                myData = result.interview;


                userAnswers = [];
                correctAnswers = [];
                for(var i = 0; i < myData.length; i++) {
                    userAnswers[i] = 0;
                }

                interviewQuestions.displayQuestion(interviewQuestions.currentQuestion);
            },
            error: function(result){
                console.log("Unable to get data");
            }
                
        });

    },
    displayQuestion: function(questionNum) {
        // $(".mainArea2").empty();
        // console.log(myData);
        // console.log(questionNum);
        // var questionLine = $("<p>");
        // questionLine.text(myData[questionNum].question);
        // $(".mainArea2").append(questionLine);
        // console.log(myData[questionNum].question);

        // $(".mainArea2").append("<div class='btn-group-vertical' role='question'>");

        // for(var i = 0; i < myData[questionNum].choices.length; i++) {


        //     var answerChoice = "<button type='button' class='btn btn-default btn-lg addressBtn' ";
        //     answerChoice += "value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
        //     answerChoice += " name='question" + parseInt(questionNum) + "'>";
        //     answerChoice += myData[questionNum].choices[i];
        //     answerChoice += "</button>";
        //     $(".mainArea2").append(answerChoice);
        //     console.log(answerChoice);
        //     console.log(myData[questionNum].choices[i]);
        // }
        // $(".mainArea2").append("</div>");

        // if(questionNum === "0") {
        //     $(".mainArea2").append("<button id='prevButton' class='btn btn-sm btn-primary btn-block'>Prev</button>");
        // }
        // if(questionNum === myData.length) {
        //     $(".mainArea2").append("<button id='nextButton' class='btn btn-sm btn-primary btn-block'>Next</button>");
        // }

        $(".mainArea").empty();
        // console.log(myData);
        // console.log(questionNum);

        var titleLine = $("<h2>");
        titleLine.text(subject + " Question " + parseInt(questionNum + 1) +" of " + myData.length);
        $(".mainArea").append(titleLine);
        // console.log(titleLine);


        var questionLine = $("<p>");
        questionLine.text(myData[questionNum].question);
        $(".mainArea").append(questionLine);
        // console.log(myData[questionNum].question);

        var answerChoice = "<div class='btn-group-vertical' role='question'>";

        for(var i = 0; i < myData[questionNum].choices.length; i++) {

            answerChoice += "<button type='button' class='btn btn-default btn-lg answerBtn'";
            answerChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
            answerChoice += " id=" + parseInt(i + 1);
            answerChoice += " name='question" + parseInt(questionNum) + "'>";
            answerChoice += myData[questionNum].choices[i];
            answerChoice += "</button>";
            // console.log(answerChoice);
            // console.log(myData[questionNum].choices[i]);

        }
        $(".mainArea").append(answerChoice);

        if(userAnswers[questionNum] != 0) {
            switch (parseInt(userAnswers[questionNum])) {
                case 1: 
                    $('#1').addClass('active');
                    break;
                case 2:
                    $('#2').addClass('active');
                    break;
                case 3:
                    $('#3').addClass('active');
                    break;
                case 4: 
                    $('#4').addClass('active');
                    break;
                default:
            }

        }
        correctAnswers[questionNum] = myData[questionNum].correct;

        $(".buttonArea").empty();
        if(questionNum > 0) {
            $(".buttonArea").append("<button id='prevButton' class='btn btn-sm btn-primary prevBtn'>Prev</button>");
        }
        if(questionNum < (myData.length - 1)) {
            $(".buttonArea").append("<button id='nextButton' class='btn btn-sm btn-primary nextBtn'>Next</button>");
        }
        else {
            $(".buttonArea").append("<button id='doneButton' class='btn btn-sm btn-primary doneBtn'>Done</button>");
        }

        // $(".mainArea").empty();

        // for(var j = 0; j < result.interview.length; j++) {

        //     var questionLine = $("<p>");
        //     questionLine.text(result.interview[j].question);
        //     $(".mainArea").append(questionLine);
        //     console.log(result.interview[j].question);

        //     for(var i = 0; i < result.interview[j].choices.length; i++) {

        //         var answerChoice = $("<input>");
        //         answerChoice.attr("value", i + 1);  // value '0' is unanswered
        //         answerChoice.attr("type","radio");
        //         answerChoice.attr("name","question" + j);
        //         answerChoice.attr("class", "radioButtons");
        //         $(".mainArea").append(answerChoice);
        //         $(".mainArea").append("<b> " + result.interview[j].choices[i] + "</b><br>");

        //         console.log(result.interview[j].choices[i]);
        //     }
        // }
        // $(".mainArea").append("<button id='doneButton' class='btn btn-lg btn-primary btn-block'>Done</button>");

    },
    reviewQuestion: function(questionNum) {

        $("#page3").css({ visibility: "hidden"}); 

        $(".mainArea").empty();
        console.log(myData);
        // console.log(questionNum);

        var titleLine = $("<h2>");
        titleLine.text(subject + " Question " + parseInt(questionNum + 1) +" of " + myData.length);
        $(".mainArea").append(titleLine);
        // console.log(titleLine);

        var questionLine = $("<p>");
        questionLine.text(myData[questionNum].question);
        $(".mainArea").append(questionLine);
        // console.log(myData[questionNum].question);

        var answerChoice = "<div class='btn-group-vertical' role='question'>";

        for(var i = 0; i < myData[questionNum].choices.length; i++) {

            answerChoice += "<button type='button' class='btn btn-default btn-lg reviewBtn'";
            answerChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
            answerChoice += " id=" + parseInt(i + 1);
            answerChoice += " name='question" + parseInt(questionNum) + "'>";
            answerChoice += myData[questionNum].choices[i];
            answerChoice += "</button>";
            // console.log(answerChoice);
            // console.log(myData[questionNum].choices[i]);

        }
        $(".mainArea").append(answerChoice);

        if(userAnswers[questionNum] != 0) {
            switch (parseInt(userAnswers[questionNum])) {
                case 1: 
                    $('#1').addClass('active');
                    break;
                case 2:
                    $('#2').addClass('active');
                    break;
                case 3:
                    $('#3').addClass('active');
                    break;
                case 4: 
                    $('#4').addClass('active');
                    break;
                default:
            }
        }
        // correctAnswers[questionNum] = myData[questionNum].correct;

        var correctChoice = "<p>Correct answer:</p>";
        correctChoice += "<button type='button' class='btn btn-default btn-lg reviewBtn'";
        // correctChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
        // correctChoice += " id=" + parseInt(i + 1);
        correctChoice += " name='question" + parseInt(questionNum) + "'>";
        correctChoice += myData[questionNum].choices[correctAnswers[questionNum]];
        correctChoice += "</button>";
        $(".mainArea").append(correctChoice);

        $(".buttonArea").empty();
        if(questionNum > 0) {
            $(".buttonArea").append("<button id='prevButton' class='btn btn-sm btn-primary prevBtn'>Prev</button>");
        }
        if(questionNum < (myData.length - 1)) {
            $(".buttonArea").append("<button id='nextButton' class='btn btn-sm btn-primary nextBtn'>Next</button>");
        }
        else {
            $(".buttonArea").append("<button id='doneButton' class='btn btn-sm btn-primary doneBtn'>Done</button>");
        }

    },
    displayResults: function() {

        // clearInterval(intervalId);
        // $("#timer").text("");
        console.log(userAnswers);
        console.log(correctAnswers);
        if(!interviewQuestions.reviewFlag) {

            for(i = 0; i < myData.length; i++) {

                // var name = "question" + i;
                // var temp = $('input[name="' + name + '"]:checked').val();
                // console.log(temp);
                // console.log(myData[i].correct);

                // if(isNaN(temp)) {
                //     interviewQuestions.unansweredCount++;
                // }
                // else if (temp === myData[i].correct) {
                //     interviewQuestions.correctCount++;
                // }
                // else {
                //     interviewQuestions.incorrectCount++;
                // }

                if(parseInt(userAnswers[i]) === 0) {
                    interviewQuestions.unansweredCount++;
                }
                else if(parseInt(userAnswers[i]) === parseInt(correctAnswers[i])) {
                    interviewQuestions.correctCount++;
                }
                else {
                    interviewQuestions.incorrectCount++;
                }
            }
        }


      //      function initMap() {
      //   var uluru = {lat: -25.363, lng: 131.044};
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 4,
      //     center: uluru
      //   });
      //   var marker = new google.maps.Marker({
      //     position: uluru,
      //     map: map
      //   });
      // };

        $(".mainArea").empty();
        $(".buttonArea").empty();
        console.log("done");

        $(".mainArea").append("<h3>All Done!</h3>");
        $(".mainArea").append("<h3>Correct Answers: " + interviewQuestions.correctCount + "</h3>");
        $(".mainArea").append("<h3>Incorrect Answers: " + interviewQuestions.incorrectCount + "</h3>");
        $(".mainArea").append("<h3>Unanswered: " + interviewQuestions.unansweredCount + "</h3>");
        // $(".mainArea").append("<h3> Your highest score so far :<span id ='hScore'></span></h3>");
        $(".mainArea").append("<button id='review' class='btn btn-lg btn-primary btn-block'>Review answers</button>");
        $("#page3").css({ visibility: "visible"}); 


    }
    // decrement: function() {

    //     timer -= 1;

    //     $("#timer").text("Time Remaining:  " + timer + " secs");

    //     if (timer === 0) {
    //       clearInterval(intervalId);
    //       interviewQuestions.displayResults();
    //     }
    // }
}

$(document).ready(function() {

    // call initial start screen
    interviewQuestions.initialScreen ();
    initMap() ;

});




$("body").on("click", "#doneButton", function(event){
    endTime = moment();
    event.preventDefault();
    sessionStorage.setItem("queryURL", "");
    interviewQuestions.displayResults();


    if(!interviewQuestions.reviewFlag) {

        var temp = endTime.diff(startTime);
        console.log("Temp time: ",temp);
        duration = moment(temp).format('mm:ss');

        console.log("Duration is: ", duration);


        //creating an object to hold the data, which will be sent to firebase 
        var data = {
            name: $("#name").val(),
            memberId: id,
            score: interviewQuestions.correctCount,
            duration: duration,
            testDate: moment().format('dddd, MMMM Do YYYY, hh:mm:ss a')
        }
        
        console.log("Data ", data);
        usersRef.push(data);
    }


}); 

$("body").on("click", "#review", function(event){

    event.preventDefault();
    interviewQuestions.currentQuestion = 0;
    interviewQuestions.reviewFlag = 1;
    interviewQuestions.reviewQuestion(interviewQuestions.currentQuestion);


}); 



$("body").on("click", "#submitSubject", function(event){

    event.preventDefault();

    interviewQuestions.processSubject(event); 

$("body").on("click", "#restart", function(event){


    event.preventDefault();

    interviewQuestions.unansweredCount = 0;
    interviewQuestions.correctCount = 0;
    interviewQuestions.incorrectCount = 0;
    interviewQuestions.reviewFlag = 0;

    generateSecondHTML();



}); 

$("body").on("click", "#doneButton", function(event){


    $('.btn-group-vertical > .btn').removeClass('active');
    $(this).addClass('active');
    // console.log("subject button selected");


    interviewQuestions.displayResults();


$("body").on("click", ".answerBtn", function(event){

    $('.btn-group-vertical > .answerBtn').removeClass('active');
    $(this).addClass('active');
    userAnswers[interviewQuestions.currentQuestion] = $(this).val();
    // console.log(userAnswers);
    // console.log("answer button selected");



<<<<<<< HEAD
var latitude;
var longitude;


// Googe Map API with location finding code

function initMap() {
       

$.getJSON("http://freegeoip.net/json/", function(data) {
    var country_code = data.country_code;
    var country = data.country_name;
    var ip = data.ip;
    var time_zone = data.time_zone;
    var latitude = data.latitude;
     var longitude = data.longitude;
     var city= data.city;


         var uluru = {lat: latitude, lng: longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
   

});



$("body").on("click", ".prevBtn", function(event){
    // console.log(userAnswers);
    // console.log(correctAnswers);
    // console.log(interviewQuestions.reviewFlag);

    if(interviewQuestions.currentQuestion > 0) {
        interviewQuestions.currentQuestion--;
    }
    else {
        interviewQuestions.currentQuestion = 0;
    }
    if(interviewQuestions.reviewFlag) {
        interviewQuestions.reviewQuestion(interviewQuestions.currentQuestion);
    }
    else {
        interviewQuestions.displayQuestion(interviewQuestions.currentQuestion);
    }
    // console.log("prev button pressed");

});

$("body").on("click", ".nextBtn", function(event){
    // console.log(userAnswers);
    // console.log(correctAnswers);
    // console.log(interviewQuestions.reviewFlag);

    if(interviewQuestions.currentQuestion <= myData.length) {
        interviewQuestions.currentQuestion++;
    }
    else {
        interviewQuestions.currentQuestion = myData.length;
    }
    if(interviewQuestions.reviewFlag) {
        interviewQuestions.reviewQuestion(interviewQuestions.currentQuestion);
    }
    else {
        interviewQuestions.displayQuestion(interviewQuestions.currentQuestion);
    }
    // console.log("next button pressed");



 }

