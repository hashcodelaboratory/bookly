"use client" // limitation here for BETA https://nextui.org/docs/guide/nextui-plus-nextjs
import {Grid, Spacer, useInput} from "@nextui-org/react";
import {useState} from "react";
import {useSearch} from "bookly/hook/use-search";
import {Book} from "bookly/model/book";
import {NavigationBar} from "bookly/molecules/navigation-bar";
import {Modal} from "bookly/molecules/modal/modal";
import {BookModalBody} from "bookly/components/book-modal-body";
import {BooksTable} from "bookly/components/books-table/books-table";
import {BookForm} from "bookly/components/book-form";
import {BooksGrid} from "bookly/components/books-grid";
import {Pagination} from "bookly/components/pagination";
import {v4} from "uuid";
import {withThemesProvider} from "bookly/theme/with-themes-provider";
import {MainContainer} from "bookly/components/styled/main-container";
import {TableContainer} from "bookly/components/styled/table-container";
import {Search} from "bookly/components/search";
import {usePagination} from "bookly/hook/use-pagination";

const PAGE_SIZE = 6;

const Home = () => {
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const openBookDetailModal = () => setIsBookModalVisible(true);
  const closeBookDetailModal = () => setIsBookModalVisible(false);

  const [books, setBooks] = useState<Book[]>([])
  const {value: title, reset: titleReset, bindings: titleBindings} = useInput("");
  const {value: author, reset: authorReset, bindings: authorBindings} = useInput("");
  const {value: description, reset: descriptionReset, bindings: descriptionBindings} = useInput("");

  const {queryBindings, results} = useSearch(books, ["title", "author", "description"])
  const {currentPageItems, onPageChange} = usePagination(results, PAGE_SIZE)

  const onSave = () => {
    setBooks([...books, {title, author, description, key: v4()}])

    titleReset()
    authorReset()
    descriptionReset()
  }

  const openDetail = (book: Book) => {
    openBookDetailModal()
    setSelectedBook(book)
  }

  return (
    <main>
      <NavigationBar/>
      <MainContainer lg>
        <Spacer y={2}/>
        <Grid.Container direction="row">
          {/* @ts-ignore - auto not supported from typing definition */}
          <Grid xs={12} md="auto">
            <BookForm
              titleBindings={titleBindings}
              authorBindings={authorBindings}
              descriptionBindings={descriptionBindings}
              onSubmit={onSave}
            />
          </Grid>
          {/* gap is not working as expected */}
          <Grid>
            <Spacer x={2} y={4}/>
          </Grid>
          {/* @ts-ignore - auto not supported from typing definition */}
          <Grid xs={12} md="auto">
            <Grid.Container direction="column">
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs="auto">
                <Search queryBindings={queryBindings}/>
              </Grid>
              {/* gap is not working as expected */}
              <Grid>
                <Spacer y={1}/>
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs="auto" md={0}>
                <BooksGrid
                  books={currentPageItems}
                  onPress={openDetail}
                />
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs="auto" md={0} justify="center">
                <Pagination
                  length={results.length}
                  onChange={onPageChange}
                  pageSize={PAGE_SIZE}
                />
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs={0} md="auto">
                <TableContainer gap={0}>
                  <BooksTable books={results} onDetailPress={openDetail}/>
                </TableContainer>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </MainContainer>
      <Modal
        open={isBookModalVisible && !!selectedBook}
        onClose={closeBookDetailModal}
        header={selectedBook?.title ?? '-'}
      >
        {selectedBook && <BookModalBody book={selectedBook}/>}
      </Modal>
    </main>
  )
}

export default withThemesProvider(Home)
