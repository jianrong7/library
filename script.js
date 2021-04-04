let myLibrary = [];

const mainTable = document.querySelector('.mainTable')

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.dataset = title + author
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
        addBookToLibrary(jsonObject['title'], jsonObject['author'],
            jsonObject['pages'], "Read")
    } else {
        addBookToLibrary(jsonObject['title'], jsonObject['author'], 
            jsonObject['pages'], "Reading")
    }
    form.reset()
}
function deleteBook(dataset) {
    myLibrary.forEach(book => {
        if (book.dataset == dataset) {
            let index = myLibrary.indexOf(book)
            myLibrary.splice(index, 1)
        }
    })
}
function updateRead(dataset) {
    if (target.innerHTML === "Reading") {
        myLibrary.forEach(book => {
            if (book.dataset == dataset) {
                book.status = "Read"
                target.innerHTML = book.status
                target.style.backgroundColor = "rgb(37, 160, 37)";
            }
        })
    } else {
        myLibrary.forEach(book => {
            if (book.dataset == dataset) {
                book.status = "Reading"
                target.innerHTML = book.status
                target.style.backgroundColor = "rgb(185, 67, 67)";
            }
        })
    }
}
function updateCounter() {
    const totalCount = document.querySelector('.totalCounter')
    totalCount.innerHTML = myLibrary.length
}
document.addEventListener('click', (event) => {
    const { target } = event;
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
        updateRead(dataset)
    }
})