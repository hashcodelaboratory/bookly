"use client" // limitation here for BETA https://nextui.org/docs/guide/nextui-plus-nextjs
import {
  Button,
  Container,
  createTheme,
  Grid,
  Input,
  Modal,
  NextUIProvider,
  Spacer,
  Table,
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
import {NavigationBar} from "bookly/components/navigation-bar";

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#3ABEFF',
    }
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#7F5AF0',
    }
  }
})

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "action",
    label: "Action",
  },
];

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
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
          <Container lg>
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
                      clearable
                      fullWidth
                    />
                  </Grid>
                  {/* gap is not working as expected */}
                  <Grid>
                    <Spacer y={1}/>
                  </Grid>
                  <Grid>
                    <Container style={{maxWidth: '100%', overflow: "hidden"}} gap={0}>
                      <Table
                        shadow={false}
                        css={{
                          padding: "0",
                          height: "auto",
                          minWidth: "100%",
                        }}
                        color="primary"
                        // @ts-ignore prevent table border
                        borderWeight={0}
                      >
                        <Table.Header columns={columns}>
                          {({key, label}) => (
                            <Table.Column allowsSorting align={key === 'action' ? 'end' : 'start'} key={key}>{label}</Table.Column>
                          )}
                        </Table.Header>
                        <Table.Body items={results}>
                          {(item) => (
                            <Table.Row key={item.key}>
                              {(columnKey) => columnKey === "action" ? <Table.Cell css={{ paddingRight: 0 }}><Button css={{ float: 'right' }} onPress={() => {
                                  setSelectedBook(item)
                                  handler()
                              }} flat color="primary" auto>
                                Detail
                              </Button></Table.Cell> : <Table.Cell css={{
                                maxWidth: '100px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>{item[columnKey as keyof typeof item]}</Table.Cell>}
                            </Table.Row>
                          )}
                        </Table.Body>
                        <Table.Pagination
                          css={{display: results.length > 0 ? undefined : 'none'}}
                          rounded
                          align="center"
                          rowsPerPage={8}
                          onPageChange={(page) => console.log({page})}
                        />
                      </Table>
                    </Container>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Container>
          <Modal
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text b size={18} id="modal-title">
                {selectedBook?.title}
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text size={14}>
                <Text b size={14}>Author:</Text> {selectedBook?.author ?? '-'}
              </Text>
              <Text size={14}>
                <Text b size={14}>Description:</Text> {selectedBook?.description ?? '-'}
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </main>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default Home
