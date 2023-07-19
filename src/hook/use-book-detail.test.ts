import {act, renderHook, waitFor} from "@testing-library/react";
import {useBookDetail} from "bookly/hook/use-book-detail";
import {expect} from '@jest/globals';
import {Book} from "bookly/model/book";

describe('useBookDetail', () => {
  describe('open detail', () => {
    it('should set `isBookDetailVisible` to `true` and set `selectedBook`', () => {
      const testCaseBook: Book = { title: 'Testing title', author: 'Test author', description: 'Test description', key: 'Test key' }
      const { result } = renderHook(() => useBookDetail())

      expect(result.current.isBookDetailVisible).toBe(false)

      act(() => {
        result.current.openDetail(testCaseBook)
      });

      waitFor(() => {
        expect(result.current.isBookDetailVisible).toBe(true)
        expect(result.current.selectedBook).toStrictEqual(testCaseBook)
      })
    })
  })
});