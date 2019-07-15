
import * as firebase from 'firebase'

// // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD3jpyFsPoO-t-xjUYt8hSZM_aD3dReXVc",
    authDomain: "badego-cc1ba.firebaseapp.com",
    databaseURL: "https://badego-cc1ba.firebaseapp.com",
    projectId: "badego-cc1ba",
    storageBucket: "badego-cc1ba.appspot.com",
};
async function list(){
let resultDocs = {}
  await firebase.firestore().collection('article').get()
    .then(doc => {
      doc.docs.map((item,index) => {
        resultDocs[index] = item._document.proto.fields
        resultDocs[index].id = item.id
      })

    })
    .catch(err => {
      console.log('Error getting document', err);
    });
    return resultDocs
}

async function article(id){
  let item = [];
  await firebase.firestore().collection('article').doc(id).get()
    .then(doc => {
      item = doc._document.proto.fields
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

    return item
}
async function related(tags){
  console.log(tags.arrayValue.values[0])
  let item = [];
  var query = await firebase.firestore().collection('article').where("tags", "==", tags.arrayValue.values[0].stringValue)
  console.log(query)
    return item
}

export const articleService = {
  list,
  related,
  article
}
