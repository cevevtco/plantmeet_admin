import React from "react";

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

//Imported components
import { Header, SelectBar } from "../components";
import { NavLink } from "react-router-dom";

const ClassSelect = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="商品管理 → 體驗課程" />
      <SelectBar addBtn="新增課程" filter1="價格篩選" filter2="課程種類" />
      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="productSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="productList overflow-y-auto py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center w-full flex-wrap gap-8 animate-slideup">
              {Array.from({ length: 24 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-[290px] h-[310px] overflow-hidden bg-white rounded-[20px] shadow-md mb-8"
                  style={{ marginBottom: "-12px" }}
                >
                  <div className="w-full h-[210px] relative group">
                    <div className="absolute top-3 right-3 flex justify-center items-center h-10 w-10  rounded-full bg-white">
                      <BsTrash className="fill-[#F58A9E] h-8 w-8" />
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src="https://via.placeholder.com/290x220.png"
                      alt=""
                    />
                    <NavLink
                      to="/class/edit"
                      className="absolute top-3 left-3 flex justify-center items-center h-10 w-10 rounded-full bg-white"
                    >
                      <BsPencilSquare className="fill-[#FFCE5D] h-8 w-8 " />
                    </NavLink>
                  </div>
                  <div className="p-4 flex flex-col">
                    <p className="font-semibold text-sm text-[#8CABA2] truncate mb-1">
                      MFL001
                    </p>
                    <p className="font-normal text-lg text-black truncate mb-1 tracking-[0.5rem]">
                      體驗|手作娟花
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
export default ClassSelect;
