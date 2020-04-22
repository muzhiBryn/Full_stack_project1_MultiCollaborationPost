import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAODG7dJZwg7FpvpqYcBo3GCBpO9yGOBkc',
  authDomain: 'firenotes-71ad1.firebaseapp.com',
  databaseURL: 'https://firenotes-71ad1.firebaseio.com',
  projectId: 'firenotes-71ad1',
  storageBucket: 'firenotes-71ad1.appspot.com',
  messagingSenderId: '1061346557301',
  appId: '1:1061346557301:web:99fedf005fee36e1c2273c',
  measurementId: 'G-BL18YM7XE4',
};

Firebase.initializeApp(firebaseConfig);
const database = Firebase.database();


export function fetchNotes(callback) {
  database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
    callback(snapshot.val());
  });
}

export function saveNote(notes, callback) {
  console.log('try to save');
  console.log(notes.toJS());
  database.ref().set(notes.toJS());
}


export default 'fetchNotes';
