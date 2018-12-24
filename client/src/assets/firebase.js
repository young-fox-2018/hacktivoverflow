import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBZ3xA7OMwO-inyWQM2xWOj6BJdPXygZM0",
    authDomain: "overflow-315cc.firebaseapp.com",
    databaseURL: "https://overflow-315cc.firebaseio.com",
    projectId: "overflow-315cc",
    storageBucket: "",
    messagingSenderId: "1046794089085"
  }

let fire = firebase.initializeApp(config)

export default fire