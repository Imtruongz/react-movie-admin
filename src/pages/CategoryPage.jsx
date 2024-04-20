import React, { useEffect, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import GenreModal from "../components/GenreModal";
import { getAllGenres, deleteGenreApi } from "../services/genreService";
import PaginationFooter from "../components/Pagination";
import Search from "../components/Search";

const TABLE_HEAD = ["Ordinal", "Name", "Edit"];



export default function CategoryPage() {
  const [genreModal, setGenreModal] = useState(false);
  const [genre, setGenre] = useState(null);
  const [check, setCheck] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleGenreModal = ({ genreID }) => {
    setGenreModal(!genreModal);
    setGenre(genreID);
    console.log(genre);
    if (!genreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  };

  const getGenres = async () => {
    try {
      let response = await getAllGenres("ALL");
      setTableRows(response.genres);
    } catch (error) {
      console.error(`Lỗi khi gọi API:`, error);
    }
  };

  const deleteGenre = async ({ genreID }) => {
    try {
      await deleteGenreApi(genreID);
      setCheck(!check);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, [check || genreModal]);

  const ITEMS_PER_PAGE = 6;
  
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
      <div className="h-[calc(100vh-136px)]">
        <Card className="h-full w-full flex flex-col justify-between ">
          <div>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none flex flex-row justify-between items-center mt-2 my-2 mx-2"
            >
              <Search />
              <div>
                <Button
                  color="blue"
                  className="py-2.5"
                  onClick={() => {
                    toggleGenreModal({ genre });
                    setClickAdd(true);
                  }}
                >
                  Add genre
                </Button>
              </div>
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
                  {visibleItems.map(({ name, genreID }, index) => {
                    const isLast = index === visibleItems.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={genreID}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {genreID}
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
                                toggleGenreModal({ genreID });
                              }}
                            >
                              <PencilIcon className="h-4 w-4 text-yellow-800" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Actor">
                            <IconButton
                              variant="text"
                              onClick={() => deleteGenre({ genreID })}
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
            {genreModal && (
              <GenreModal
                toggleGenreModal={toggleGenreModal}
                title={clickAdd ? "Add" : "Edit"}
                genreID={genre}
              />
            )}
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
