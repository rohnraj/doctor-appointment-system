import React from "react";
import styles from "./Pagenation.module.css";

interface PaginationProps {
  page: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, handlePageChange, totalPages }) => {
  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <button 
          className={`${styles.pageBtn} ${page === 1 ? styles.disabled : ""}`} 
          onClick={() => {
            console.log('page-1')
            handlePageChange(page - 1)
          }}
          disabled={page === 1}
        >
          ◄ Prev
        </button>
      )}

      <p>
        Page {page} of {totalPages}
      </p>

      {page < totalPages && (
        <button 
          className={`${styles.pageBtn} ${page === totalPages ? styles.disabled : ""}`} 
          onClick={() => {
            console.log('page+1')
            handlePageChange(page + 1)
          }}
          disabled={page === totalPages}
        >
          Next ►
        </button>
      )}
    </div>
  );
};

export default Pagination;
