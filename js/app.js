$( document ).ready(function() {

  var vivaAPI = "http://www.vivahunt.com/";
  $.ajax({
     type : "GET",
     dataType : "json",
     url : vivaAPI + "posts/today",
     success: function(data){
          console.log(data);
        var sortedData = data.posts.sort(compareNumbers);
        $.each( sortedData, function( i, item ) {
        $( "#postslinks ul").append('<li style="clear:both"><div class="col-xs-2 upvote"><button>' + item.score + '</button></div>' + '<div class="col-xs-7 desc"><h2><a href="'+ item.url+ '" target="_blank">' + item.name + '</a></h2><p>' + item.tagline + '</p></div>' + '<div class="col-xs-3 user"><img src="http://avatars.io/twitter/'+ item.twitter_name + '" ></div></li>');
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

    $.ajax({
     type : "GET",
     dataType : "json",
     url : vivaAPI + "me",
     success: function(data){
        console.log(data.success);
        if(data.success === "true"){
          console.log("WOOHO, you are logged in.");
          $("#login").hide();
          $("#logged").show();
        }
     }
    });
  
$('.cd-btn').on('click', function(event){
    event.preventDefault();
    $('.cd-panel').addClass('is-visible');
});
//clode the lateral panel
$('.cd-panel').on('click', function(event){
    if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) { 
        $('.cd-panel').removeClass('is-visible');
        event.preventDefault();
    }
});

function compareNumbers(a, b) {
  return b.score - a.score;
}

$( "#login").click(function() {
    location.href="http://www.vivahunt.com/login";
});

$( "#logout").click(function() {
    location.href="http://www.vivahunt.com/logout";
});

});
    