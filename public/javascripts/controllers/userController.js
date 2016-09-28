app.controller('UserCtrl', ['$scope', '$state', 'users', 'user', 'auth', function($scope, $state, users, user, auth){

  $scope.user = user;
  $scope.users = users.users;
  $scope.friends = user.friends;


  $scope.addFriend = function (user) {
    console.log('inside the addFriend func');
    for (var i = 0; i < users.currentUserFriends.length; i++) {
      
      if (users.currentUserFriends[i].user){
        alert('You are already friends');
      }
      else {
        users.addFriend(user);
      }
    }
    };


  $scope.removeFriend = function(){
    // console.log('inside the removeFriend func');
    users.removeFriend(user);
  };


  $scope.isCurrentUser = function(user){
      if (users.isCurrentUser(user)) {
        return true;
      } else {
        return false;
      };
  };


  $scope.isFriend = function(user){

    if (users.currentUserFriends.indexOf(String(user._id)) >= 0){
      return true;
    }
    else {
      return false;
    }
  }



}])