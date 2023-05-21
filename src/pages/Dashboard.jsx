import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

// Imported components
import { Header, LineChart, PieChart } from "../components";

// Imported Icons
import { BsCoin, BsBasket2 } from "react-icons/bs";
import handHoldingPlant from "../assets/hand_holding_plant.svg";
import { IoEyeSharp } from "react-icons/io5";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
        axios.get("http://localhost:8080/order?&offset=0&limit=2").then((res) => {
          //沒key上name，server的name會得到null值
        console.log(res.data);
        setOrders(res.data.orders);
      });
  }, []);
  return (
    <>
      <Header title="您好 Admin, 歡迎回來！" />
      <div className="flex flex-col items-center w-full mt-10 gap-8 justify-center animate-slideup">
        <div className="w-full flex items-center gap-8 text-[1.375rem] text-[#252b29] tracking-[.3rem] font-normal">
          <div className="w-[453px] h-[150px] bg-white rounded-[10px] p-4 pt-6 box-border shadow-lg ">
            <h2 className="mb-4 ml-[2rem] text-2xl ">總營業額</h2>
            <div className="flex items-center ml-[2rem] ">
              <BsCoin className="mr-9 h-[3.5rem] w-[3.5rem] text-[#74b588]" />
              <span className="font-semibold text-3xl">NT $103,400</span>
            </div>
          </div>
          <div className="w-[453px] h-[150px] bg-white rounded-[10px] p-4 pt-6 box-border shadow-lg">
            <h2 className="mb-4 ml-[2rem] text-2xl">總訂單量</h2>
            <div className="flex items-center ml-[2rem]">
              <BsBasket2 className=" mr-9 h-[3.5rem] w-[3.5rem] text-[#74b588]" />
              <span className="font-semibold text-3xl">110</span>
            </div>
          </div>
          <div className="w-[453px] h-[150px] bg-white rounded-[10px] p-4 pt-6 box-border shadow-lg">
            <h2 className="mb-4 ml-[2rem] text-2xl ">產品數量</h2>
            <div className="flex items-center ml-[2rem]">
              <img
                src={handHoldingPlant}
                alt="Hand holding plant"
                className="mr-9 h-[3.5rem] w-[3.5rem] text-[#74b588]"
              />
              <span className="font-semibold text-3xl">50</span>
            </div>
          </div>
        </div>

        <div className="chartSection flex items-center gap-8 w-full mt-3">
          <div className="chartBlock w-[700px] h-[345px] rounded-[10px] bg-white shadow-lg">
            <LineChart />
          </div>
          <div className="chartStatic w-[700px] h-[345px] rounded-[10px] bg-white shadow-lg ">
            <PieChart />
          </div>
        </div>
        <div>
          <div className="w-full flex flex-col items-center gap-8">
            <div className="orderSection flex items-center gap-5 w-full mt-3">
              <div className="orderBlock w-[100%] h-[204px] bg-white rounded-[10px] p-8 box-border shadow-lg">
                <h2 className="text-[#252b29] tracking-[.3rem] font-normal text-2xl  ">
                  近期訂單
                </h2>
                <table className="w-full table-fixed mt-1 text-[#252b29]">
                  <thead>
                    <tr className="text-[#252b29]">
                      <th className="w-1/6">訂購人姓名</th>
                      <th className="w-1/6">Email</th>
                      <th className="w-1/6">訂單號碼</th>
                      <th className="w-1/6">訂購日期</th>
                      <th className="w-1/6">訂單狀態</th>
                      <th className="w-1/6">詳細</th>
                    </tr>
                  </thead>

                  {orders.map(
                    (order, index) => (
                      console.log(order),
                      (
                        <tbody key={index} className="text-[#7d7f7e]">
                          <tr className="text-[#7d7f7e]">
                            <td className="w-1/6">{order.username}</td>
                            <td className="w-1/6">{order.email}</td>
                            <td className="w-1/6">{order.order_no}</td>
                            <td className="w-1/6">{order.order_date}</td>
                            <td className="w-1/6">
                              {/* <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]"> */}
                              <button
                                className={`table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] ${
                                  order.status === "處理中"
                                    ? "bg-[#f58a9e]"
                                    : order.status === "已發貨"
                                    ? " bg-[#5aab8e]"
                                    : "bg-[#ffce5d]"
                                }`}
                              >
                                {order.status}
                              </button>
                            </td>
                            <td className="w-1/6  ">
                            <NavLink to={`/order/status/${order.id}`}>                                <button className="table-cell">
                                  <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                                </button>
                              </NavLink>
                            </td>
                          </tr>

                          {/* <tr>
                        <td className="w-1/6">{order.username}</td>
                        <td className="w-1/6">{order.email}</td>
                        <td className="w-1/6">{order.order_no}</td>
                        <td className="w-1/6">{order.order_date}</td>
                        <td className="w-1/6">
                          <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#f58a9e]">
                            處理中
                          </button>
                        </td>
                        <td className="w-1/6 align-middle">
                          <NavLink to="/order/status/:id">
                            <button className=" table-cell">
                              <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                            </button>
                          </NavLink>
                        </td>
                      </tr> */}
                        </tbody>
                      )
                    )
                  )}
                </table>
                <NavLink
                  to="/order"
                  className="seeAll flex items-center text-[#7d7f7e] cursor-pointer max-w-[150px] ml-auto"
                >
                  <span>查看所有訂單</span>
                  <HiOutlineArrowLongRight className="icon icon-selected2 fill-[#7d7f7e] mr-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
