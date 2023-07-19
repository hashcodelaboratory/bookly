import {useInput} from "@nextui-org/react";
import {useMemo} from "react";
import {fullTextSearch} from "bookly/util/full-text-search";

export const useSearch = <T extends object,>(data: T[], properties: (keyof T)[]) => {
  const {value: query, bindings: queryBindings} = useInput("");

  const results = useMemo(
    () => {
      return fullTextSearch<T>(query, data, properties)
    },
    [query, data, properties]
  )

  return {
    results,
    queryBindings
  }
}