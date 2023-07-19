"use client" // limitation here for BETA https://nextui.org/docs/guide/nextui-plus-nextjs
import {Container, Grid, Input, Spacer, useInput} from "@nextui-org/react";
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

const PAGE_SIZE = 6;

const Home = () => {
  const [isBookModalVisible, setIsBookModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const [currentPage, setCurrentPage] = useState(1);

  const handler = () => setIsBookModalVisible(true);
  const closeHandler = () => {
    setIsBookModalVisible(false);
  };
  const [books, setBooks] = useState<Book[]>([])
  const {value: title, reset: titleReset, bindings: titleBindings} = useInput("");
  const {value: author, reset: authorReset, bindings: authorBindings} = useInput("");
  const {value: description, reset: descriptionReset, bindings: descriptionBindings} = useInput("");

  const {queryBindings, results} = useSearch(books, ["title", "author", "description"])

  const onSave = () => {
    setBooks([...books, {title, author, description, key: v4()}])

    titleReset()
    authorReset()
    descriptionReset()
  }

  return (
    <main>
      <NavigationBar/>
      <Container lg css={{overflow: 'hidden', paddingBottom: '10rem'}}>
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
                <Input
                  {...queryBindings}
                  animated={false}
                  status="primary"
                  label="Search"
                  placeholder="search by title, author or description content..."
                  clearable
                  fullWidth
                />
              </Grid>
              {/* gap is not working as expected */}
              <Grid>
                <Spacer y={1}/>
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs="auto" md={0}>
                <Grid>
                  <BooksGrid
                    books={results.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE)}
                    onPress={(book: Book) => {
                      handler()
                      setSelectedBook(book)
                    }}/>
                </Grid>
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs="auto" md={0} justify="center">
                <Pagination
                  length={books.length}
                  onChange={(page: number) => setCurrentPage(page)}
                  pageSize={PAGE_SIZE}
                />
              </Grid>
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs={0} md="auto">
                <Container css={{maxWidth: '100%', overflow: "hidden"}} gap={0}>
                  <BooksTable books={results} onDetailPress={(book: Book) => {
                    setSelectedBook(book)
                    handler()
                  }}/>
                </Container>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>
      <Modal open={isBookModalVisible && !!selectedBook} onClose={closeHandler} header={selectedBook?.title ?? '-'}>
        {selectedBook && <BookModalBody book={selectedBook}/>}
      </Modal>
    </main>
  )
}

export default withThemesProvider(Home)
