import React, { useEffect, useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import PaginationFooter from "../components/Pagination";
import Search from "../components/Search";
import {
  deleteMovie,
  getAllMovies,
  searchMovieApi,
} from "../services/movieService";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Title", "Country", "Release", "Description", "Edit"];

const ITEMS_PER_PAGE = 6;

export default function MoviePage() {
  const naviaget = useNavigate();
  const [check, setCheck] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [country, setCountry] = useState();

  // * State for searching
  const [valueSearch, setValueSearch] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleChangeInputSearch = (value) => {
    setValueSearch(value);
    debouncedHandleSearch(value);
  };

  const getMovie = async () => {
    try {
      let response = await getAllMovies("ALL");
      setTableRows(response.movies);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  const delteMovie = async ({ movieID }) => {
    try {
      toast("✅ Delete movie successful");

      await deleteMovie(movieID);
      setCheck(!check);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (keyword) => {
    try {
      let response = await searchMovieApi(keyword);
      setTableRows(response.movie.movieSearch);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  useEffect(() => {
    getMovie().then(
      setTimeout(() => {
        setDataLoaded(true);
      }, 2000)
    );
  }, [check]);

  const totalPages = dataLoaded
    ? Math.ceil(tableRows.length / ITEMS_PER_PAGE)
    : 1;

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
              <Search
                value={valueSearch}
                handleChange={handleChangeInputSearch}
              />
              <div>
                <Button
                  color="blue"
                  className="py-2.5"
                  onClick={() => naviaget("create-movie")}
                >
                  Add movie
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-1 px-0">
              {!dataLoaded ? (
                Array.from(
                  {
                    length:
                      tableRows.length > 6 ? ITEMS_PER_PAGE : tableRows.length,
                  },
                  (_, index) => (
                    <div className="p-4">
                      <Typography
                        as="div"
                        variant="paragraph"
                        className=" h-6 w-full rounded-full bg-gray-300 my-2"
                        key={index}
                      >
                        &nbsp;
                      </Typography>
                    </div>
                  )
                )
              ) : (
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
                    {visibleItems.map(
                      (
                        { movieID, title, release, description, thumbnail },
                        index
                      ) => {
                        const isLast = index === tableRows.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "px-4 pt-4 pb-3 border-b border-blue-gray-50";

                        return (
                          <tr key={title}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar src={thumbnail} alt={title} size="sm" />

                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {title}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {country}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {release}
                              </Typography>
                            </td>
                            <td
                              className={classes}
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal whitespace-nowrap max-w-28"
                              >
                                {description}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Tooltip content="Edit Movie">
                                <IconButton
                                  variant="text"
                                  onClick={() =>
                                    naviaget(`edit-movie/:${movieID}`)
                                  }
                                >
                                  <PencilIcon className="h-4 w-4 text-yellow-800" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="Delete Movie">
                                <IconButton
                                  variant="text"
                                  onClick={() => delteMovie({ movieID })}
                                >
                                  <TrashIcon className="h-4 w-4 text-red-500" />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              )}
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
