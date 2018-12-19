// Initialize Firebase
import firebase from 'firebase';

export function initApp() {
//   console.log('init');
  const config = {
    apiKey: 'AIzaSyCeGBNDOybyOqxHBHsMX_JX1L3PsvFges0',
    authDomain: 'hacktiv-overflow-e0d30.firebaseapp.com',
    databaseURL: 'https://hacktiv-overflow-e0d30.firebaseio.com',
    projectId: 'hacktiv-overflow-e0d30',
    storageBucket: 'hacktiv-overflow-e0d30.appspot.com',
    messagingSenderId: '503140410331',
  };
  firebase.initializeApp(config);
}
