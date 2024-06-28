import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PaginationFooter from "../components/common/Pagination";
import Search from "../components/common/Search";
import {
  getAllUsers,
  handleDeleteUserApi,
  searchUserApi,
} from "../services/userService";
import { toast } from "react-toastify";

const TABS = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "User",
    value: "user",
  },
  {
    label: "Vip user",
    value: "vipuser",
  },
];

const TABLE_HEAD = ["Name", "Role", "Gender", "Phone number", "Action"];

const ITEMS_PER_PAGE = 6;

export default function AccountPage() {
  const [check, setCheck] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleChangeInputSearch = (value) => {
    setValueSearch(value);
    handleSearch(value);
  };

  const getAccount = async () => {
    try {
      let response = await getAllUsers("ALL");
      setTableRows(response.users);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

	const handleDeleteUser = async ({ userID }) => {
		const user = { userID };
		console.log(user);
		try {
			toast.success(' Delete account success');
			await handleDeleteUserApi(user.userID);
			setCheck(true);
		} catch (error) {
			console.log(error);
		}
	};

  const handleSearch = async (keyword) => {
    try {
      let response = await searchUserApi(keyword);
      setTableRows(response.user.userSearch);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount().then(
      setTimeout(() => {
        setDataLoaded(true);
      }, 2000)
    );
  }, [check]);

  let totalPages;
  if (tableRows) {
    totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);
  } else {
    totalPages = 1;
  }

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

  const visibleItems = tableRows
    ? tableRows.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <div className="h-[calc(100vh-136px)]">
        <Card className="h-full w-full justify-between">
          <div>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none flex flex-row justify-between items-center max-h-14 mt-1"
            >
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row py-20">
                <Tabs value="all" className="w-full md:w-max">
                  <TabsHeader className="w-[500px] z-0">
                    {TABS.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                      </Tab>
                    ))}
                  </TabsHeader>
                </Tabs>
              </div>
              <Search
                value={valueSearch}
                handleChange={handleChangeInputSearch}
              />
            </CardHeader>
            <CardBody className="p-0">
              {dataLoaded && visibleItems.length === 0 ? (
                <Typography
                  variant="body"
                  color="blue-gray"
                  className="p-4 text-center"
                >
                  No accounts found.
                </Typography>
              ) : !dataLoaded ? (
                Array.from(
                  {
                    length:
                      tableRows && tableRows.length > 6
                        ? ITEMS_PER_PAGE
                        : tableRows
                        ? tableRows.length
                        : 0,
                  },
                  (_, index) => (
                    <div className="p-5">
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
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
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
                      ({
                        userID,
                        img,
                        email,
                        fullName,
                        roleID,
                        gender,
                        phoneNumber,
                        address,
                      }) => {
                        const isLast =
                          userID === tableRows[tableRows.length - 1].userID;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";
                        const role = roleID === 1 ? "Admin" : "User";
                        const genderName = gender === 1 ? "Male" : "Female";
                        const avatar =
                          img === ""
                            ? ""
                            : "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
                        return (
                          <tr key={userID}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Avatar src={avatar} alt={fullName} size="sm" />
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {fullName}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {email}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {role}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {genderName}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {phoneNumber}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Link to={`edit-user/:${userID}`}>
                                <Tooltip content="Edit User">
                                  <IconButton variant="text">
                                    <PencilIcon className="h-4 w-4 text-yellow-800" />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                              <Tooltip content="Delete User">
                                <IconButton
                                  variant="text"
                                  onClick={() => handleDeleteUser({ userID })}
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
