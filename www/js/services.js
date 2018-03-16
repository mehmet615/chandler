angular.module('chandler')
.service('services', function ($q,$http,API) {

    function getService(url){
      return $http.get(url).then(function(response){
         return response.data
      });
    }

    function postService(url,dataset){
     /* var settings = {
        method: 'GET', 
        url: url,
        headers: {'Content-Type': 'application/json'},
        transformRequest: function(obj) {
          
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: dataset
      };
      return $http(settings).then(function(response){
         return response.data
      });
      */
      $http({
        method : "GET",
        headers: {'Content-Type': 'application/json'},
        url : url,
        data: dataset
      }).then(function mySuccess(response) {
          return response.data;
      }, function myError(response) {
        console.log(response);
        //$scope.myWelcome = response.statusText;
      });



    }

    return {
      getService:  getService,
      postService:  postService,
    }

});
