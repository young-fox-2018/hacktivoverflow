# hacktivoverflow

## Link Deploy
[Link AWS](https://overflowing.desyarmariena.space/)

## Config Firebase

```javascript
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD8nSlAQLiiXwiT2hXcFJKN69eeS7avsAU',
  authDomain: 'hacktivoverflow-a60a5.firebaseapp.com',
  databaseURL: 'https://hacktivoverflow-a60a5.firebaseio.com',
  projectId: 'hacktivoverflow-a60a5',
  storageBucket: 'hacktivoverflow-a60a5.appspot.com',
  messagingSenderId: '907636860373',
};

const database = firebase.initializeApp(config).database();

export default database;
```

## ENV
```
SECRET=FINALLIVECODEPLEASEMAKEITEASY
```

## Kendala
* Deploy di aws bermasalah waktu EC2. Setelah clone dan npm install server muncul node_modules permission denied etc. Sudah coba masuk di sudo su masih bermasalah juga
* Masih ada bug untuk hitung answer setiap questions di home page.
* Schema di firebase terpisah (answer, downvotes, upvotes), masih pusing untuk looping dan menghitung each child nya
* Design, awalnya mau clone stackoverflow, tapi fungsionalitas belum selesai jadi css ditinggalkan dulu
* Waktu, untuk saya yang orangnya lambat, butuh lebih banyak waktu