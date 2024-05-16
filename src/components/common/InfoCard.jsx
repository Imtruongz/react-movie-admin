import React from "react";

import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ item }) => (
  <div
    className="flex flex-col gap-10 bg-white border border-gray-300 rounded-md text-center shadow-xl p-5"
    style={{ width: "calc(25% - 1rem)", height: "calc(35% - 1rem)" }}
  >
    <div className="flex flex-row justify-between gap-10">
      <FontAwesomeIcon
        className="bg-[#373737] p-4 rounded-xl"
        size="xl"
        icon={item.icon}
        color="white"
      />
      <div className="flex flex-col">
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h4">{item.TotalCount}</Typography>
      </div>
    </div>
    <div className="flex flex-row justify-center items-end content-end border-t">
      <Typography variant="lead">{item.MonthCount} than last month</Typography>
    </div>
  </div>
);

export default InfoCard;
