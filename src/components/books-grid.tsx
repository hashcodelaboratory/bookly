import {Card, Grid, Text} from "@nextui-org/react";
import {BookModalBody} from "bookly/components/book-modal-body";
import {Book} from "bookly/model/book";

type BooksGridProps = {
  books: Book[]
  onClick: (book: Book) => void
}

export const BooksGrid = ({books, onClick}: BooksGridProps) => {
  const onGridItemPress = (book: Book) => () => onClick(book)

  return <Grid.Container gap={1} css={{paddingBottom: '2rem'}}>
    {books.map((book) =>
      <Grid key={book.key} xs>
        <Card isHoverable isPressable variant="flat" onClick={onGridItemPress(book)}>
          <Card.Header>
            <Text
              b
              size={24}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
            >
              {book.title}
            </Text>
          </Card.Header>
          <Card.Body>
            <BookModalBody book={book}/>
          </Card.Body>
        </Card>
      </Grid>)}
  </Grid.Container>
}