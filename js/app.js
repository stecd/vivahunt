$( document ).ready(function() {

  var vivaAPI = "http://vivahunt.com/";
  $.ajax({
     type : "GET",
     dataType : "json",
     url : vivaAPI + "posts/today",
     success: function(data){
          console.log(data);
        $.each( data.posts, function( i, item ) {
        $( "#postslinks ul").append('<li style="clear:both"><div class="col-xs-2 upvote"><button>' + item.score + '</button></div>' + '<div class="col-xs-7 desc"><h2><a href="#/" target="_blank">' + item.name + '</a></h2><p>' + item.tagline + '</p></div>' + '<div class="col-xs-3 user"><img src="http://api.randomuser.me/portraits/med/women/'+ i + '.jpg" ></div></li>');
      });
     }
    });
    console.log(vivaAPI);
    $.ajax({
     type : "GET",
     dataType : "json",
     url : vivaAPI + "categories",
     success: function(data){
          console.log(data);
        $.each( data.categories, function( i, item ) {
        $( "ul.topics").append('<li>' + item.category + '</li>');
      });
     }
    });



});
    