import React from "react";


//Import components
import { Header, OrderList } from "../components";



const OrderSelect = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="訂單管理 → 訂單總覽" />

      <div className="OrderSection w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <OrderList button="訂單編輯" status="訂單狀態" />
        </div>
      </div>
    </div>
  );
};

export default OrderSelect;
