import React from "react";
import { CardFooter, Typography, Button } from "@material-tailwind/react";

const PaginationFooter = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-2">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page {currentPage} of {totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button variant="outlined" size="sm" onClick={handlePrevPage}>
          Previous
        </Button>
        <Button variant="outlined" size="sm" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default PaginationFooter;
