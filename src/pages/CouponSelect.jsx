import React from "react";

//Imported components
import { Header, CouponList } from "../components";

const CouponSelect = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="優惠管理 → 優惠總覽" />

      <div className="CouponSection w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <CouponList button="新增活動" status="開放狀態" filter1="優惠分類" />
        </div>
      </div>
    </div>
  );
};

export default CouponSelect;
