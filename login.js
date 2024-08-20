import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

document.getElementById("login_btn").addEventListener("click", () => {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login successful: ", userCredential.user);
            
            // Store the email in localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            window.location.href = 'Mainpage.html';  
        })
        .catch((error) => {
            console.error("Error logging in: ", error.message);
        });
});
