import ReactPaginateModule from "react-paginate";
import { type ComponentType } from "react";
import { type ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

// const ReactPaginate = ReactPaginateModule.default;

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (nextPage: number) => void;
}

export default function Pagination({
  totalPages,
  setPage,
  page,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        setPage(selected + 1);
      }}
      forcePage={page - 1}
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
