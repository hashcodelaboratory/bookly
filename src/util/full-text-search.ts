import FuzzySearch from "fuzzy-search";

export const fullTextSearch = <T extends object, >(query: string, data: T[], properties: (keyof T)[]): T[] => {
  if (!query) {
    return data
  }

  const matchedData: T[] = [];

  const lowerCasedQuery = query.toLowerCase();
  for (const item of data) {
    const terms: string[] = properties.map((property) => (item[property] as string).toLowerCase());

    if (terms.some((term) => term.includes(lowerCasedQuery))) {
      matchedData.push(item);
    }
  }

  const searcher = new FuzzySearch<T>(data, properties as string[], {
    caseSensitive: false,
    sort: true,
  });

  const fuzzyMatches: T[] = searcher.search(lowerCasedQuery);

  return matchedData.concat(fuzzyMatches.filter(
    (fuzzyMatch) => !matchedData.some((doc) => doc === fuzzyMatch)
  ));
}