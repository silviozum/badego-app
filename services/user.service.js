import * as firebase from 'firebase'

// // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyD3jpyFsPoO-t-xjUYt8hSZM_aD3dReXVc",
    authDomain: "badego-cc1ba.firebaseapp.com",
    databaseURL: "https://badego-cc1ba.firebaseapp.com",
    projectId: "badego-cc1ba",
    storageBucket: "badego-cc1ba.appspot.com",
};
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

async function auth (email, password) {
  var provider = new firebase.auth.GoogleAuthProvider();
  var setUser = {}
  await firebase.auth().signInWithPopup(provider).then(result => {
    var token = result.credential.accessToken;
    localStorage.setItem('token', token)
    setUser = result.user;
    firebase.firestore().collection('users').doc(setUser.uid).set({
        email: setUser.email,
        name: setUser.displayName,
        photo: setUser.photoURL
    })
  }).catch(function(error) {
    console.log(error.message)
  });

  return setUser

}

function logout () {
  firebase.auth().signOut().then(function() {
    localStorage.setItem('user', '')
    localStorage.setItem('token', '')
  }, function(error) {
    console.log(error)
  });
  return 'logout'
}

function publish (data) {
  firebase.firestore().collection('article').doc().set(data);
}

function like (id, list) {
  firebase.firestore().collection('article').doc(id).update({
    like: list
  })
}

 function uploadImageReleated(file){
  let urlImageDownload = ''
  let uploadTask = storage.ref('images/' + file.name).put(file)
   uploadTask.on(
  firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
      urlImageDownload = uploadTask.snapshot.ref.fullPath
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
      break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
      break;
    }
  },
  function(error) {
    // Errors list: https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }

);
  return urlImageDownload
}

function getImage(path) {
  let thisUrl
  var starsRef = storage.ref(path);
  starsRef.getDownloadURL().then(function(url) {
    thisUrl = url
  });
  return thisUrl
}

export const userService = {
  auth,
  logout,
  publish,
  like,
  getImage,
  uploadImageReleated
}
