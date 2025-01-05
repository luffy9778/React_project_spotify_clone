import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPaginate from "react-paginate";
const PaginationBar = ({ currentPage, setCurrentPage, totalPages }) => {
  //   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    // <div className="flex justify-end p-2 absolute bottom-0 right-6">
    //   <button
    //     className="text-2xl"
    //     onClick={() => {
    //       setCurrentPage(currentPage - 1);
    //     }}
    //     disabled={currentPage === 1}
    //   >
    //     <FontAwesomeIcon icon={faAngleLeft} />
    //   </button>
    //   {pageNumbers.map((i) => (
    //     <button className="rounded-full w-7 h-7 bg-slate-800 flex items-center justify-center mx-2"
    //     onClick={()=>setCurrentPage(i)}
    //     disabled={currentPage==i}>
    //       {i}
    //     </button>
    //   ))}
    //   <button className="text-2xl" onClick={() => {
    //       setCurrentPage(currentPage + 1);
    //     }}
    //     disabled={currentPage === totalPages}>
    //     <FontAwesomeIcon icon={faAngleRight} />
    //   </button>
    // </div>
    <div className="flex justify-end p-2 absolute bottom-0 right-6">
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(data) => {
          setCurrentPage(data.selected + 1);
        }}
        containerClassName="flex items-center"
        pageClassName="rounded-full w-7 h-7 bg-slate-800 flex items-center justify-center mx-2"
        activeClassName="bg-violet-700 text-white"
        disabledClassName="text-gray-500"
        previousClassName="text-2xl"
        nextClassName="text-2xl"
      />
    </div>
  );
};

export default PaginationBar;
