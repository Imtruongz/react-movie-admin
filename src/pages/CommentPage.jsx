import React from "react";

import { useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

// import CommentModal from "../components/CommentModal";
// import { getAllcomments, deletecommentApi } from "../services/commentService";
import PaginationFooter from "../components/Pagination";
import Search from "../components/Search";

const TABLE_HEAD = ["User", "Movie", "Content", "Date", "Edit"];
const ITEMS_PER_PAGE = 6;

export default function CommentPage() {
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState(null);
  const [check, setCheck] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCommentModal = ({ commentID }) => {
    setCommentModal(!commentModal);
    setComment(commentID);
    console.log(comment);
    if (!commentModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  // const getComment = async () => {
  //   try {
  //     let response = await getAllComment("ALL");
  //     setTableRows(response.Comment);
  //   } catch (error) {
  //     console.error(`Lỗi khi gọi API:`, error);
  //   }
  // };

  // const deleteGenre = async ({ genreID }) => {
  //   try {
  //     await deleteGenreApi(genreID);
  //     setCheck(!check);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getComment();
  // }, [check || genreModal]);

  const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleItems = tableRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <div className="rounded-lg h-[calc(100vh-136px)]">
        <Card className="h-full w-full flex flex-col justify-between ">
          <div>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none flex flex-row justify-between items-center mt-2 my-2 mx-2"
            >
              <Search />
            </CardHeader>
            <CardBody className="p-1 px-0">
              <table className=" w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 ${
                          index === TABLE_HEAD.length - 1 ? "pl-6" : ""
                        }`}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleItems.map(({ name, commentID }, index) => {
                    const isLast = index === visibleItems.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "px-4 pt-4 pb-3 border-b border-blue-gray-50";
                    return (
                      <tr key={commentID}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {commentID}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="flex flex-col min-w-80">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit Actor">
                            <IconButton
                              variant="text"
                              onClick={() => {
                                setClickAdd(false);
                                toggleCommentModal({ commentID });
                              }}
                            >
                              <PencilIcon className="h-4 w-4 text-yellow-800" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Actor">
                            <IconButton
                              variant="text"
                              // onClick={() => deleteComment({ commentID })}
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </div>
          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </Card>
      </div>
    </div>
  );
}
