angular.module('myApp.services', [])
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/users/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/users/me', profileData);
      },
      changePassword: function(passwordData) {
        return $http.post('/api/users/me/password', passwordData);
      }
    };
  });