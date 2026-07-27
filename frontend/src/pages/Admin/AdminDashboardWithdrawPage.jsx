import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllWithdraw from "../../components/Admin/AllWithdraw";

const AdminDashboardWithdrawPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-20 800px:w-82.5">
            <AdminSideBar active={7} />
          </div>
          <AllWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdrawPage;
