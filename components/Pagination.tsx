import { useRouter } from "next/router";
import paginationStyles from "./pagination.module.css";
import { DEFAULT_PAGE } from "../lib/Global";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ totalPages, page }: PaginationProps) {
  const router = useRouter();

  return totalPages <= DEFAULT_PAGE ? null : (
    <div className={`${paginationStyles.pagination}`}>
      {page === DEFAULT_PAGE ? null : (
        <button
          onClick={() => {
            router.push(`${router.pathname}?page=${page - 1}`);
          }}
        >
          Prev
        </button>
      )}
      <span>
        {page}/{totalPages}
      </span>
      {page === totalPages ? null : (
        <button
          onClick={() => {
            router.push(`${router.pathname}?page=${page + 1}`);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
