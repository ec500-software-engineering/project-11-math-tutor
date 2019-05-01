/*
 * Returns url param struct. Helps to iterate over url params
 */
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

/*
 * sets the value of a page 
 */
function postData(page,post)
{
    var userId = firebase.auth().currentUser.uid;
    var root = database.ref('classes/' + userId+"/"+page);
    root.set(
        {
            post
        });
}

/*
 * wrapper for postData()
 * posts page data in proper page
 */
function addPost()
{
    pageName = getAllUrlParams().page 
    postValue = document.getElementById("subject").value
    console.log(pageName)
    console.log(postValue)
    postData(pageName,postValue)
}

/*
 * loads user data from server 
 */
function getUserData()
{
    var userId = getAllUrlParams().author;
    var page = getAllUrlParams().page;

    var root = database.ref('classes/'+userId + '/' + page);
    var data
    root.on('value',function(snap)
        {
            data = snap.val()
            if(data!=null)
            {
                showUserData(data)
            }
        });
}

/*
 * posts user data in proper div on page
 */
function showUserData(prevPost)
{

    console.log(prevPost)
    prevPostData = prevPost.post; 
    console.log(prevPostData)

    var userId = firebase.auth().currentUser;
    if(userId&&userId.uid==getAllUrlParams().author)
    {
        var subject = "<textarea id='subject' placeholder='Write your post...' style='height:200px'>"
        subject+=prevPostData;
        subject+="</textarea>"

        subject+="<button onclick = 'addPost()' class='w3-button w3-padding-large w3-white w3-border' id = 'post-btn'>save</button>"
        subject+="<div class='col-1'><button onclick = 'logout()' type='button' class='btn btn-danger'>logout</button></div>"

        document.getElementById("classData").innerHTML = subject 
        console.log("here")
        console.log(subject)
    }
    else
    {
        var subject = "<pre><code>"
        subject+=prevPostData;
        subject+="</code></pre>"
        console.log(subject)
        document.getElementById("classData").innerHTML = subject 
    }
}

/*
 * logs out user from firebase 
 */
function logout()
{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
    // An error happened.
    });
    setTimeout(function() { getUserData(); }, 500);
}

/*
 * initializes user data on page load
 */
window.onload = function()
{
   setTimeout(function() { getUserData(); }, 500);
};


