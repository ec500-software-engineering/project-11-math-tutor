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
