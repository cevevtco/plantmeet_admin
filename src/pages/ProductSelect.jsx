import React from "react";
import { NavLink } from "react-router-dom";

//Import components
import { Header, SelectBar } from "../components";

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const ProductSelect = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="商品管理 → 植感選物" />
      <SelectBar
        navLink="/products/create"
        type="product"
        addBtn="新增產品"
        filter1="價格篩選"
        filter2="商品種類"
        option1="多肉植物"
        option2="瓶中生態"
        option3="不凋花"
        option4="DIY材料"
        option5="限定商品"
      />
      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="productSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="productList overflow-y-auto py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center w-full flex-wrap gap-8 animate-slideup">
              {Array.from({ length: 25 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-[230px] h-[280px] overflow-hidden bg-white rounded-[20px] shadow-md mb-8"
                  style={{ marginBottom: "-12px" }}
                >
                  <div className="w-full h-[180px] relative group">
                    <div className="absolute top-3 right-3 flex justify-center items-center h-10 w-10  rounded-full bg-white">
                      <BsTrash className="fill-[#F58A9E] h-8 w-8" />
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src="https://i.imgur.com/LLrjW2W.jpg"
                      alt=""
                    />
                    <div className="absolute top-3 left-3 flex justify-center items-center h-10 w-10 rounded-full bg-white">
                      <BsPencilSquare className="fill-[#FFCE5D] h-8 w-8 " />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col">
                    <p className="font-semibold text-sm text-[#8CABA2] truncate mb-1">
                      PL001
                    </p>
                    <p className="font-normal text-lg text-black truncate mb-1 tracking-[0.5rem]">
                      多肉植物|紫太陽
                    </p>
                    <p className="text-sm truncate text-black mt-1 tracking-[0.5rem]">
                      NT$1,100
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelect;
