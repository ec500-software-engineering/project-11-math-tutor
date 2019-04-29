
    var config = {
    apiKey: "AIzaSyCg_6hjpweEXjwnEpVrUbIhfjAfCikgUAc",
    authDomain: "mathpath-c0a60.firebaseapp.com",
    databaseURL: "https://mathpath-c0a60.firebaseio.com",
    projectId: "mathpath-c0a60",
    storageBucket: "mathpath-c0a60.appspot.com",
    messagingSenderId: "448979947802"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

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

function postData(page,post)
{
    var userId = firebase.auth().currentUser.uid;
    var root = database.ref('classes/' + userId+"/"+page);
    root.set(
        {
            post
        });
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

function addClass()
{
    console.log("here")
    var page= document.getElementById("className").value
    postData(page,"")

}
