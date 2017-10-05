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
  const location_params = window.location.search.split(';');
  const specificDbRef = db.ref("/email_addresses");
  
}