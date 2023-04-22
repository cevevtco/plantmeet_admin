import React from "react";

//Imported components
import { Header } from "../components";

const ChangePassword = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="密碼變更" />
      <div className="Info w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className="flex justify-center items-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md  ">
          <form className="flex flex-col items-center gap-2 ">
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="flex mb-2 w-[90px]">Email帳號：</span>
              <input
                type="email"
                placeholder="admin@gmail.com"
                className="border-none text-black py-2 px-6 flex bg-none rounded-lg w-[300px]"
                disabled
              />
            </label>
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[90px] text-center">舊密碼：</span>
              <input
                type="password"
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[300px]"
              />
            </label>
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[90px] text-center">新密碼：</span>
              <input
                type="password"
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[300px]"
              />
            </label>
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[90px] text-center">確認新密碼：</span>
              <input
                type="password"
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[300px]"
              />
            </label>
            <input
              type="submit"
              value="變更密碼"
              className="rounded-[100px] bg-[#5aab8e] text-white px-40 py-4 mt-8 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
