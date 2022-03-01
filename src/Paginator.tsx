import { Propsinator } from "./type";
import "../src/style.css";

export const Paginator = ({ page, totalPage, onPageChange }: Propsinator) => {
  let firstPage = page - 2;
  if (firstPage < 1) firstPage = 1;
  if (firstPage > totalPage - 4) firstPage = page - 4;
  if (firstPage < 1) firstPage = page;
  let lastPage = firstPage + 4;
  if (lastPage > totalPage) lastPage = totalPage;

  const pageNumbers = [];

  for (let i = firstPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        type="button"
        style={{ borderRadius: "4px 0px 0px 4px" }}
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => onPageChange(1)}
      >
        First Page
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          type="button"
          className={
            page === number ? "pagination__btn__active" : "pagination__btn"
          }
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        style={{ borderRadius: "0px 4px 4px 0px" }}
        className="pagination__btn"
        disabled={page === pageNumbers.length}
        onClick={() => onPageChange(totalPage)}
      >
        Last Page
      </button>
    </div>
  );
};
