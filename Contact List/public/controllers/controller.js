var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function(){
    $http.get('/contactlist').then(function(response) {
    console.log('I got the requested data');
    $scope.contactlist = response.data;
    $scope.contact = null;
  });
    };

    refresh();
  
$scope.addContact = function() {
   $http.post('/contactlist',$scope.contact).success(function(response) { 
      $scope.contactlist.push(response);  //This will push the response
})
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}


}]);
