"use client" // limitation here for BETA https://nextui.org/docs/guide/nextui-plus-nextjs
import {
  Button,
  Card,
  Container,
  createTheme,
  Grid,
  Input,
  NextUIProvider,
  Pagination,
  Spacer,
  Text,
  Textarea,
  useInput
} from "@nextui-org/react";
import {FormEventHandler, SyntheticEvent, useState} from "react";
import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {v4} from "uuid";
import {useSearch} from "bookly/hook/use-search";
import {useValidation} from "bookly/hook/use-validation";
import {Book} from "bookly/model/book";
import {NavigationBar} from "bookly/molecules/navigation-bar";
import {Modal} from "bookly/molecules/modal/modal";
import {BookModalBody} from "bookly/components/book-modal-body";
import {BooksTable} from "bookly/components/books-table/books-table";

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

const PAGE_SIZE = 6;

const Home = () => {
  const [isbookModalVisible, setIsbookModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const [currentPage, setCurrentPage] = useState(1);

  const handler = () => setIsbookModalVisible(true);
  const closeHandler = () => {
    setIsbookModalVisible(false);
  };
  const [books, setBooks] = useState<Book[]>([])
  const {value: title, reset: titleReset, bindings: titleBindings} = useInput("");
  const {value: author, reset: authorReset, bindings: authorBindings} = useInput("");
  const {value: description, reset: descriptionReset, bindings: descriptionBindings} = useInput("");

  const {queryBindings, results} = useSearch(books, ["title", "author", "description"])
  const {enabled, enableValidation, disableValidation, color, isValid} = useValidation(title);

  const onSave: FormEventHandler = (event: SyntheticEvent) => {
    event.preventDefault()

    if (!enabled) {
      enableValidation()
    }

    if (!isValid) {
      return
    }

    setBooks([...books, {title, author, description, key: v4()}])
    titleReset()
    authorReset()
    descriptionReset()
    disableValidation()
  }

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <main>
          <NavigationBar/>
          <Container lg css={{overflow: 'hidden', paddingBottom: '10rem'}}>
            <Spacer y={2}/>
            <Grid.Container direction="row">
              {/* @ts-ignore - auto not supported from typing definition */}
              <Grid xs={12} md="auto">
                <form onSubmit={onSave}>
                  <Grid.Container direction="column">
                    <Grid>
                      <Grid.Container direction="column">
                        <Grid>
                          <Grid.Container direction="row">
                            {/* @ts-ignore - auto not supported from typing definition */}
                            <Grid xs={12} sm="auto">
                              <Input
                                status={color}
                                color={color}
                                helperColor={color}
                                helperText="* required"
                                animated={false}
                                {...titleBindings}
                                label="Title"
                                clearable
                                placeholder="e.g. The Lost City"
                                fullWidth
                              />
                            </Grid>
                            {/* gap is not working as expected */}
                            <Grid>
                              <Spacer x={1}/>
                            </Grid>
                            {/* @ts-ignore - auto not supported from typing definition */}
                            <Grid xs={12} sm="auto">
                              <Input
                                animated={false}
                                status="primary"
                                {...authorBindings}
                                helperText="optional"
                                label="Author"
                                clearable
                                placeholder="e.g. John Doe"
                                fullWidth
                              />
                            </Grid>
                          </Grid.Container>
                        </Grid>
                        {/* gap is not working as expected */}
                        <Grid>
                          <Spacer y={1.5}/>
                        </Grid>
                        <Grid>
                          <Textarea
                            animated={false}
                            status="primary"
                            {...descriptionBindings}
                            helperText={`optional ${description.length} / 300`}
                            label="Description"
                            placeholder="e.g. A thrilling adventure awaits as our heroes embark on a quest to find the lost city."
                            fullWidth
                            maxLength={300}
                          />
                        </Grid>
                      </Grid.Container>
                    </Grid>
                    {/* gap is not working as expected */}
                    <Grid>
                      <Spacer y={2}/>
                    </Grid>
                    <Grid>
                      <Button size="lg" style={{width: '100%', zIndex: 1}} color="gradient" type="submit">Save</Button>
                    </Grid>
                  </Grid.Container>
                </form>
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
                      <Grid.Container gap={1} css={{paddingBottom: '2rem'}}>
                        {results.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE).map((book) =>
                          <Grid key={book.key} xs>
                            <Card isHoverable isPressable variant="flat" onPress={() => {
                              handler()
                              setSelectedBook(book)
                            }}>
                              <Card.Header>
                                <Text b size={24} css={{
                                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                                }}>{book.title}</Text>
                              </Card.Header>
                              <Card.Body>
                                <BookModalBody book={book}/>
                              </Card.Body>
                            </Card>
                          </Grid>)}
                      </Grid.Container>
                    </Grid>
                  </Grid>
                  {/* @ts-ignore - auto not supported from typing definition */}
                  <Grid xs="auto" md={0} justify="center">
                    {results.length > 0 &&
                        <Pagination initialPage={1} onChange={(page) => setCurrentPage(page)} onlyDots rounded size="sm"
                                    total={Math.ceil(results.length / PAGE_SIZE)}/>}
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
          <Modal open={isbookModalVisible && !!selectedBook} onClose={closeHandler} header={selectedBook?.title ?? '-'}>
            {selectedBook && <BookModalBody book={selectedBook}/>}
          </Modal>
        </main>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default Home
