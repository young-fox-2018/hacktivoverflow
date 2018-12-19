// Initialize Firebase
const firebase = window.firebase
const axios = window.axios

export const server = axios.create({
  baseURL: 'http://localhost:3000/'
})

var config = {
  apiKey: 'AIzaSyAYd3rBprvlq8ugv9w6xJsltPYf9LxEakE',
  authDomain: 'hacktiv-overflow-faishal.firebaseapp.com',
  databaseURL: 'https://hacktiv-overflow-faishal.firebaseio.com',
  projectId: 'hacktiv-overflow-faishal',
  storageBucket: '',
  messagingSenderId: '420864328791'
}
firebase.initializeApp(config)
const database = firebase.database()

export default database
