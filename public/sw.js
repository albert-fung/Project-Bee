console.log("Registering fetch handler");
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
  );
});

importScripts("https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js");
const config = {
  apiKey: "AIzaSyA_u4cBRvGO4Vs2i2jqY18A-pOXNuScUrY",
  authDomain: "beehive-project-ccf6a.firebaseapp.com",
  databaseURL: "https://beehive-project-ccf6a.firebaseio.com",
  projectId: "beehive-project-ccf6a",
  storageBucket: "beehive-project-ccf6a.appspot.com",
  messagingSenderId: "12077061353"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const {title, ...options} = payload;
  return self.registration.showNotification(title, options);
});