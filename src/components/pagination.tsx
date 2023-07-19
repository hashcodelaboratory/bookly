import {Pagination as NextUIPagination} from "@nextui-org/react";

type PaginationProps = {
  length: number
  onChange: (page: number) => void;
  pageSize: number;
}

export const Pagination = <T,>({length, onChange, pageSize}: PaginationProps) => {
  if (!length) {
    return null
  }

  const total = Math.ceil(length / pageSize)

  return <>
    <NextUIPagination
      initialPage={1}
      onChange={onChange}
      onlyDots
      rounded
      size="sm"
      total={total}
    />
  </>
}