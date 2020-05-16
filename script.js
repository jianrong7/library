let myLibrary = [
    //{title: "hi", author: "hihi", pages: "12", read: "have read"}
];
let cards = document.querySelector(".cards");
const addBookBtn = document.querySelector("#addBook");
const toggleBtn = document.querySelectorAll("#toggle");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}
function render() {
    cards.innerHTML = '';
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("p");
        bookCard.classList.add("cardDesign");

        const title = document.createElement("p");
        title.classList.add("bookTitle");
        title.textContent = book.title;
        bookCard.appendChild(title);
        
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;
        bookCard.appendChild(author);

        const pages = document.createElement("p");
        pages.classList.add("pageCount");
        pages.textContent = `${book.pages} pages`;
        bookCard.appendChild(pages);

        const status = document.createElement("p");
        status.classList.add("status");
        status.textContent = `I ${book.read} it.`;
        bookCard.appendChild(status);

        const toggle = document.createElement("button");
        toggle.classList.add("btn");
        toggle.classList.add("btn-info");
        toggle.setAttribute('type', 'button');
        toggle.setAttribute('id', 'toggle');
        toggle.textContent = "Toggle";
        toggle.classList.add("toggle");
        bookCard.appendChild(toggle);

        cards.appendChild(bookCard);
    })
}
function clearFields() {
    document.forms["BookForm"]["title"].value = "";
    document.forms["BookForm"]["author"].value = "";
    document.forms["BookForm"]["pages"].value = "";
}
function isValid(bookTitle, bookAuthor, bookPages) {
    if (bookTitle.value === "") {
        bookTitle.focus();
        alert("Please enter the title");
        return false; 
    }
    if (bookAuthor.value === "") {
        bookAuthor.focus();
        alert("Please enter the author");
        return false; 
    }
    if (bookPages.value === "") {
        bookPages.focus();
        alert("Please enter the number of pages");
        return false; 
    }
    return true;
}
function changeReadStatus(id) {
    let status = document.getElementById(id).previousSibling.textContent;
    if (status == "I have not read it.") {
        status = "I have read it."
    } else {
        status = "I have not read it."
    }
}
function debug(e) {
    return console.log("hi")
}

addBookBtn.addEventListener("click", function() {
    const readStatus = document.getElementById("readOrNot")
    let bookTitle = document.forms["BookForm"]["title"];
    let bookAuthor = document.forms["BookForm"]["author"];
    let bookPages = document.forms["BookForm"]["pages"];
    let bookRead;
    if (readStatus == true) {
        bookRead = "have read"
    } else {
        bookRead = "have not read"
    }
    if (isValid(bookTitle, bookAuthor, bookPages)) {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead);
        render();
        clearFields();
    }
})

const toggleBtns = document.querySelectorAll('.toggle');
toggleBtns.forEach(toggleBtn => toggleBtn.addEventListener('click', debug));
