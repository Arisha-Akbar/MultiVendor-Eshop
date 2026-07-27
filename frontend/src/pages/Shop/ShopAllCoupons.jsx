import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-20 800px:w-82.5">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
