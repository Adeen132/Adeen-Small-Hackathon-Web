import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzduMzGpyY_xKKx9PtAHlVKZeiPCBfHHM",
    authDomain: "adeen-9b41e.firebaseapp.com",
    projectId: "adeen-9b41e",
    storageBucket: "adeen-9b41e.appspot.com",
    messagingSenderId: "694179152775",
    appId: "1:694179152775:web:cd356183147e6df75a8922",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById("signup_btn").addEventListener("click", () => {
    const firstName = document.getElementById("signup_first_name").value;
    const lastName = document.getElementById("signup_last_name").value;
    const email = document.getElementById("signup_email").value;
    const password = document.getElementById("signup_password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Signup successful: ", userCredential.user);

            // Store the user's name in localStorage
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);

            // Redirect to login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error("Error signing up: ", error.message);
        });
});
