$.ajax({
url: '../json/html.json',
type: 'get',
error: function(data){
},
success: function(data){
  data=jQuery.parseJSON(data);
  //do something with data              
    }
});