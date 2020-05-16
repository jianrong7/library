let myLibrary = [
    //{title: "hi", author: "hihi", pages: "12", read: "have read"}
];
let cards = document.querySelector(".cards");
const addBookBtn = document.querySelector("#addBook");

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
        toggle.textContent = "Toggle";
        bookCard.appendChild(toggle);

        cards.appendChild(bookCard);
    })
}

addBookBtn.addEventListener("click", function() {
    const readStatus = document.getElementById("readOrNot")
    let bookTitle = document.forms["BookForm"]["title"];
    let bookAuthor = document.forms["BookForm"]["author"];
    let bookPages = document.forms["BookForm"]["pages"];
    if (readStatus == true) {
        let bookRead = "have read"
    } else {
        let bookRead = "have not read"
    }
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead);
    render();
})