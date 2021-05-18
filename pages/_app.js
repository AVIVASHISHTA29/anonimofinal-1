import '../styles/globals.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import firebase from 'firebase';
import { useEffect } from 'react';
import "../styles/login.css";
import getUsername from '../utils/getUsername';
import { setUserCookie } from '../utils/usercookie';

function MyApp({ Component, pageProps }) {

  const [user ,loading] = useAuthState(auth);
  const PhotoURLArray = [
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F16.png?alt=media&token=ba245892-581a-44fa-be19-dcb5db079ec1',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F17.png?alt=media&token=4f754be4-45bb-48cd-910f-55d5e5248afb',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F12.png?alt=media&token=2d6f8f6c-327b-4b67-b2fe-b43fbe23a486',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F15.png?alt=media&token=613734b8-d7bb-4e51-b8b1-d8878653397d',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F14.png?alt=media&token=12587148-16cf-42bb-9995-de413ef44d41',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F9.png?alt=media&token=2cbb80ff-ca26-4922-8f83-ea1697ee88c5',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F11.png?alt=media&token=9380d433-2914-4619-94f3-2e634f074e68',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F8.png?alt=media&token=bb478d5e-813e-43f5-9da8-ec0d59f3be73',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F13.png?alt=media&token=32cf7385-5991-4fd3-8967-efb1f020e109',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F18.png?alt=media&token=2825798c-9220-4651-8087-edb2607d2e52',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F6.png?alt=media&token=70e770e6-04e0-49ba-a2ed-90fa1d2161eb',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F4.png?alt=media&token=7ce7e35c-b9d5-4b37-87e4-63ca2beec092',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F10.png?alt=media&token=e6c858af-6244-405a-8199-ace9915110d1',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F7.png?alt=media&token=137b9d79-7868-43b2-81bf-723a34a7fb6c',
    'https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/user-logos%2F9.png?alt=media&token=2cbb80ff-ca26-4922-8f83-ea1697ee88c5',

  ]; 


const userDocRef = db.collection("users").doc(user?.uid);

  useEffect(() => {
    if(user){

      setUserCookie(user.email)

      userDocRef.get().then((doc) => {
        if (doc.exists) {
            if(doc.data().photoURL){
                db.collection("users").doc(user.uid).set({
                  email: user.email,
                  lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                  username : getUsername(user),
                } ,
                {merge: true}
                );
            }
        } else {

         db.collection("users")?.doc(user?.uid).set({
            email: user?.email,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            username :getUsername(user),
            photoURL: PhotoURLArray[Math.floor(Math.random()*PhotoURLArray.length)],
            userid :Math.floor(1000 + Math.random() * 9000),
          } ,
          {merge: false}
          );
            
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
      
      
    }
    
  }, [user]);

  
  if (loading) return <Loading/>
  if (!user) return <Login/>


  return <Component {...pageProps} />;
}

export default MyApp;
