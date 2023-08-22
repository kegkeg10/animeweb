import { useState } from "react";
import { Button } from "react-bootstrap";

const Pagination = () => {
const [currentPage, setCurrentPage] = useState(1);
const [maxPageLimit, setMaxPageLimit] = useState(5);
const [minPageLimit, setMinPageLimit] = useState(1);
console.log(setMaxPageLimit, setMinPageLimit);

const handlePageChange = (newPage) => {
    if (newPage >= minPageLimit && newPage <= maxPageLimit) {
        setCurrentPage(newPage);
    }
};

return (
    <div className="d-flex justify-content-center mt-4">
        <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === minPageLimit}
        >
            Previous
        </Button>
        <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === maxPageLimit}
            className="ms-2"
        >
            Next
        </Button>
    </div>
    );
};

export default Pagination;
