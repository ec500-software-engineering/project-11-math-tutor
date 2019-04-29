var config = {
    apiKey: "AIzaSyCg_6hjpweEXjwnEpVrUbIhfjAfCikgUAc",
    authDomain: "mathpath-c0a60.firebaseapp.com",
    databaseURL: "https://mathpath-c0a60.firebaseio.com",
    projectId: "mathpath-c0a60",
    storageBucket: "mathpath-c0a60.appspot.com",
    messagingSenderId: "448979947802"
  };
  firebase.initializeApp(config);

function firebaseLogin()
{
    var email = document.getElementById("username").value
    var password = document.getElementById("password").value
    console.log(email);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        document.getElementById("ErrorMessage").innerHTML = "<p>"+errorMessage+"</p>"

    }).then(function(){
        window.location.pathname = '/profile';
    })
}
