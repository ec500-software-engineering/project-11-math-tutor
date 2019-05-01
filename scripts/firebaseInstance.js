/*
 * public api information
 */
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

/*
 * posts data within users directory
 */
function postData(page,post)
{
    if(page!=null && page!="")//prevents overwriting directory
    {
        var userId = firebase.auth().currentUser.uid;
        var root = database.ref('classes/' + userId+"/"+page);
        root.set(
        {
            post
        });

    }
}
