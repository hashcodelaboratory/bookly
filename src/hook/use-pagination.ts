import {useEffect, useState} from "react";

export const usePagination = <T,>(items: T[], pageSize: number) => {
  const [currentPageItems, setCurrentPageItems] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page)

  useEffect(() => {
    const index = (currentPage - 1) * pageSize
    const pageItems = items.slice(index, index + pageSize)

    setCurrentPageItems(pageItems)
  }, [items, currentPage, pageSize])

  return {
    onPageChange,
    currentPageItems
  }
}