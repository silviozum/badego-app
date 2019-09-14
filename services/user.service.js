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
  firebase.firestore().collection("article").doc().set(data)
.then(function(res) {
  console.log(res)
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});


}

function edit (id,data) {
  console.log(data,id)
  firebase.firestore().collection('article').doc(id).update(data);
}

async function like (id, list) {
  const req = await firebase.firestore().collection('article').doc(id).update({
    like: list
  })
  return req
}

 async function uploadImageReleated(file){
  const req =  storage.ref('images/' + file.name).put(file)
  return req
}

 async function uploadVideoReleated(file){
   const req =  storage.ref('videos/' + file.name).put(file)
   return req
}

async function getImage(path) {
  const file = await storage.ref(path).getDownloadURL()
  return file
}


async function userArticles(id) {
  let articles = []
  await firebase.firestore().collection("article").where("author.uid", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            articles.push({
              data: doc.data(),
              id:doc.id
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    return articles
}

export const userService = {
  auth,
  logout,
  publish,
  like,
  edit,
  getImage,
  uploadImageReleated,
  uploadVideoReleated,
  userArticles
}
