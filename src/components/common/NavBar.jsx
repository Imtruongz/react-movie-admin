import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { ClockIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../../context/UserContext";

export default function NavBar() {
  const { pathname } = useLocation();
  const { user } = useContext(UserContext);
  const pathParts = pathname.split("/dashboard/")[1].split("/"); // Phân tách đường dẫn sau "/dashboard/"
  const namepage = pathParts[0]; // Lấy phần tử đầu tiên của mảng pathParts

  useEffect(() => {}, []);

  return (
    <div className="flex justify-between items-center bg-bgColorBlock text-textMain h-[80px] px-6 rounded-lg">
      <h1 className="text-2xl font-semibold ">{namepage}</h1>
      <div className="flex items-center gap-4">
        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text" className="">
              <FontAwesomeIcon
                icon={Icons.faBell}
                className="fa-2xl p-2 rounded-xl"
              />
            </IconButton>
          </MenuHandler>
          <MenuList className="w-max border-0">
            <MenuItem className="flex items-center gap-3">
              <Avatar
                src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                alt="item-1"
                size="sm"
                variant="circular"
              />
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  <strong>New message</strong> from Laur
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                  <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                </Typography>
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-4">
              <Avatar
                src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                alt="item-1"
                size="sm"
                variant="circular"
              />
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  <strong>New album</strong> by Travis Scott
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                  <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                </Typography>
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-4">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                <CreditCardIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  Payment successfully completed
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                  <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                </Typography>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>

        <Popover placement="bottom-end">
          <PopoverHandler>
            <IconButton variant="text">
              <FontAwesomeIcon
                icon={Icons.faCircleUser}
                className="fa-2xl p-2 rounded-xl"
              />
            </IconButton>
          </PopoverHandler>
          <PopoverContent className="w-72">
            <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
              <Avatar
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt="User Avatar"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  {user.account.fullName}
                </Typography>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <FontAwesomeIcon icon={Icons.faGear} className="fa-xl p-2 rounded-xl" />
      </div>
    </div>
  );
}
