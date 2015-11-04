//
app.factory('errorService', function(){
  var errors = {}

  return {
    setError: function(msg) {
      errors.friendError = msg
      errors.friendErrorBox = "errorBox"
    },
    callError: errors
  }

})
