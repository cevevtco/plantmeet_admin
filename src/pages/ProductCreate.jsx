import React from "react";
import { NavLink } from "react-router-dom";

//Import components
import { Header } from "../components";

const ProductCreate = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="植感選物 → 新增產品" />

      <div className=" w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <NavLink
                to="/products"
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

            <div className="flex sm:justify-start justify-center h-[600px] items-center  w-full max-w-screen-2xl mx-auto mt-3  overflow-scroll">
              <div className="flex flex-col w-[750px] mr-10 h-full  ">
                <div className="flex  justify-center w-full">
                  <img
                    src="https://via.placeholder.com/750x480"
                    alt="larger picture"
                    className="w-full object-cover object-center mb-4 rounded-xl hover:opacity-75 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center w-full  mx-auto">
                  <div className="flex  flex-wrap justify-center items-center gap-3 w-full  mx-auto">
                    <img
                      src="https://via.placeholder.com/130x110"
                      alt="smaller picture"
                      className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                    />
                    <img
                      src="https://via.placeholder.com/130x110"
                      alt="smaller picture"
                      className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                    />
                    <img
                      src="https://via.placeholder.com/130x110"
                      alt="smaller picture"
                      className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                    />
                    <img
                      src="https://via.placeholder.com/130x110"
                      alt="smaller picture"
                      className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="h-full flex flex-col justify-start items-center   w-[524.88px]  justify-self-start  overflow-scroll   ">
                <form className="flex flex-wrap  flex-col items-center gap-5 w-full ">
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">產品名稱：</span>
                    <input
                      type="text"
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">產品分類：</span>
                    <select
                      type="text"
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    >
                      <option value="">選擇分類</option>
                      <option value="">多肉植物</option>
                      <option value="">瓶中生態</option>
                      <option value="">不凋花</option>
                      <option value="">DIY材料</option>
                      <option value="">限定商品</option>
                    </select>
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">價格：</span>
                    <input
                      type="text"
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">
                      庫存數量：
                    </span>
                    <input
                      type="text"
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-16 w-[90px] text-center">
                      產品描述：
                    </span>
                    <textarea className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[80px] resize-none" />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-36 w-[90px] text-center">
                      產品內容：
                    </span>
                    <textarea className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[150px] resize-none" />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-20 w-[90px] text-center">
                      其他資訊：
                    </span>
                    <textarea className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none" />
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

export default ProductCreate;
