import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp, } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDae5HMj2qTPmgg_j9ZTSXM_7ptLTyTqi0",
    authDomain: "classmate-data-0.firebaseapp.com",
    projectId: "classmate-data-0",
    storageBucket: "classmate-data-0.appspot.com",
    messagingSenderId: "938353159462",
    appId: "1:938353159462:web:b6a62bd6c5585b989425e7",
    measurementId: "G-D4H6QVBTKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const myAuth = getAuth();


provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
provider.addScope("https://www.googleapis.com/auth/userinfo.email");
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
provider.setCustomParameters({ 'login_hint': 'user@example.com' });

export const mySignInWithGoogle = () => {
    console.log("mySignInWithGoogle");
    try {
        signInWithPopup(myAuth, provider)
            .then((userDetails) => {
                console.log(userDetails);
                // This gives you a Google Access Token. You can use it to accessthe Google API
                const credential = GoogleAuthProvider.credentialFromResult(userDetails);
                const token = credential.accessToken;
                //The signed-in user info.
                const user = userDetails.user;
                //IDs data available using getAdditionalUserInfo(result)
                console.log(credential);
                console.log("the token from google: ", token);
                console.log("the user info from google: ", user);
            })
    }
    catch (err) {
        alert("some error " + err);
    }
}
//https://youtu.be/T9K8bkMEA3Q?si=OhyCYF4tZURlexLG&t=12419
// npm run build

onAuthStateChanged(myAuth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user signed in: ', user);
        // ...
    } else {
        // User is signed out
        // ...
    }
});

export const getCurrentUserInfo = () => {
    const user = myAuth.currentUser;
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
    }
};