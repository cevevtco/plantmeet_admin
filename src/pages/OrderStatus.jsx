import React from "react";
import { NavLink } from "react-router-dom";

//Imported Components
import { Header } from "../components";

//Imported Icons
import {
  BsCalendarCheck,
  BsFillPrinterFill,
  BsPersonCircle,
} from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
const OrderStatus = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="訂單管理 → 詳細資料" />
      <div className="flex flex-col items-center w-full mt-10 gap-8">
        <div className="flex items-center justify-between w-full mb-4 space-x-4">
          <NavLink
            to="/order"
            className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg"
          >
            返回上一頁
          </NavLink>
        </div>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="orderSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="orderDetail overflow-y-auto  py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center  mx-auto w-[1184px]  flex-wrap gap-8 animate-slideup overflow-scroll ">
              <div className="w-full   h-[647px] rounded-[5px] bg-[#FFFDF7] ">
                <div className="flex  justify-between   w-full h-[117px] bg-[#5AAB8E] rounded-[5px]  ">
                  <div className="flex flex-col items-center  justify-center">
                    <div className="flex w-full items-center pb-5 pl-7 ">
                      <BsCalendarCheck className="mr-2 fill-white w-[20px] h-[20px]" />
                      <span className="text-white font-semibold mx-2">
                        下單日期：
                      </span>
                      <span className="text-white font-semibold">
                        2023-04-01 10:00:05
                      </span>
                    </div>
                    <span className="text-white font-semibold w-full pl-7 ">
                      訂單編號：202304010001
                    </span>
                  </div>
                  <form className="flex  justify-center items-center gap-3 ">
                    <select
                      name=""
                      id=""
                      className="flex-grow border border-gray-300 py-2 px-5 rounded-lg"
                    >
                      <option value="" className="font-semibold">
                        更改狀態
                      </option>
                      <option value="">處理中</option>
                      <option value="">已發貨</option>
                      <option value="">已到貨</option>
                    </select>
                    <input
                      type="submit"
                      value="確定"
                      className="bg-[#FFFDF6] font-semibold text-[#565C5C] py-2 px-4 w-[100px] h-[37px] rounded-lg"
                    />
                    <button className="flex items-center bg-[#FFFDF6] text-[#565C5C] py-2 px-2 rounded-lg w-[100px] h-[37px] mr-7 ml-4">
                      <BsFillPrinterFill className="mr-2 w-[20px] h-[20px]" />
                      <span className="font-semibold">訂單列印</span>
                    </button>
                  </form>
                </div>
                <div className="totalSection w-full h-[127px] flex flex-col items-center justify-between">
                  <div className="flex items-center w-full mt-10 tracking-[0.2em]">
                    <div className="flex items-center w-full flex-1 mx-10">
                      <BsPersonCircle className="fill-[#FFCE5D] mr-5 w-[40px] h-[40px]" />
                      <div className="flex flex-col">
                        <span className="w-full">客戶姓名：user</span>
                        <span className="">電子郵件：user@gmail.com</span>
                      </div>
                    </div>
                    <div className="flex items-center w-full flex-1 mx-10 ">
                      <FaTruck className="fill-[#5AAB8E] mr-5 w-[40px] h-[40px]" />
                      <div className="flex flex-col">
                        <span className="w-full">運送方式：超商取貨</span>
                        <span className=" ">付款方式：信用卡付款</span>
                      </div>
                    </div>
                    <div className="flex items-center w-full flex-1 ">
                      <IoMdPin className="fill-[#F58A9E] mr-5 w-[40px] h-[40px]" />
                      <div className="flex flex-col">
                        <span className="w-full">運送地址:408</span>
                        <span className="">台中市南屯區黎明路52巷568號</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center w-full my-5 justify-between  mt-10 ">
                    <div className="flex items-center gap-2 px-2 py-1 w-28 h-12 bg-yellow-400 rounded-full  ml-24 ">
                      <button className="w-full h-full text-white">
                        訂單確認
                      </button>
                    </div>
                    <div className="w-[264px] h-[2px] bg-[#FFCE5D]"></div>
                    <div className="flex items-center gap-2 px-2 py-1 w-28 h-12 bg-yellow-400 rounded-full ">
                      <button className="w-full h-full text-white">
                        商品出貨
                      </button>
                    </div>
                    <div className="w-[264px] h-[2px] border-[#FFCE5D] border-dashed border-2"></div>
                    <div className="flex items-center gap-2 px-2 py-1 w-28 h-12 border-2  border-yellow-400 rounded-full mr-40 ">
                      <button className="w-full h-full  text-[#FFCE5D]">
                        商品送達
                      </button>
                    </div>
                  </div>
                  <div className="w-[1108px]   border-2 border-[#5AAB8E]  ">
                    <div className=" w-full  rounded-[10px]   p-6 ">
                      <table className="w-full table-fixed mt-4 text-[#252b29] ">
                        <thead className=" text-xl ">
                          <tr className="tracking-[0.7em] ">
                            <th className="bg-inherit border-none pr-60 w-[40%] pb-8 ">
                              訂購明細
                            </th>
                            <th className="bg-inherit border-none ">單價</th>
                            <th className="bg-inherit border-none">數量</th>
                            <th className="bg-inherit border-none">總計</th>
                            <th className="bg-inherit border-none">備註</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-none tracking-[0.3em] ">
                              <div className="flex items-center  mx-5">
                                <img
                                  src="https://via.placeholder.com/79x50.png"
                                  className="w-[79px] h-[55px] "
                                />
                                <div className="flex flex-col  justify-start  ml-5 text-left">
                                  <span className="w-full">PL001</span>
                                  <span>觀葉植物|象足漆印</span>
                                </div>
                              </div>
                            </td>

                            <td className="border-none">799</td>
                            <td className="border-none">1</td>
                            <td className="border-none">NT $799</td>
                            <td className="border-none">&#10003;</td>
                          </tr>
                          <tr>
                            <td className="border-none tracking-[0.3em]">
                              <div className="flex items-center w-full flex-1 mx-5">
                                <img
                                  src="https://via.placeholder.com/75x50.png"
                                  className="w-[79px] h-[55px] "
                                />
                                <div className="flex flex-col justify-start   ml-5 text-left">
                                  <span className="w-full">FL001</span>
                                  <span>不凋花|紅梅之夢</span>
                                </div>
                              </div>
                            </td>
                            <td className="border-none">399</td>
                            <td className="border-none">1</td>
                            <td className="border-none">NT $399</td>
                            <td className="border-none">&#10003;</td>
                          </tr>
                          <tr>
                            <td className="border-none tracking-[0.3em] ">
                              <div className="flex items-center w-full flex-1 mx-5">
                                <img
                                  src="https://via.placeholder.com/75x50.png"
                                  className="w-[79px] h-[55px] "
                                />
                                <div className="flex flex-col justify-center  ml-5 text-left ">
                                  <span className="w-full">EC001</span>
                                  <span>微景生態|迷你生態球</span>
                                </div>
                              </div>
                            </td>
                            <td className="border-none">666</td>
                            <td className="border-none">6</td>
                            <td className="border-none">NT $3996</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="total flex w-[1108px]  justify-end tracking-[0.3em] gap-10 mt-3">
                    <span>商品金額：5194</span>
                    <span>運費：60</span>
                    <span>總計：NT $5254</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
