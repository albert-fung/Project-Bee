import * as firebase from 'firebase';
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
export default firebase;
