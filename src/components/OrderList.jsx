import React from "react";

//Imported icons
import { IoEyeSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

//Imported components

const OrderList = (props) => {
  const tableRows = [...Array(15)].map((_, i) => (
    <tr className="text-[#7d7f7e]" key={i}>
      <td className="w-1/6">user{3 + i}</td>
      <td className="w-1/6">user{3 + i}@example.com</td>
      <td className="w-1/6">20230412000{3 + i}</td>
      <td className="w-1/6">2023-04-01 10:00:05</td>
      <td className="w-1/6">
        <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
          已發貨
        </button>
      </td>
      <td className="w-1/6  ">
        <button className=" table-cell">
          <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="flex flex-col items-center w-full mt-10 gap-8">
        <div className="flex items-center justify-between w-full mb-4 space-x-4">
          <div className="flex items-center space-x-4 ml-auto">
            <input
              type="text"
              placeholder="搜尋"
              className="flex-grow border border-gray-300 py-2 px-4 rounded-lg"
            />
            <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="" className="bg-blue-200">
                {props.status}
              </option>
              <option value="handle">處理中</option>
              <option value="shipped">已發貨</option>
              <option value="arrive">已到貨</option>
            </select>
            <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="">{props.filter1}</option>
              <option value="product-a">Product A</option>
              <option value="product-b">Product B</option>
              <option value="product-c">Product C</option>
            </select>
            <button className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg">
              搜尋
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed mt-1 text-[#252b29] ">
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

          <tbody>
            <tr className="text-[#7d7f7e]">
              <td className="w-1/6">user1</td>
              <td className="w-1/6">user1@example.com</td>
              <td className="w-1/6">202304120001</td>
              <td className="w-1/6">2023-04-01 10:00:05</td>
              <td className="w-1/6">
                <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
                  已發貨
                </button>
              </td>
              <td className="w-1/6">
                <NavLink to="/order/status">
                  <button className="table-cell">
                    <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                  </button>
                </NavLink>
              </td>
            </tr>
          </tbody>

          <tbody className="text-[#7d7f7e]">
            <tr>
              <td className="w-1/6">user2</td>
              <td className="w-1/6">user2@example.com</td>
              <td className="w-1/6">202304120002</td>
              <td className="w-1/6">2023-04-01 10:00:05</td>
              <td className="w-1/6">
                <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#f58a9e]">
                  處理中
                </button>
              </td>
              <td className="w-1/6 align-middle">
                <button className=" table-cell">
                  <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                </button>
              </td>
            </tr>
            {tableRows}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
