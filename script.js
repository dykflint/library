// Class constructor 
class Book {
    constructor(title, author, numPages, readStatus) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.readStatus = readStatus;
        this.info = function() {
            return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.readStatus}.`
        };
    }
}

// the class version of the library project
const bookCardsContainer = document.querySelector('#book-cards');
const submitNewBookButton = document.querySelector('#submit-book');
// Books array
const myLibrary = [];
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const harryPotterPS = new Book("Harry and the Philosopher's Stone", "J.K. Rowling", "223", "read")
myLibrary.push(theHobbit);
myLibrary.push(harryPotterPS);
// A constructor for books
// It contains the title, author, number of pages and whether the book has been read 



function addBookToLibrary(event) {
    // get input values and reset them for next book
    bookTitle = document.getElementById("book-title").value;
    bookAuthor = document.getElementById("book-author").value;
    numPages = document.getElementById("num-pages").value;
    readStatus = document.querySelector('input[name="read-status"]:checked').value;
    newBook = new Book(bookTitle, bookAuthor, numPages, readStatus);
    myLibrary.push(newBook);
    bookCardsContainer.innerHTML = "";
    showBookCards(myLibrary);
    addButtonFunctions();
}

function showBookCards(bookArr) {
    bookArr.forEach((element, i) => {
        // Create book card container and add bookCard class to it for styling
        // Additionally, create all elements of the container and add them to the bookCard div
        cardDiv = document.createElement('div')
        cardDiv.classList.add('bookCard');
        title = document.createElement('h1');
        title.innerText = element.title;
        cardDiv.appendChild(title)
        author = document.createElement('h3');
        author.innerText = element.author;
        cardDiv.appendChild(author)
        pages = document.createElement('p');
        pages.innerText = element.numPages;
        cardDiv.appendChild(pages);
        readStatus = document.createElement('button');
        // readStatus.innerHTML = `<button class="readStatus ${element.readStatus.replace(" ","")}" onclick=toggleRead(this, ${i})>not read yet</button>`;
        readStatus.classList.add("readStatus");
        readStatus.setAttribute("data-index", i);
        currentReadStatus = element.readStatus;
        readStatus.classList.add(currentReadStatus.replace(/[^a-zA-Z0-9]/g, ''));
        readStatus.innerText = element.readStatus;
        cardDiv.appendChild(readStatus);
        removeButton = document.createElement('button');
        removeButton.classList.add("removeBook");
        removeButton.setAttribute("data-index", i);
        removeButton.innerText = "Remove";
        cardDiv.appendChild(removeButton);
        bookCardsContainer.appendChild(cardDiv);
    });
}
// Toggle read sattus of book and update library
function toggleRead(readStatusButton, index) {
    if(readStatusButton.innerText == "read"){
        myLibrary[index].readStatus = "not read yet";
        readStatusButton.innerText = "not read yet";
        readStatusButton.classList.remove("read");
        readStatusButton.classList.add("notreadyet");
    } else {
        myLibrary[index].readStatus = "read";
        readStatusButton.innerText = "read";
        readStatusButton.classList.remove("notreadyet");
        readStatusButton.classList.add("read");
    }
}
// Get all readButtons and removeButtons on the cards and add an event listener to toggle on and off the read status
function addButtonFunctions(){
    const allReadButtons = document.querySelectorAll('.readStatus');
    allReadButtons.forEach(readButton => {
        console.log(readButton);
        readButton.addEventListener("click", function() {toggleRead(readButton, readButton.getAttribute("data-index"))});
    })
    const allRemoveBookButtons = document.querySelectorAll('.removeBook');
    allRemoveBookButtons.forEach(removeButton => {
        console.log(removeButton);
        removeButton.addEventListener("click", function() {removeBook(removeButton.getAttribute("data-index"))});
    })
}
// Remove book from library
function removeBook(index) {
    const removedBook = myLibrary.splice(index,1);
    console.log(myLibrary);
    bookCardsContainer.innerHTML = "";
    showBookCards(myLibrary);
    addButtonFunctions();
}
// Submit new book to library and update library
submitNewBookButton.addEventListener("click", (event) => {
    // disbale default submit behavior of form button
    event.preventDefault();
    addBookToLibrary(event);
});
showBookCards(myLibrary);
addButtonFunctions();
