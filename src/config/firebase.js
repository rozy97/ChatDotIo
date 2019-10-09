import firebase from 'firebase'

class firebaseConfig {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBKkYqBebRz4nysUUuTIVx27cj7cdBeVwA",
            authDomain: "chatappv2-f3b08.firebaseapp.com",
            databaseURL: "https://chatappv2-f3b08.firebaseio.com",
            projectId: "chatappv2-f3b08",
            storageBucket: "chatappv2-f3b08.appspot.com",
            messagingSenderId: "59813433536",
            appId: "1:59813433536:web:a573d90dfc45fbbd57dd25"
          };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
}

export default new firebaseConfig()