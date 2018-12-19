// import { api } from '../src/config'

function gOnSignIn(googleUser) {
  axios.request({
    url: 'http://localhost:8080/users/gsignin',
    method: 'POST',
    data: {
      id_token: googleUser.getAuthResponse().id_token
    }
  }).then(({ data }) => {
    localStorage.setItem("access-token", data["access-token"])
    localStorage.setItem('idProvider', 'google')
  }).catch(err => {
    console.error(err.message)
  })
}

function gSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}