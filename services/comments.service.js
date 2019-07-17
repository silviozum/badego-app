
import * as firebase from 'firebase'

// // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD3jpyFsPoO-t-xjUYt8hSZM_aD3dReXVc",
    authDomain: "badego-cc1ba.firebaseapp.com",
    databaseURL: "https://badego-cc1ba.firebaseapp.com",
    projectId: "badego-cc1ba",
    storageBucket: "badego-cc1ba.appspot.com",
};


async function submitComment(headTalk,author,articleId){
  let comment=[]
  const data = {
    head_talk: headTalk,
    author: author,
    article_id: articleId,
    inside_talk:{}
  }
  await firebase.firestore().collection('comments').add(data)
  .then(function(docRef) {
    comment = {
      data: data,
      id:docRef.id
    }
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

    return comment
}

async function getComments(articleId){
  let comment =[]
  await firebase.firestore().collection("comments").where("article_id", "==", articleId)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            comment.push({
              data: doc.data(),
              id:doc.id
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

return comment

}

export const commentsService = {
  submitComment,
  getComments
}
