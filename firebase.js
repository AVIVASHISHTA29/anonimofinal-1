import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDyx8-zPXTiTW9vtTA9xAiUgjQeaufZWUQ",
    authDomain: "whatsapp-2-6f89f.firebaseapp.com",
    projectId: "whatsapp-2-6f89f",
    storageBucket: "whatsapp-2-6f89f.appspot.com",
    messagingSenderId: "558815558796",
    appId: "1:558815558796:web:c63692eafe66dedc068fa9"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  const auth = app.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider};