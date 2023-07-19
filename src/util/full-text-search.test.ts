import {fullTextSearch} from "bookly/util/full-text-search";
import {expect} from '@jest/globals';
import FuzzySearch from "fuzzy-search";

jest.mock("fuzzy-search", () => ({
  __esModule: true,
  default: jest.fn()
}))

const testCaseData = [{ s: "test"}, {s: "test2"}]

describe('fullTextSearch', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should early exit with initial data if there is no query', () => {
    const result = fullTextSearch('', testCaseData, ["s"])

    expect(result).toStrictEqual(testCaseData)
  })

  it('should integrate Fuzzy search to search also probability of typos in words', () => {
    const mockedFuzzySearch = jest.fn().mockReturnValue([]);
    // @ts-ignore
    (FuzzySearch as jest.Mock).mockImplementation(() => ({
      search: mockedFuzzySearch
    }))
    const result = fullTextSearch('2', testCaseData, ["s"])

    expect(FuzzySearch).toHaveBeenCalledTimes(1)
    expect(FuzzySearch).toHaveBeenCalledWith(testCaseData, ["s"], {caseSensitive: false, sort: true})
    expect(mockedFuzzySearch).toHaveBeenCalledTimes(1)
    expect(mockedFuzzySearch).toHaveBeenCalledWith('2')

    expect(result).toStrictEqual([{s: 'test2'}])
  })

  it('should concatenate exact matches with results from Fuzzy search', () => {
    const mockedFuzzySearch = jest.fn().mockReturnValue([{s: 'test3'}]);
    // @ts-ignore
    (FuzzySearch as jest.Mock).mockImplementation(() => ({
      search: mockedFuzzySearch
    }))
    const result = fullTextSearch('2', testCaseData, ["s"])

    expect(FuzzySearch).toHaveBeenCalledTimes(1)
    expect(FuzzySearch).toHaveBeenCalledWith(testCaseData, ["s"], {caseSensitive: false, sort: true})
    expect(mockedFuzzySearch).toHaveBeenCalledTimes(1)
    expect(mockedFuzzySearch).toHaveBeenCalledWith('2')

    expect(result).toStrictEqual([{s: 'test2'}, {s: 'test3'}])
  })
})