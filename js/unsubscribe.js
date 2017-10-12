window.onload = function(){
  // Initialize server
  const firebase = require("firebase"),
  firebase_config_module = require("dailytodo-firebase-config"),
  firebase_config = firebase_config_module.dailytodo_firebase_config(),
  firebase_login = firebase_config_module.dailytodo_firebase_login();
  firebase.initializeApp(firebase_config);
  firebase
  .auth()
  .signInWithEmailAndPassword(firebase_login.username, firebase_login.password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  const db = firebase.database();
  const params = {};
  window.location.search.split(/[?&]/g).filter(function(str){
    if(str.length > 0) {
      return str
    }
  }).map(function(param){
    var parsed_param = param.split('=');
    params[parsed_param[0].toLowerCase()] = parsed_param[1];
  });
  if(params.hasOwnProperty('id') && params.hasOwnProperty('token')){
    const specificDbRef = db.ref("/email_addresses");
    db.ref("/email_addresses/" + params.id).once('value', function(snapshot){
      const entity = snapshot.val();
      if(entity !== null){
        if(params.token === entity.SHA){
          specificDbRef.child(params.id).remove()
          return;
        }
      } else {
        console.error('there was a problem');
      }
    })
  }
  
  
}