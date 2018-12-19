import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBlAMBJJFerjiGkZYgpP1f-4_H7DMsYVt4",
    authDomain: "hacktiv-overflow-fceaf.firebaseapp.com",
    databaseURL: "https://hacktiv-overflow-fceaf.firebaseio.com",
    projectId: "hacktiv-overflow-fceaf",
    storageBucket: "hacktiv-overflow-fceaf.appspot.com",
    messagingSenderId: "903349655076"
};
firebase.initializeApp(config);

const db = firebase.database()

export default db