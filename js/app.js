var vivahunt = angular.module('vivahunt',[])
.controller('mainController', function ($scope) {
  $scope.user = {
    picture : "http://api.randomuser.me/portraits/med/women/33.jpg"
  };

  $scope.topics = [
  { text : 'startup' , link : 'startup'},
  { text : 'moda' , link : 'moda'},
  { text : 'culinária' , link : 'culinaria'},
  { text : 'música' , link : 'musica'},
  { text : 'cinema' , link : 'cinema'},
  { text : 'art & design' , link : 'design'},
  { text : 'arquitetura' , link : 'arquitetura'},
  ];
    
    
  $scope.animateButton = function(){
  
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

  }

});
    