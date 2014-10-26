$( document ).ready(function() {

  var vivaAPI = "http://www.vivahunt.com/";

  function fetch () {
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
        attachUpvotes();
      }
  });
  };
  fetch();


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
      $("#nologged").hide();
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
function attachUpvotes () {
    $(".upvote").on('click', 'button', function(event) {
      event.preventDefault();
      var button = this;
      var post_id = $(button).data("id");
      console.log("post_id "+post_id);

      $.ajax({
         type : "GET",
         dataType : "json",
         url : vivaAPI + "posts/"+ post_id +"/vote",
         success: function(data){
            if(data.success){
              var previous_score = $(button).text();
              $(button).text(parseInt(previous_score) + 1);
          } else {
          // check if logged. if so, you already voted, else redirect
          $.ajax({
             type : "GET",
             dataType : "json",
             url : vivaAPI + "me",
             success: function(data){
                if(data.success){
                  alert('You have already voted.');
              } else {
                  alert("You have to log in first. You will now be redirected...");
              // location.href="http://www.vivahunt.com/login";
          }
      }
  });
      }
  }
});
  });
}

$( "#login").click(function() {
    location.href="http://www.vivahunt.com/login";
});

$( "#logout").click(function() {
    location.href="http://www.vivahunt.com/logout";
});


$.get(vivaAPI +'categories', function (data) {
    console.log(data.categories[0]);
    $.each(data.categories, function(val, text) {
        $('#category').append($('<option></option>').val(text.id).html(text.category));
    });
});


function postiar () {
    // name, tagline, url, category, tags
    var data = {};
    data.name = $('#name').val();
    data.tagline = $('#description').val();
    data.url = $('#url').val();
    data.category = $('#category').val();
    $.post(vivaAPI + 'posts', data, function (data) {
        console.log(data);
        if(data.success){
            fetch();
            $('#name').val('');
            $('#description').val('');
            $('#url').val('');
            $('#category').val('');
            $('.cd-panel').removeClass('is-visible');
        }

    });
}

$('#postiar').on('click', function () {
    postiar();
});
});
