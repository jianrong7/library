let myLibrary = [
    {
        title: "Hello",
        author: "World",
        pages: 123,
        status: true;
    },
    {
        title: "Goodbye",
        author: "Sir",
        pages: 456,
        status: false;
    },
    {
        title: "ecks",
        author: "deee",
        pages: 987,
        status: false;
    }
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status)
    myLibrary.push(book)
}

function displayBooksInLibrary() {

}