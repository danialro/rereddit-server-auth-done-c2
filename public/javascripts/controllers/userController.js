// app.controller('UserCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
//   $scope.user = {};

//   $scope.addFriend = function () {
//     auth.register($scope.user).then(function(){
//       $state.go('home');
//     });
//   };

//   $scope.removeFriend = function(){
//     auth.logIn($scope.user).error(function(error){
//       $scope.error = error;
//     }).then(function(){
//       $state.go('home');
//     });
//   };
// }])