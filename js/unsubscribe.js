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
  const location_params = window.location.search.split(';').map(function(param){
    params[param.split('=')[0].toLowerCase()] = param.split('=')[1];
    return;
  });
  console.log(params);
  if(params.hasOwnProperty('id') && params.hasOwnProperty('token')){
    db.ref("/email_addresses/" + params.id).on('value', function(snapshot){
      const entity = snapshot.val();
      console.log(entity);
    })
  }
  // const specificDbRef = db.ref("/email_addresses");
  
  
}