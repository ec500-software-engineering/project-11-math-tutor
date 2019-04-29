function firebaseSignup()
{
    var email = document.getElementById("username").value
    var password = document.getElementById("password").value
    isError = 0
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        isError = 1
        document.getElementById("ErrorMessage").innerHTML = "<p>"+errorMessage+"</p>"
        console.log(errorMessage);
        // Handle Errors here.TODO
})
    if(isError)
    {
        setTimeout(returnToLogin,1000)
    }
}

function returnToLogin()
{
    window.location.pathname = '/';
}


