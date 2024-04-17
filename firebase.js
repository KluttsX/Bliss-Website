import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDqFEJQqObbjZRKc-c-yi-WC-cJ8SZV3VQ",
    authDomain: "bliss-db-bd5b3.firebaseapp.com",
    databaseURL: "https://bliss-db-bd5b3-default-rtdb.firebaseio.com",
    projectId: "bliss-db-bd5b3",
    storageBucket: "bliss-db-bd5b3.appspot.com",
    messagingSenderId: "836713405203",
    appId: "1:836713405203:web:4d04ad5fa029af6a0558e6",
    measurementId: "G-HWYX1FDJZG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const blogsRef = collection(db, "blogs");

getDocs(blogsRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const images = data.image;
        const titulo = data.title;
        const info = data.info;
        const authorName = data.author;
        const fecha = data.date;

        const fechaJS = fecha.toDate();

        const fechaFormateada = fechaJS.toLocaleDateString();



        const blogHTML = `
                <div class="blog-box">
                    <div class="blog-box-img">
                        <img src="${images}">
                        <a href="post.html?id=${doc.id}" class="blog-img-link">
                            <i class="bx bx-right-top-arrow-circle"></i>
                        </a>
                    </div>
                    <div class="blog-box-text">
                        <a>${titulo}</a>
                        <p>${info}</p>
                        <div class="blog-author">
                            <div class="blog-author-img">
                                <i class="bx bx-user"></i>
                            </div>
                            <div class="blog-author-text">
                                <strong>${authorName}</strong>
                                <span>${fechaFormateada}</span>
                            </div>
                        </div>
                    </div>
                </div>
        `;

        document.getElementById("blog-panel").innerHTML += blogHTML;

    });
}).catch((error) => {
    console.log("Error obteniendo blogs: ", error);
})

const submit = document.getElementById('submit');
const submitLogin = document.getElementById('submitLogin');

submit.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById('gmail').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Crendo cuenta...')
            window.location.href = "/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

})

submitLogin.addEventListener("click", function (event) {
    event.preventDefault()

    const email = document.getElementById('gmailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Iniciando Sesión...')
            window.location.href = "/index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

})

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

const blogDocRef = doc(db, "blogs", blogId);

getDoc(blogDocRef)
    .then((doc) => {
        if (doc.exists()) {
            const data = doc.data();
            const images = data.image;
            const titulo = data.title;
            const info = data.info;

            const blogdetailsHtml = ` 
            <div class="post">
                <img id="imagen" src="${images}">
                <h3 id="titulo">${titulo}</h3>
                <p id="info">${info}</p>
            </div>
            `;

            document.getElementById("blogsdetas").innerHTML = blogdetailsHtml;
        } else {
            console.log("El documento del blog no existe");
        }
    })
    .catch((error) => {
        console.log("Error obteniendo detalles del blog: ", error);
    });



