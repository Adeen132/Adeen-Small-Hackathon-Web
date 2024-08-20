import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzduMzGpyY_xKKx9PtAHlVKZeiPCBfHHM",
    authDomain: "adeen-9b41e.firebaseapp.com",
    projectId: "adeen-9b41e",
    storageBucket: "adeen-9b41e.appspot.com",
    messagingSenderId: "694179152775",
    appId: "1:694179152775:web:cd356183147e6df75a8922",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get DOM elements
const todoValue = document.getElementById('todoValue');
const addtoDo = document.getElementById('submit');
const ul = document.getElementById('list');

// Get user details from localStorage
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");

// Array of default profile images
const images = [
    "https://www.zdnet.com/a/img/resize/a0dcec40a8cd8d2e1b3a9e12a05c2819622d20be/2021/07/19/8a337c80-5ed6-43a1-98fb-b981d420890f/programming-languages-shutterstock-1680857539.jpg?auto=webp&fit=crop&height=1200&width=1200",
];

// Function to fetch and display the to-do list
const makingList = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "todo"));
        ul.innerHTML = '';
        let listContent = '';

        querySnapshot.forEach((doc) => {
            const todos = doc.data();
            listContent += `
                <li id="${doc.id}">
                    <img src="${todos.img}" alt="${todos.name}" style="width:30px; height:30px; border-radius:50%;">
                    ${todos.name} Msg - ${todos.todo} <br> [${todos.time}]
                    <button class="edit-btn" data-id="${doc.id}" data-todo="${todos.todo}">Edit</button>
                    <button class="delete-btn" data-id="${doc.id}">Delete</button>
                </li>
            `;
        });

        ul.innerHTML = listContent;

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => editTodoItem(button.dataset.id, button.dataset.todo));
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => deleteTodoItem(button.dataset.id));
        });
    } catch (e) {
        console.error("Error fetching documents: ", e);
    }
};

// Function to edit a to-do item
const editTodoItem = async (id, currentTodo) => {
    const newTodo = prompt("Edit your todo", currentTodo);
    if (newTodo) {
        try {
            const todoRef = doc(db, "todo", id);
            await updateDoc(todoRef, { todo: newTodo });
            makingList();
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }
};

// Function to delete a to-do item
const deleteTodoItem = async (id) => {
    try {
        await deleteDoc(doc(db, "todo", id));
        makingList();
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};

// Function to add a new to-do item
addtoDo.addEventListener('click', async (event) => {
    event.preventDefault();
    const currentTime = new Date().toLocaleString();  // Get the current date and time
    const fullName = `${firstName} ${lastName}`;
    const randomImage = localStorage.getItem("profileImage") || (images.length > 0 ? images[Math.floor(Math.random() * images.length)] : "https://via.placeholder.com/30");

    try {
        await addDoc(collection(db, "todo"), {
            todo: todoValue.value,
            time: currentTime,
            name: fullName,
            img: randomImage,
        });
        makingList();
        todoValue.value = '';
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Initial call to display the list
makingList();
