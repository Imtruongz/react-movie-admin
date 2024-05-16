import React from "react";
import Navbar from "../components/common/NavBar";
import Sidebar from "../components/common/SideBar";
import NavPage from "../components/common/NavPage";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  return (
      <div className="flex bg-bgColorMain text-textMain p-[20px] gap-[3%]">
        <Sidebar />
        <div className="w-full h-full flex flex-col gap-y-4">
          <Navbar />
          <div className=" bg-bgColorBlock rounded-lg h-[calc(100vh-136px)]">
            <NavPage />
            {/* <ToastContainer position="bottom-left" pauseOnHover={true} stacked={true} pauseOnFocusLoss={false}/> */}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;