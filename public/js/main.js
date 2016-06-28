var twitterStream = angular.module('myApp', ['chart.js'])

twitterStream.controller("mainCtrl", ['$scope', 'socket',
function ($scope, socket) {
  //chart labels
  $scope.labels = ["English", "Spanish", "French", "German", "Portuguese", "Chinese", "Other"];
  //chart colors
  $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd','#e98e53', '#bd99f2', '#f2d699', '#b4b2b4'];
  //intial data values
  $scope.brexitData = [0,0,0,0,0,0,0];
  $scope.rioData = [0,0,0,0,0,0,0];
  $scope.hillaryData = [0,0,0,0,0,0,0];
  $scope.trumpData = [0,0,0,0,0,0,0];
  $scope.dncData = [0,0,0,0,0,0,0];
  $scope.euData = [0,0,0,0,0,0,0];

  socket.on('newTweet', function (tweet) {
    $scope.tweet = tweet.text
    $scope.user = tweet.user.screen_name

    //parse language and location from payload
    var lang = tweet.lang
    var coords = tweet.coordinates
    var place = tweet.place
    var geo = tweet.geo

    //all hashtags in the tweet
    var hashtags = tweet.entities.hashtags.map(function(el){
      return el.text.toLowerCase()
    })

    //check source for geolocation
    if (coords) console.log("Coordinates: ", coords.coordinates);
    if (place) console.log("Place: ", place.bounding_box.coordinates[0][0]);
    if (geo) console.log("Geo: ", geo.coordinates)


    //check source and increment for #worldoceansday tweets
    if (hashtags.indexOf('brexit') !== -1){
      switch (lang) {
        case 'en': $scope.brexitData[0]++
        break;
        case 'es': $scope.brexitData[1]++
        break;
        case 'fr': $scope.brexitData[2]++
        break;
        case 'de': $scope.brexitData[3]++
        break;
        case 'pt': $scope.brexitData[4]++
        break;
        case 'zh': $scope.brexitData[5]++
        break;
        default: $scope.brexitData[6]++
      }
    }

    //check source and increment for #FelizMiércoles tweets
    else if (hashtags.indexOf('rio2016') !== -1) {
      switch (lang) {
        case 'en': $scope.rioData[0]++
        break;
        case 'es': $scope.rioData[1]++
        break;
        case 'fr': $scope.rioData[2]++
        break;
        case 'de': $scope.rioData[3]++
        break;
        case 'pt': $scope.rioData[4]++
        break;
        case 'zh': $scope.rioData[5]++
        break;
        default: $scope.rioData[6]++
      }
    }

    //check source and increment for #feelthebern tweets
    else if (hashtags.indexOf('hillary') !== -1) {
      switch (lang) {
        case 'en': $scope.hillaryData[0]++
        break;
        case 'es': $scope.hillaryData[1]++
        break;
        case 'fr': $scope.hillaryData[2]++
        break;
        case 'de': $scope.hillaryData[3]++
        break;
        case 'pt': $scope.hillaryData[4]++
        break;
        case 'zh': $scope.hillaryData[5]++
        break;
        default: $scope.hillaryData[6]++
      }
    }

    else if (hashtags.indexOf('trump') !== -1) {
      switch (lang) {
        case 'en': $scope.trumpData[0]++
        break;
        case 'es': $scope.trumpData[1]++
        break;
        case 'fr': $scope.trumpData[2]++
        break;
        case 'de': $scope.trumpData[3]++
        break;
        case 'pt': $scope.trumpData[4]++
        break;
        case 'zh': $scope.trumpData[5]++
        break;
        default: $scope.trumpData[6]++
      }
    }

    else if (hashtags.indexOf('dnc') !== -1) {
      switch (lang) {
        case 'en': $scope.dncData[0]++
        break;
        case 'es': $scope.dncData[1]++
        break;
        case 'fr': $scope.dncData[2]++
        break;
        case 'de': $scope.dncData[3]++
        break;
        case 'pt': $scope.dncData[4]++
        break;
        case 'zh': $scope.dncData[5]++
        break;
        default: $scope.dncData[6]++
      }
    }

    else if (hashtags.indexOf('eu') !== -1) {
      switch (lang) {
        case 'en': $scope.euData[0]++
        break;
        case 'es': $scope.euData[1]++
        break;
        case 'fr': $scope.euData[2]++
        break;
        case 'de': $scope.euData[3]++
        break;
        case 'pt': $scope.euData[4]++
        break;
        case 'zh': $scope.euData[5]++
        break;
        default: $scope.euData[6]++
      }
    }
    
  });
}
]);


/*---------SOCKET IO METHODS (careful)---------*/

twitterStream.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});
