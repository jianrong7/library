const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAswdLi51FLLqpZqgkh2NhdJMq0lTVDnbM",
    authDomain: "library-100fc.firebaseapp.com",
    projectId: "library-100fc",
    storageBucket: "library-100fc.appspot.com",
    messagingSenderId: "26229534934",
    appId: "1:26229534934:web:1ed0b19400936b65825977"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//     apiKey: 'AIzaSyAswdLi51FLLqpZqgkh2NhdJMq0lTVDnbM',
//     authDomain: 'library-100fc.firebaseapp.com',
//     projectId: 'library-100fc'
//  });
  
var db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

db.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});

let myLibrary = [];
// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem('books') === null) {
    myLibrary = [];
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
}
let darkMode = false;
const mainTable = document.querySelector('.mainTable')

// function Book(title, author, pages, status) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.status = status;
//     this.dataset = title + author;
// }
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.dataset = title + author;
    }
}
function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status)
    myLibrary.push(book)
    displayBooksInLibrary()
}
function displayBooksInLibrary() {
    while (mainTable.rows.length > 1) {
        mainTable.deleteRow(1);
    }
    localStorage.setItem('books', JSON.stringify(myLibrary));
    myLibrary.forEach(book => {
        let tableRow = document.createElement('tr')
        // Title
        let titleData = document.createElement('td')
        titleData.innerText = book.title
        tableRow.appendChild(titleData)

        // Author
        let authorData = document.createElement('td')
        authorData.innerText = book.author
        tableRow.appendChild(authorData)

        // Pages
        let pagesData = document.createElement('td')
        pagesData.innerText = book.pages
        tableRow.appendChild(pagesData)

        // Status
        let statusData = document.createElement('td')
        let statusBtn = document.createElement('button')
        statusBtn.classList.add('readStatus')
        statusBtn.innerHTML = book.status
        if (book.status === "Read") {
            statusBtn.style.backgroundColor = "rgb(37, 160, 37)"
        } else {
            statusBtn.style.backgroundColor = "rgb(185, 67, 67)"
        }
        statusData.appendChild(statusBtn)
        tableRow.appendChild(statusData)

        // Remove Button
        let removeData = document.createElement('td')
        let removeBtn = document.createElement('button')
        removeBtn.classList.add('remove')
        let removeImg = document.createElement('img')
        removeImg.src = "assets/trashBin.png"
        removeImg.id = 'trashBin'
        removeBtn.appendChild(removeImg)
        removeData.appendChild(removeBtn)
        tableRow.appendChild(removeData)

        tableRow.setAttribute('data-set', book.dataset)

        mainTable.appendChild(tableRow)
        if (darkMode) {
            const td = document.querySelectorAll('td')
            td.forEach(data => {
                data.style.borderBottom = '2px dashed var(--cream)';
            })
        }
    })
}
function validateForm(e) {
    e.preventDefault()
    const form = document.querySelector('#bookForm')
    const titleInput = document.querySelector('#titleInput')
    const authorInput = document.querySelector('#authorInput')
    const pagesInput = document.querySelector('#pagesInput')
    if (titleInput.value !== '' && authorInput.value !== '' && pagesInput.value !== '' && pagesInput.value > 0) {
        const formData = new FormData(form);
        let json = JSON.stringify(Object.fromEntries(formData));
        let jsonObject = JSON.parse(json)
    
        if ('status' in jsonObject) {
            addBookToLibrary(jsonObject['title'], jsonObject['author'],
                jsonObject['pages'], "Read")
        } else {
            addBookToLibrary(jsonObject['title'], jsonObject['author'], 
                jsonObject['pages'], "Reading")
        }
        form.reset()
    } else {
        alert('Please fill out the form')
    }

}
function deleteBook(dataset) {
    myLibrary.forEach(book => {
        if (book.dataset == dataset) {
            let index = myLibrary.indexOf(book)
            myLibrary.splice(index, 1)
        }
    })
}
function updateRead(dataset, target) {
    if (target.innerHTML === "Reading") {
        myLibrary.forEach(book => {
            if (book.dataset == dataset) {
                book.status = "Read"
                target.innerHTML = book.status
                target.style.backgroundColor = "rgb(37, 160, 37)";
                if (darkMode) {
                    target.parentElement.style.borderBottom = "2px dashed #F7F1F0";
                }
            }
        })
    } else {
        myLibrary.forEach(book => {
            if (book.dataset == dataset) {
                book.status = "Reading"
                target.innerHTML = book.status
                target.style.backgroundColor = "rgb(185, 67, 67)";
                if (darkMode) {
                    target.parentElement.style.borderBottom = "2px dashed #F7F1F0";
                }
            }
        })
    }
}
function updateCounter() {
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
        if (counter.classList.contains('totalCounter')) {
            counter.innerHTML = myLibrary.length
        } else if (counter.classList.contains('finishedCounter')) {
            counter.innerHTML = myLibrary.filter(book => book.status === "Read").length
        } else {
            counter.innerHTML = myLibrary.filter(book => book.status === "Reading").length
        }
    })
}
function darkModeToggle(target) {
    const html = document.querySelector('html')
    const sidebar = document.querySelector('.sidebar')
    const submitBtn = document.querySelector('#submitBtn')
    const inputs = document.querySelectorAll('input')
    const footer = document.querySelector('.footer')
    const main = document.querySelector('.main')
    const td = document.querySelectorAll('td')
    if (darkMode) {
        target.src = "assets/sun.png"
        sidebar.style.backgroundColor = "#E9C1AF"
        html.style.color = "#1A3246"
        submitBtn.style.backgroundColor = "#1A3246"
        inputs.forEach(input => {
            input.style.borderBottom = "2px dashed #1A3246"
            input.style.setProperty("--c", "#1A3246");
            input.style.color = "#1A3246"
        })
        submitBtn.style.color = "#F7F1F0"
        footer.style.borderTop = "2px solid #1A3246"
        footer.firstElementChild.style.color = "#1A3246"
        main.style.backgroundColor = "white"
        td.forEach(data => {
            data.style.borderBottom = '2px dashed var(--blue)';
        })
        darkMode = false
    } else {
        target.src = "assets/moon.png"
        sidebar.style.backgroundColor = "#424242"
        html.style.color = "#F7F1F0"
        submitBtn.style.backgroundColor = "#3f5ca6"
        inputs.forEach(input => {
            input.style.borderBottom = "2px dashed #3f5ca6"
            input.style.setProperty("--c", "#F7F1F0");
            input.style.color = "#F7F1F0"
        })
        submitBtn.style.color = "#F7F1F0"
        footer.style.borderTop = "2px solid #F7F1F0"
        footer.firstElementChild.style.color = "#F7F1F0"
        main.style.backgroundColor = "#303030"
        td.forEach(data => {
            data.style.borderBottom = '2px dashed var(--cream)';
        })
        darkMode = true
    }
}

document.addEventListener('click', (event) => {
    const { target } = event;
    const inputs = document.querySelectorAll('.input')
    if (target.id === 'submitBtn') {
        validateForm(event)
        updateCounter()
    }
    if (target.id === 'trashAll') {
        myLibrary = []
        displayBooksInLibrary()
        updateCounter()
    }
    if (target.id === 'trashBin') {
        let dataset = target.parentElement.parentElement.parentElement.dataset.set 
        deleteBook(dataset)
        displayBooksInLibrary()
        updateCounter()
    }
    if (target.classList.contains('readStatus')) {
        let dataset = target.parentElement.parentElement.dataset.set
        updateRead(dataset, target)
        displayBooksInLibrary()
        updateCounter()
    }
    if (target.classList.contains('modePic')) {
        darkModeToggle(target)
        displayBooksInLibrary()
    }
})
updateCounter();
displayBooksInLibrary()
