window.onload = function()
{
    setTimeout(function() { getUserData(); }, 500);
};

firebase.auth().onAuthStateChanged(function(user) {
    console.log("here");
  if (user) {
    // User is signed in.
    console.log("login");
    // ...
  } else {
    // User is signed out.
    // ...
    window.location.pathname = '/';
    console.log("logout");
  }
});

function getUserData()
{
    var userId = firebase.auth().currentUser.uid;
    var userName = firebase.auth().currentUser.email;
    document.getElementById("username").innerHTML = "<p>"+"welcome: " + userName+"</p>"

    var root = database.ref('classes/'+userId);
    root.on('value',function(snap)
        {
            data = snap.val()
            if(data!=null)
            {
                pageTable = ""
                for(var page in data)
                {
                    pageTable+="<a href = /class?author="+userId+"&page=" +page+ ">"
                    pageTable+=page
                    pageTable+="</a>"
                    pageTable+="<br>"
                }
            }
            console.log(snap.val())
            document.getElementById("classes").innerHTML = pageTable
        });
    console.log("getting user data");
}

function logout()
{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
    // An error happened.
    });

    window.location.pathname = '/';
}


/*
 * Creates a new class
 */
function addClass()
{
    console.log("here")
    var page= document.getElementById("className").value
    postData(page,"")

}
