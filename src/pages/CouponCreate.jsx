import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";


//Import components
import { Header } from "../components";

//Import icons
import { TbUpload } from "react-icons/tb";


const CouponCreate = () => {
  const options = [
    { value: "多肉植物", label: "多肉植物" },
    { value: "瓶中生態", label: "瓶中生態" },
    { value: "乾燥花", label: "乾燥花" },
    { value: "DIY材料", label: "DIY材料" },
    { value: "期間限定", label: "期間限定" },
    { value: "線上手作", label: "線上手作" },
    { value: "實體教學", label: "實體教學" },
  ];
  const animatedComponents = makeAnimated();

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="優惠管理 → 新增活動" />

      <div className=" w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <NavLink
                to="/coupon"
                className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg flex items-center"
              >
                <span>返回上一頁</span>
              </NavLink>
              <form className="flex items-center space-x-4 ml-auto">
                <input
                  type="submit"
                  value="確認發佈"
                  className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg cursor-pointer"
                />
              </form>
            </div>

            <div className="flex sm:justify-start justify-center  h-[600px] items-center  w-full max-w-screen-2xl mx-auto mt-3  overflow-scroll">
              <div className="flex flex-col w-[750px] bg-gray-100 mr-10 hover:opacity-75 cursor-pointer ">
                <div className="flex  justify-center  w-full h-[300px] border border-slate-300 rounded-xl  ">
                  <TbUpload
                    className="text-8xl text-gray-400 object-cover object-center mb-4 "
                  />
                </div>
              </div>

              <div className="h-full flex flex-col justify-start items-center   w-[524.88px]  justify-self-start  overflow-scroll mt-20  ">
                <form className="flex flex-wrap  flex-col items-center gap-5 w-full ">
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">促銷活動：</span>
                    <input
                      type="text"
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">優惠券名稱：</span>
                    <input
                      type="text"
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    />
                  </label>

                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">優惠券類型：</span>
                    <select
                      type="text"
                      className="border-none text-black py-2 px-2 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    >
                      <option value="">請選擇優惠券類型</option>
                      <option value="">全店通用</option>
                      <option value="">指定類型</option>
                    </select>
                  </label>

                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0  "
                  >
                    <Select
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      options={options}
                      placeholder="請選擇產品種類"
                      className="w-[400px]   bg-[#E9F6CD] ml-24 rounded-lg"
                    />
                  </label>

                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">
                      使用門檻：
                    </span>
                    <span className="bg-[#d3d3d3] py-2 px-4 flex rounded-l-lg w-[40px]">
                      滿
                    </span>
                    <input
                      type="text"
                      className="bg-[#E9F6CD] py-2 px-6 flex  w-[270px]"
                    />
                    <span className="bg-[#d3d3d3] py-2 px-4 flex rounded-r-lg w-[90px]">
                      元可使用
                    </span>
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">
                      使用期限：
                    </span>
                    <input
                      type="date"
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                    />
                  </label>

                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-20 w-[90px] text-center">
                      優惠券說明：
                    </span>
                    <textarea className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none" />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">開放狀態：</span>
                    <select
                      type="text"
                      className="border-none text-black py-2 px-2 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    >
                      <option value="">開放中</option>
                      <option value="">關閉中</option>
                    </select>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCreate;
