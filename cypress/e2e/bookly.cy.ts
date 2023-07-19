import {BooklyPageModel} from "./bookly-page-model";
import {Book} from "bookly/model/book";
const getIdentifier = (id: string) => `#${id}`

const getElementById = (id: string) => cy.get(getIdentifier(id));

const loadApp = () => cy.visit('http://localhost:3000')

const testBookData: Book = { title: 'Test title', author: 'Test author', description: 'Test description', key: '<book-key>' }

const registerNewBook = ({title, author, description}: Book) => {
  const {BookTitleInput, BookAuthorInput,BookDescriptionTextArea, BookRegistrationSubmitButton} = BooklyPageModel

  const titleInput = getElementById(BookTitleInput);
  titleInput.clear();
  titleInput.type(title);

  const authorInput = getElementById(BookAuthorInput);
  authorInput.clear();
  authorInput.type(author);

  const descriptionTextArea = getElementById(BookDescriptionTextArea);
  descriptionTextArea.clear();
  descriptionTextArea.type(description);

  const submitButton = getElementById(BookRegistrationSubmitButton);
  submitButton.click();
}

describe('bookly', () => {
  beforeEach(loadApp)


  it('should load web page successfully', () => {
    cy.get('.loader')
      .should('not.exist')
  })

  it('should switch theme', () =>  {
    const { ThemeSwitch} = BooklyPageModel

    const themeSwitch = getElementById(ThemeSwitch);
    themeSwitch.click();
    themeSwitch.should('have.attr', 'data-state', 'checked');
    themeSwitch.click();
    themeSwitch.should('have.attr', 'data-state', 'unchecked');
  });

  it('should register new book', () => {
    registerNewBook(testBookData)
  });

  it('should register new book and display detail modal and it should be able to also close the detail', () => {
    const { BookDetailModal, BooksTableDetailButton, BookDetailModalCancelButton} = BooklyPageModel

    registerNewBook(testBookData)

    const detailButton = getElementById(BooksTableDetailButton.replace('<index>', '0'))

    detailButton.should('exist')
    detailButton.click()

    const bookDetailModal = getElementById(BookDetailModal)
    bookDetailModal.should('exist')

    const bookDetailModalCancelButton = getElementById(BookDetailModalCancelButton)
    bookDetailModalCancelButton.should('exist')
    bookDetailModalCancelButton.click()

    bookDetailModal.should('not.exist')
  })

  it('should be able to filter table of books by title', () => {
    const anotherBookTitle = 'Another book'

    const { BookSearchInput, BookTitleInTableRow } = BooklyPageModel

    registerNewBook(testBookData)
    registerNewBook({...testBookData, title: anotherBookTitle})

    let firstBook = getElementById(BookTitleInTableRow + "-" + testBookData.title.replace(' ', '-'))
    firstBook.should('exist')
    let secondBook = getElementById(BookTitleInTableRow + "-" + anotherBookTitle.replace(' ', '-'))
    secondBook.should('exist')

    const searchInput = getElementById(BookSearchInput)
    searchInput.should('exist')
    searchInput.clear()
    searchInput.type(anotherBookTitle)

    getElementById(BookTitleInTableRow + "-" + testBookData.title.replace(' ', '-')).should('not.exist')
    getElementById(BookTitleInTableRow + "-" + anotherBookTitle.replace(' ', '-')).should('exist')
  })
})