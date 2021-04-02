let myLibrary = [
    {
        title: "Hello",
        author: "World",
        pages: 123,
        status: true
    },
    {
        title: "Goodbye",
        author: "Sir",
        pages: 456,
        status: false
    },
    {
        title: "ecks",
        author: "deee",
        pages: 987,
        status: false
    }
];
const mainTable = document.querySelector('.mainTable')

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
        statusData.innerText = book.status
        tableRow.appendChild(statusData)

        // Remove Button
        let removeButton = document.createElement('td')
        removeButton.innerText = "Remove"
        tableRow.appendChild(removeButton)
        
        mainTable.appendChild(tableRow)
    })
}
document.querySelector('#bookForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    let checkedValue = document.querySelector('#checkbox').checked;
    let json = JSON.stringify(Object.fromEntries(formData));
    console.log(json)
    if (checkedValue) {
        json['checked'] = true
        console.log(json)
    } else {
        json['checked'] = "false"
        console.log(json)
    }
    console.log(checkedValue)
    console.log(json)
  });