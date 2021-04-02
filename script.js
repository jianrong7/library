let myLibrary = [];
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
    displayBooksInLibrary()
}
function displayBooksInLibrary() {
    while (mainTable.rows.length > 1) {
        mainTable.deleteRow(1);
    }
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
        let removeData = document.createElement('td')
        let removeBtn = document.createElement('button')
        removeBtn.classList.add('remove')
        let removeImg = document.createElement('img')
        removeImg.src = "assets/trashBin.png"
        removeImg.id = 'trashBin'
        removeBtn.appendChild(removeImg)
        removeData.appendChild(removeBtn)
        tableRow.appendChild(removeData)
        
        mainTable.appendChild(tableRow)
    })
}
function validateForm(e) {
    e.preventDefault()
    const form = document.querySelector('#bookForm')
    console.log(form)
    const formData = new FormData(form);
    let json = JSON.stringify(Object.fromEntries(formData));
    let jsonObject = JSON.parse(json)


    console.log(jsonObject)
    console.log(jsonObject['title'])
    if ('status' in jsonObject) {
        addBookToLibrary(jsonObject['title'], jsonObject['author'], jsonObject['pages'], "Yes")
    } else {
        addBookToLibrary(jsonObject['title'], jsonObject['author'], jsonObject['pages'], "No")
    }
    form.reset()
}
document.addEventListener('click', (event) => {
    const { target } = event;
    if (target.id === 'submitBtn') {
        validateForm(event)
    }
    if (target.id === 'trashAll') {
        myLibrary = []
        displayBooksInLibrary()   
    }
})