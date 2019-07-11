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

export const userService = {
  auth,
  logout,
  publish
}
