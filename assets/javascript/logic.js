// Initialize Firebase
// ******************************************************************
var config = {
    apiKey: "AIzaSyD15_MQCpSIeLmOaujqowZkF-djMIi0UlY",
    authDomain: "interviewquestions-ca991.firebaseapp.com",
    databaseURL: "https://interviewquestions-ca991.firebaseio.com",
    projectId: "interviewquestions-ca991",
    storageBucket: "interviewquestions-ca991.appspot.com",
    messagingSenderId: "139540148275"
};
firebase.initializeApp(config);


// Firebase: set the database and then set a refernece to the databse
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

// Display pages
// ******************************************************************

var viewTestResults = 0; 
sessionStorage.setItem("viewTestResults", viewTestResults);
console.log("viewTestResults=0");

$(document).ready(function() {

    // console.log(window.location.href);

    // Call initial start screen
    if (window.location.href.match('index.html') != null) {
        console.log("index.html ready");

        initialScreen();
    };

    if (window.location.href.match('index2.html') != null) {
        console.log("index2.html ready");

        // LinkedIn: function to display user's name, pic and logout button
        displayProfileInfo();
    };

    if (window.location.href.match('index3.html') != null) {
        console.log("index3.html ready");

        viewTestResults = sessionStorage.getItem("viewTestResults");
        console.log("viewTestResults: ", viewTestResults);

        // LinkedIn: Function to display user's name, pic and logout button
        displayProfileInfo();

        if(parseInt(viewTestResults)) {
            // Hide test results
            $("#page3").css({ visibility: "visible"}); 
        }
        else {
            startTime = moment();
            $("#page3").css({ visibility: "hidden"}); 
        }

        // Load JSON data
        interviewQuestions.getJsonData();

    };
});

// Display: Onclick signin button to the second page
$('body').on('click', '#signin', function(event) {

    generateSecondHTML();
    console.log("2nd page");

});

// Display: Onclick start button to second page 
/*$('body').on('click', '#st', function(event) {

    generateSecondHTML();

}); */ 

// Display: Function for creation of initial start screen
function initialScreen() {
    var startScreen = "<div class='container1'><form class='form-signin'>";
    startScreen += "<div class='welcome'>Welcome!</div>";
    startScreen += "<h6 class='form-signin-heading'>Please sign in with your LinkedIn account to continue</h6>";
    //startScreen += "<label for='inputEmail' class='sr-only'>Email address</label>";
    //startScreen += "<input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus>";
    //startScreen += "<label for='inputPassword' class='sr-only'>Password</label>";
    //startScreen += "<input type='password' id='inputPassword' class='form-control' placeholder='Password'>";
    //startScreen += "<div class='checkbox'><label><input type='checkbox' value='remember-me'> Remember me</label></div>";
    if(location.hostname == "") {
        startScreen += "<button id='signin' class='btn btn-lg btn-primary btn-block' type='button'>Sign in</button>";
    }
    console.log(location.hostname);
    startScreen += "<div id='center'><script type='in/Login'></script></div>";
    startScreen += "</form></div>";
    $('.mainArea').html(startScreen);

}

// Display: Function for creation of second page with subject options
function generateSecondHTML() {

    window.location.href = "index2.html";
}

// Display: Onclick second page to third page
$('body').on('click', '.selector', function(event) {

    console.log("click subject");
    if(interviewQuestions.processSubject()) {
        generateThirdHTML();
    }

});

// Display: Function for creation of third page with questions/results
function generateThirdHTML() {

    window.location.href = "index3.html";

}

// Functions for Subject selector (index2.html)
// ******************************************************************

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
    firstName = sessionStorage.getItem('firstName');
    city = sessionStorage.getItem('city');

    $("#name").text(firstName);
    $('#pic').attr("src", photo);
    // $("#pic").append(profilePic); 
}

// Functions for LinkedIn login
// ******************************************************************

// LinkedIn: Function to attach auth eventhandler
function OnLinkedInFrameworkLoad() {
    IN.Event.on(IN, "auth", OnLinkedInAuth);
    $('a[id*=li_ui_li_gen_]').css({marginBottom:'20px'})
   .html('<img src="assets/images/linkedin_signin_large.png" height="41" width="200" border="0" />');
}

// LinkedIn: Retrieving user profile
function OnLinkedInAuth() {
    IN.API.Profile("me").result(getProfileData);
    
}

// LinkedIn: 
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
    console.log("Inside getProfileData");
    //initRefreshScoreData();
    generateSecondHTML();
}

// LinkedIn: Function gets user details based on member id
function initRefreshScoreData() {
    
    usersRef.orderByChild("memberId").equalTo(id).on("child_added", function(snapshot) {
    console.log(snapshot.val());

    //get the snapshot of user's score, duration and testDate based on member id
    var localScore = snapshot.val().score;
    var localDuration = snapshot.val().duration;
    var localTestDate = snapshot.val().testDate;
    var localTestLocation = snapshot.val().city;

    //highest score
    highScore(localScore);
    console.log("Came back to orderByChild");

    // Add user's score data into the table
    $("#score-table > tbody").append("<tr><td>" + localScore + "</td><td>" + localDuration + "</td><td>" +
    localTestDate + "</td><td>" + localTestLocation + "</td></tr>");
    });
}
 

// LinkedIn: Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// LinkedIn: Function to logout from the session
var liLogout = function() {
    IN.User.logout(logoutCallback);
}

// LinkedIn: callback function
function logoutCallback() {
    alert("You have successfully logged out.");
    window.location.href = "index.html";
}

// LinkedIn: Set all the global variables to zero
function globalInit() {

    startTime = 0;
    endTime = 0;
    duration = 0;
    profilePic = "";

}

// Google Map Function
// ******************************************************************

var latitude;
var longitude;
var city;
// Google Map API with location finding code
function initMap() {
       
    $.getJSON("https://freegeoip.net/json/", function(data) {
        var country_code = data.country_code;
        var country = data.country_name;
        var ip = data.ip;
        var time_zone = data.time_zone;
         latitude = data.latitude;
         longitude = data.longitude;
         city= data.city;
        sessionStorage.setItem("city", city);
        console.log(city);
        var uluru = {lat: latitude, lng: longitude};
        // var map = new google.maps.Map(document.getElementById('map'), {
        //     zoom: 4,
        //     center: uluru
        // });
        // var marker = new google.maps.Marker({
        //     position: uluru,
        //     map: map
        // });
    })
};

initMap();


// Class for Interview Questions
// ******************************************************************
var questionArray = [];
var intervalId;

var myData;
var queryURL;
var subject;

var interviewQuestions = {

    // Results
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,

    // Timer initialization
    time: 0,
    maxTime: 30,

    // Question var
    currentQuestion: 0,
    userAnswers: [],
    correctAnswers: [],
    maxQuestions: 10,
    reviewFlag: 0,

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
                for(var i = 0; i < interviewQuestions.maxQuestions; i++) {
                    userAnswers[i] = 0;
                }
                interviewQuestions.startTimer();
                interviewQuestions.displayQuestion(interviewQuestions.currentQuestion);
            },
            error: function(result){
                console.log("Unable to get data");
            }
                
        });

    },
    displayQuestion: function(questionNum) {

        $(".mainArea").empty();
        // console.log(myData);
        // console.log(questionNum);

        var titleLine = $("<h2>");
        titleLine.text(subject + ": Question " + parseInt(questionNum + 1) +" of " + interviewQuestions.maxQuestions);
        $(".mainArea").append(titleLine);
        // console.log(titleLine);

        var timerLine = $("<div id='timer'>");
        timerLine.text("Time Spent: " + interviewQuestions.timeConverter(interviewQuestions.time));
        $(".mainArea").append(timerLine);

        var answerChoice = "<div id='stack' col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2>";
        answerChoice += "<div class='card _1'><div class='front'></div></div>";
        answerChoice += "<div class='card _2'><div class='front'></div></div>";
        answerChoice += "<div class='card _3'><div class='front'></div></div>";
        answerChoice += "<div class='card _4'><div class='front'></div></div>";

        answerChoice += "<div class='card topCard'><div class='front'>";
        answerChoice += "<p id='questionStyle'>" + myData[questionNum].question + "</p>";

        // console.log(myData[questionNum].question);

        answerChoice += "<div class='btn-group-vertical' role='question'>";

        for(var i = 0; i < myData[questionNum].choices.length; i++) {


            answerChoice += "<fieldset><input type='radio' class='btn btn-default btn-lg answerBtn'";
            answerChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
            answerChoice += " id=" + parseInt(i + 1);
            answerChoice += " name='question" + parseInt(questionNum) + "'>";
            answerChoice += "     " + myData[questionNum].choices[i];
            answerChoice += "</fieldset>";

            // answerChoice += "<button type='button' class='btn btn-default btn-lg answerBtn'";
            // answerChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
            // answerChoice += " id=" + parseInt(i + 1);
            // answerChoice += " name='question" + parseInt(questionNum) + "'>";
            // answerChoice += myData[questionNum].choices[i];
            // answerChoice += "</button>";
            // console.log(answerChoice);
            // console.log(myData[questionNum].choices[i]);

        }
        answerChoice += "</div></div></div>";
        $(".mainArea").append(answerChoice);

        // if(userAnswers[questionNum] != 0) {
        //     switch (parseInt(userAnswers[questionNum])) {
        //         case 1: 
        //             $('#1').addClass('active');
        //             break;
        //         case 2:
        //             $('#2').addClass('active');
        //             break;
        //         case 3:
        //             $('#3').addClass('active');
        //             break;
        //         case 4: 
        //             $('#4').addClass('active');
        //             break;
        //         default:
        //     }
        // }
        correctAnswers[questionNum] = myData[questionNum].correct;

        $(".buttonArea").empty();
        if(questionNum > 0) {
            $(".buttonArea").append("<button id='prevButton' class='btn btn-sm btn-primary prevBtn'>Prev</button>");
        }
        if(questionNum < (interviewQuestions.maxQuestions - 1)) {
            $(".buttonArea").append("<button id='nextButton' class='btn btn-sm btn-primary nextBtn'>Next</button>");
        }
        else {
            $(".buttonArea").append("<button id='doneButton' class='btn btn-sm btn-primary doneBtn'>Done</button>");
        }

    },
    reviewQuestion: function(questionNum) {

        $("#page3").css({ visibility: "hidden"}); 

        $(".mainArea").empty();
        console.log(myData);
        console.log(questionNum);

        var titleLine = $("<h2>");
        titleLine.text(subject + " Question " + parseInt(questionNum + 1) +" of " + interviewQuestions.maxQuestions);
        $(".mainArea").append(titleLine);
        // console.log(titleLine);

        var answerChoice = "<div id='stack' col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2>";
        answerChoice += "<div class='card _1'><div class='front'></div></div>";
        answerChoice += "<div class='card _2'><div class='front'></div></div>";
        answerChoice += "<div class='card _3'><div class='front'></div></div>";
        answerChoice += "<div class='card _4'><div class='front'></div></div>";

        answerChoice += "<div class='card topCard'><div class='front'>";


        answerChoice += "<p><span>" + myData[questionNum].question + "</span></p>";
        // console.log(myData[questionNum].question);

        answerChoice += "<div class='btn-group-vertical' role='question'>";

        for(var i = 0; i < myData[questionNum].choices.length; i++) {

            answerChoice += "<fieldset><input type='radio' class='btn btn-default btn-lg answerBtn'";
            answerChoice += " value='" + parseInt(i + 1) + "'";  // value '0' is unanswered
            answerChoice += " id=" + parseInt(i + 1);
            answerChoice += " name='question" + parseInt(questionNum) + "'>";
            answerChoice += "     " + myData[questionNum].choices[i];
            answerChoice += "</fieldset>";

        }
        if(userAnswers[questionNum] === correctAnswers[questionNum]) {
            answerChoice += "<p><span id='comment'>Correct!</span></p>";
        }
        else {
           answerChoice += "<p><span id='comment'>Incorrect! The answer is:</span></p>";
           // answerChoice += "<button type='button' class='btn btn-default btn-lg reviewBtn'";
           // answerChoice += " name='question" + parseInt(questionNum) + "'>";
           answerChoice += "<fieldset>";
           answerChoice += myData[questionNum].choices[correctAnswers[questionNum] - 1];
           // answerChoice += "</button>"; 
           answerChoice += "</fieldset>"
        }

        answerChoice += "</div></div></div>";
        $(".mainArea").append(answerChoice);
        // console.log(questionNum, correctAnswers[questionNum]);

        if(userAnswers[questionNum] != 0) {
            switch (parseInt(userAnswers[questionNum])) {
                case 1: 
                    $('#1').prop( "checked", true );
                    break;
                case 2:
                    $('#2').prop( "checked", true );
                    break;
                case 3:
                    $('#3').prop( "checked", true );
                    break;
                case 4: 
                    $('#4').prop( "checked", true );
                    break;
                default:
            }
        }

        $(".buttonArea").empty();
        if(questionNum > 0) {
            $(".buttonArea").append("<button id='prevButton' class='btn btn-sm btn-primary prevBtn'>Prev</button>");
        }
        if(questionNum < (interviewQuestions.maxQuestions - 1)) {
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

            for(i = 0; i < interviewQuestions.maxQuestions; i++) {

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

        $(".mainArea").empty();
        $(".buttonArea").empty();
        console.log("done");

        $(".mainArea").append("<h3>All Done!</h3>");
        $(".mainArea").append("<h3>Correct Answers: " + interviewQuestions.correctCount + "</h3>");
        $(".mainArea").append("<h3>Incorrect Answers: " + interviewQuestions.incorrectCount + "</h3>");
        $(".mainArea").append("<h3>Unanswered: " + interviewQuestions.unansweredCount + "</h3>");
        // $(".mainArea").append("<h3> Your highest score so far :<span id ='hScore'></span></h3>");
        $(".mainArea").append("<button id='review' class='btn btn-lg btn-primary'>Review answers</button>");
        $("#page3").css({ visibility: "visible"}); 

    },
    startTimer: function() {

      // Use setInterval to start the count here.
      intervalId = setInterval(interviewQuestions.count, 1000);
      // console.log("started timer");
    },
    stopTimer: function() {

      // Use clearInterval to stop the count here.
      clearInterval(intervalId);
      interviewQuestions.time = 0;
      // console.log("stopped timer");

      // Change the "display" div to "00:00."
      $("#timer").text("Time: 00:00");
    },
    count: function() {

      // Increment time by 1, remember we cant use "this" here.
      interviewQuestions.time++;

      // Get the current time, pass that into the timeConverter function,
      // and save the result in a variable.
      var converted = interviewQuestions.timeConverter(interviewQuestions.time);
      // console.log(converted);

      // Use the variable we just created to show the converted time in the "timer" div.
      $("#timer").text("Time Spent: " + converted);
    },
    timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
}

// Onclick functions
// ******************************************************************

$("body").on("click", "#doneButton", function(event){
    endTime = moment();
    event.preventDefault();
    sessionStorage.setItem("queryURL", "");
    interviewQuestions.displayResults();

    viewTestResults = 1;
    sessionStorage.setItem("viewTestResults", viewTestResults);
    console.log("viewTestResults=1");

    if(!interviewQuestions.reviewFlag) {
        interviewQuestions.stopTimer();

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
            testDate: moment().format('dddd, MMMM Do YYYY, hh:mm:ss a'),
            city: city
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

$("body").on("click", "#restart", function(event){

    event.preventDefault();

    interviewQuestions.unansweredCount = 0;
    interviewQuestions.correctCount = 0;
    interviewQuestions.incorrectCount = 0;
    interviewQuestions.reviewFlag = 0;

    viewTestResults = 0;
    sessionStorage.setItem("viewTestResults", viewTestResults);
    console.log("viewTestResults=0");

    generateSecondHTML();


}); 

// $("body").on("click", ".subjectBtn", function(event){

//     $('.btn-group-vertical > .btn').removeClass('active');
//     $(this).addClass('active');
//     // console.log("subject button selected");

// });

$("body").on("click", ".answerBtn", function(event){

    // $('.btn-group-vertical > .answerBtn').removeClass('active');
    // $(this).addClass('active');
    userAnswers[interviewQuestions.currentQuestion] = $(this).val();
    // console.log(userAnswers);
    // console.log("answer button selected");

});

$("body").on("click", ".prevBtn", function(event){
    // console.log(userAnswers);
    // console.log(correctAnswers);
    // console.log(interviewQuestions.reviewFlag);
    var maxCards = $('.card').length;
     
    for (var i = 0; i <= maxCards; i++) {
        $(".card").find('.front').css("z-index", 0);
        $(".card").css("z-index", i);
        $(".card").animate({left:'+=1000px'},1000);
    };

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
    var maxCards = $('.card').length;
    console.log(maxCards);
     
    for (var i = 0; i <= maxCards; i++) {
        $("#topCard").find('.front').css("z-index", 0);
        $("#topCard").css("z-index", i);
        $("#topCard").animate({left:'-=1000px'},1000);
    };
    
    if(interviewQuestions.currentQuestion <= interviewQuestions.maxQuestions) {
        interviewQuestions.currentQuestion++;
    }
    else {
        interviewQuestions.currentQuestion = interviewQuestions.maxQuestions;
    }
    if(interviewQuestions.reviewFlag) {
        interviewQuestions.reviewQuestion(interviewQuestions.currentQuestion);
    }
    else {
        interviewQuestions.displayQuestion(interviewQuestions.currentQuestion);
    }
    // console.log("next button pressed");

});