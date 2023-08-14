// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '952725245806',
  apiKey: 'AIzaSyC6ldeiZYgMeN17sWQWtht5eEhnq53Kk1Q',
  authDomain: 'skinopedia-d7b46.firebaseapp.com',
  projectId: 'skinopedia-d7b46',
  storageBucket: 'skinopedia-d7b46.appspot.com',
  messagingSenderId: '952725245806',
  appId: '1:952725245806:web:184b86830b59a8672e3b7f',
  measurementId: 'G-QVDRGYN6Y8',

});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
