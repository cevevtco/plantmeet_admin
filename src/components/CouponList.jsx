import React from "react";
import { NavLink } from "react-router-dom";

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { RxSlash } from "react-icons/rx";

//Imported components

const CouponList = (props) => {
  const tableRows = [...Array(15)].map((_, i) => (
    <tr className="text-[#7d7f7e]" key={i}>
      <td className="w-1/6">情人節企劃</td>
      <td className="w-1/6">限時優惠折扣30%</td>
      <td className="w-1/6">期間限定</td>
      <td className="w-1/6">~2023/03/31</td>
      <td className="w-1/6">
        <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#919192] bg-[#D4D9DB]">
          關閉中
        </button>
      </td>
      <td className="w-1/6  ">
        <button className=" table-cell ">
          <BsPencilSquare className="  icon  icon-selected fill-[#ffce5d] cursor-pointer  " />
        </button>
        <button className=" table-cell  ">
          <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
        </button>
        <button className=" table-cell ">
          <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer  " />
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="flex flex-col items-center w-full mt-10 gap-8">
        <div className="flex items-center justify-between w-full mb-4 space-x-4">
          <NavLink
            to="/coupon/create"
            className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg"
          >
            新增活動
          </NavLink>
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
      <div className="overflow-x-auto ">
        <table className="w-full table-fixed mt-1 text-[#252b29] ">
          <thead>
            <tr className="text-[#252b29]">
              <th className="w-1/6">促銷活動</th>
              <th className="w-1/6">優惠券</th>
              <th className="w-1/6">優惠分類</th>
              <th className="w-1/6">效期</th>
              <th className="w-1/6">開放狀態</th>
              <th className="w-1/6">編輯/刪除</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-[#7d7f7e]">
              <td className="w-1/6">母親節專案</td>
              <td className="w-1/6">限時優惠折扣50%</td>
              <td className="w-1/6">線上課程</td>
              <td className="w-1/6">~2023/05/31</td>
              <td className="w-1/6">
                <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
                  開放中
                </button>
              </td>
              <td className="w-1/6  ">
                <button className=" table-cell ">
                  <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                </button>
                <button className=" table-cell  ">
                  <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                </button>
                <button className=" table-cell ">
                  <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="text-[#7d7f7e]">
              <td className="w-1/6">全店促銷</td>
              <td className="w-1/6">滿2000折100</td>
              <td className="w-1/6">全店通用</td>
              <td className="w-1/6">~2023/12/31</td>
              <td className="w-1/6">
                <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
                  開放中
                </button>
              </td>
              <td className="w-1/6  ">
                <button className=" table-cell ">
                  <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                </button>
                <button className=" table-cell  ">
                  <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                </button>
                <button className=" table-cell ">
                  <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
                </button>
              </td>
            </tr>
          </tbody>

          <tbody className="text-[#7d7f7e]">
            <tr>
              <td className="w-1/6">射手座企劃</td>
              <td className="w-1/6">限時優惠折扣30%</td>
              <td className="w-1/6">多肉植物、乾燥花</td>
              <td className="w-1/6">~2023/12/22</td>
              <td className="w-1/6">
                <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#919192] bg-[#D4D9DB]">
                  關閉中
                </button>
              </td>
              <td className="w-1/6  ">
                <button className=" table-cell ">
                  <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                </button>
                <button className=" table-cell  ">
                  <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                </button>
                <button className=" table-cell ">
                  <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
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

export default CouponList;
