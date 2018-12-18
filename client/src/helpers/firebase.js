import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDdqXkgfD1NEqavmrKNhJwfzDJKAiwp2Po",
    authDomain: "scatter-overflow.firebaseapp.com",
    databaseURL: "https://scatter-overflow.firebaseio.com",
    projectId: "scatter-overflow",
    storageBucket: "scatter-overflow.appspot.com",
    messagingSenderId: "1075505034172"
};
firebase.initializeApp(config);
var db = firebase.database()

export default db