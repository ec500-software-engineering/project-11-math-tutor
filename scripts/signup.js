/*
 * Creates new user
 */
function firebaseSignup()
{
    var email = document.getElementById("username").value
    var password = document.getElementById("password").value
    isError = false 
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        isError = true
        document.getElementById("ErrorMessage").innerHTML = "<p>"+errorMessage+"</p>"
        console.log(errorMessage);
    })
    if(!isError)
    {
        setTimeout(returnToLogin,1000)
    }
}

/*
 * Returns to home
 */
function returnToLogin()
{
    window.location.pathname = '/';
}


