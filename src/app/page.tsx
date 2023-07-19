"use client" // limitation here for BETA https://nextui.org/docs/guide/nextui-plus-nextjs
import {Grid, Spacer} from "@nextui-org/react";
import {useSearch} from "bookly/hook/use-search";
import {NavigationBar} from "bookly/molecules/navigation-bar";
import {Modal} from "bookly/molecules/modal/modal";
import {BookModalBody} from "bookly/components/book-modal-body";
import {BooksTable} from "bookly/components/books-table/books-table";
import {BookForm} from "bookly/components/book-form";
import {BooksGrid} from "bookly/components/books-grid";
import {Pagination} from "bookly/components/pagination";
import {withThemesProvider} from "bookly/theme/with-themes-provider";
import {MainContainer} from "bookly/components/styled/main-container";
import {TableContainer} from "bookly/components/styled/table-container";
import {Search} from "bookly/components/search";
import {usePagination} from "bookly/hook/use-pagination";
import {useBookDetail} from "bookly/hook/use-book-detail";
import {withBookContext} from "bookly/context/with-book-context";
import {useBookContext} from "bookly/context/use-book-context";
import {BooklyPageModel} from "../../cypress/e2e/bookly-page-model";

const PAGE_SIZE = 6;

const Home = () => {
  const {books} = useBookContext()
  const {isBookDetailVisible, openDetail, closeDetail, selectedBook} = useBookDetail()
  const {queryBindings, results} = useSearch(books, ["title", "author", "description"])
  const {currentPageItems, onPageChange} = usePagination(results, PAGE_SIZE)

  return (
    <main>
      <NavigationBar/>
      <MainContainer lg>
        <Spacer y={2}/>
        <Grid.Container direction="row">
          {/* @ts-ignore - auto not supported from typing definition */}
          <Grid xs={12} md="auto">
            <BookForm/>
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
                  onClick={openDetail}
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
                  <BooksTable books={results} onDetailClick={openDetail}/>
                </TableContainer>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </MainContainer>
      <Modal
        id={BooklyPageModel.BookDetailModal}
        open={isBookDetailVisible && !!selectedBook}
        onClose={closeDetail}
        header={selectedBook?.title ?? '-'}
      >
        {selectedBook && <BookModalBody book={selectedBook}/>}
      </Modal>
    </main>
  )
}

export default withThemesProvider(withBookContext(Home))
