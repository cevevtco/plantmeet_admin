import React from "react";

//Imported components
import { Header } from "../components";

//Imported Image
import img from "../assets/pikachu.png";

const Info = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="員工資料" />
      <div className="Info w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className="flex justify-center items-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-72 ">
          <img
            src={img}
            alt="employee"
            className="rounded-full w-72 h-72 border shadow-lg object-cover "
          />
          <form className="flex flex-col items-center gap-2 ">
            <label htmlFor="" className="flex flex-col   w-[500px]">
              <div className="flex w-full items-center ">
                <span className=" w-full text-right">Email帳號：</span>
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  className=" py-2 px-6 flex  w-full bg-[#E9F6CD]  rounded-lg"
                  disabled
                />
              </div>
            </label>
            <label htmlFor="" className="flex flex-col   w-[500px]">
              <div className="flex w-full items-center ">
                <span className="w-full text-right">姓名：</span>
                <input
                  type="text"
                  placeholder="花枝魚"
                  className=" bg-[#E9F6CD] py-2 px-6 flex  w-full  rounded-lg"
                  disabled
                />
              </div>
            </label>
            <label htmlFor="" className="flex flex-col   w-[500px]">
              <div className="flex w-full items-center ">
                <span className="w-full text-right">電話：</span>
                <input
                  type="phone"
                  placeholder="0988-222-222"
                  className=" bg-[#E9F6CD]  py-2 px-6 flex  w-full  rounded-lg"
                  disabled
                />
              </div>
            </label>
            <label htmlFor="" className="flex flex-col    w-[500px]">
              <div className="flex w-full items-center ">
                <span className="w-full text-right">加入時間：</span>
                <input
                  type="text"
                  placeholder="2023-04-02"
                  className=" bg-[#E9F6CD]  py-2 px-6 flex  w-full  rounded-lg"
                  disabled
                />
              </div>
            </label>
            <label htmlFor="" className="flex flex-col  w-[500px]">
              <div className="flex w-full items-center ">
                <span className="w-full text-right">最後一次登入時間：</span>
                <input
                  type="text"
                  placeholder="2023-04-02  15:03:01"
                  className=" bg-[#E9F6CD]  py-2 px-6 flex  w-full  rounded-lg"
                  disabled
                />
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Info;
