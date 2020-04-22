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
const notesMapRef = database.ref('jialing_notes');


export function fetchNotes(callback) {
  notesMapRef.on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function newNote(noteInitialDetailJson) {
  const newNoteRef = notesMapRef.push();
  newNoteRef.set(noteInitialDetailJson);
}

export function saveNoteKV(id, key, value) {
  notesMapRef.child(id).child(key).set(value);
}

export function deleteNote(id) {
  notesMapRef.child(id).remove();
}


export default 'fetchNotes';
