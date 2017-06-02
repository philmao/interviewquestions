$(document).ready(function() {


// function for creation of initial start screen

  function initialScreen() {
    startScreen = "<div class='container'><form class='form-signin'><h2 class='form-signin-heading'>Please sign in</h2><label for='inputEmail' class='sr-only'>Email address</label><input type='email' id='inputEmail' class='form-control' placeholder='Email address' required autofocus><label for='inputPassword' class='sr-only'>Password</label><input type='password' id='inputPassword' class='form-control' placeholder='Password'><div class='checkbox'><label><input type='checkbox' value='remember-me'> Remember me</label></div><button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button></form></div>";
    $('.mainArea').html(startScreen);


  }

// call initial start screen

  initialScreen ();

// on mouseclick the new HTML screen is generated

  $('body').on('click', '.btn-block', function(event){
    // $('.mainArea').hide();
    generateSecondHTML();

  });
    

 //closing onclick start-button event after generating new HTML page


// function for creation of second page with subject options

function generateSecondHTML() {

  
  window.location.href = "index2.html";
    


      // $('.jumbotron').hide();

}

$('body').on('click', '.selector', function(event){
    // $('.mainArea').hide();
    generateThirdHTML();

  });

function generateThirdHTML() {

  
  window.location.href = "index3.html";
    


      // $('.jumbotron').hide();

}







// LOGIC FOR PAGE 2*****************************************************

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


});


