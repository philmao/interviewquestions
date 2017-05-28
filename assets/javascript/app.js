
// $.getJSON("html.json", function(json) {




// $.ajax({
// url: 'assets/json/html.json',
// type: 'GET',

// }).done(function(response) {
//  console.log(response);

// });
	



 // function loadJSON(callback) {   

 //    var xobj = new XMLHttpRequest();
 //        xobj.overrideMimeType("assets/json");
 //    xobj.open('GET', 'html.json', true); // Replace 'my_data' with the path to your file
 //    xobj.onreadystatechange = function () {
 //          if (xobj.readyState == 4 && xobj.status == "200") {
 //            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
 //            callback(xobj.responseText);

 //            console.log(xobj.responseText);
 //          }
 //    };
 //    xobj.send(null);  
 // }



 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/json/html.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 };

 // console.log(xobj.responseText)


 