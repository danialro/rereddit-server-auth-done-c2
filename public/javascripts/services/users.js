app.factory('users', ['$http', 'auth', '$window', function($http, auth, $window) {

  var userService = {
    users: [],
    currentUserFriends: [],

    getUsers: function() {
    console.log('in the user service');
      return $http.get('/users').then(function(data) {
  
        angular.copy(data.data, userService.users);
      });
    },

    get: function(id) {
      return $http.get('/users/' + id).then(function(res){
        return res.data;
      });
    },

    isCurrentUser: function(user) {
       var token = auth.getToken();
       var payload = JSON.parse($window.atob(token.split('.')[1]));

       if (payload.username === user.username){
        return true;
       }
    },

    getFriends: function() {
          
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]))
        var id = payload._id

        return $http.get('/users/' + id + '/friends').then(function(res){
          console.log(res.data)
          userService.currentUserFriends = res.data;
          
        });
    },


    addFriend: function(user) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]))
      var id = payload._id
      var friend = user._id

      return $http.put('/users/' + id + '/friends/addfriend/' + friend).then(function(res){
        console.log('in service add friend');
        userService.getFriends();
      })
    },


    removeFriend: function(user, user2) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]))
      var id = payload._id
      var friend = user._id

      return $http.put('/users/' + id + '/friends/removefriend/' + friend).then(function(res){
        console.log('in service add friend');
        userService.getFriends();
      })
    }

  };
  

  return userService;


}]);
