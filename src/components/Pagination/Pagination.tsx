import ReactPaginateModule from "react-paginate";
import { type ComponentType } from "react";
import { type ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDeafault<T> = { default: T };

// const ReactPaginate = ReactPaginateModule.default;

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDeafault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface TotalPagesProps {
  totalPages: number;
  setPage: (nextPage: number) => void;
}

export default function Pagination({ totalPages, setPage }: TotalPagesProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={({ selected }) => {
        setPage(selected + 1);
      }}
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
