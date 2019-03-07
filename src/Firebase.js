import * as firebase from 'firebase';
import './Authentication'
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_u4cBRvGO4Vs2i2jqY18A-pOXNuScUrY",
  authDomain: "beehive-project-ccf6a.firebaseapp.com",
  databaseURL: "https://beehive-project-ccf6a.firebaseio.com",
  projectId: "beehive-project-ccf6a",
  storageBucket: "beehive-project-ccf6a.appspot.com",
  messagingSenderId: "12077061353"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BMTBQDopq6uJLjJMKUzzNJPXYe4bZRyPaaKLU2jPkydkxLoIPApiCd8TZuZhNIWAUjvf2BH8QfI66FFT65T7S-g");

const updateNotificationToken = async (userEmail) => {
  const token = await messaging.getToken();
  console.log("New Token", token);
  return firebase.firestore()
    .collection("tokens")
    .doc(userEmail)
    .set({token});
};

export const enableNotificationTokenSyncing = userEmail => {
  messaging.requestPermission()
    .then(() => {
      // Sync Initial token
      updateNotificationToken(userEmail);
      // Sync again whenever modified
      messaging.onTokenRefresh(() => updateNotificationToken(userEmail));
    }).catch(error =>
    console.error("Error while getting permission to show notifications", error)
  );
};

navigator.serviceWorker.register('sw.js')
  .then(registration => {
    messaging.useServiceWorker(registration);
    // Once service worker is registered listen to auth changes
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        enableNotificationTokenSyncing(user.email);
      }
    });
  });

export default firebase;

const auth = firebase.auth();

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true
});

const fireFieldValue =  firebase.firestore.FieldValue;


export {
  auth,
  firestore,
  fireFieldValue
};
