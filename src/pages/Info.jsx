import React, { useState, useEffect } from "react";

import axios from "axios";

//Imported components
import { Header } from "../components";

//Imported Image
// import img from "../assets/pikachu.png";

const baseURL = "http://localhost:8080";

const Info = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/user`).then((res) => {
      setUser(res.data[0]);
      console.log(res.data[0]);
    });
  }, []);

  // // 将 Buffer 图片数据转换为 Base64 字符串
  // const base64String = Buffer.from(user.user_image).toString("base64");

  // // 将 Base64 字符串赋值给 img 元素的 src 属性
  // <img src={`data:image/png;base64,${base64String}`} alt="User Image" />;

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="員工資料" />
      <div className="Info w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className="flex justify-center items-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-72 ">
          {user && (
            <img
              src={user.user_image}
              alt="Admin Image"
              className="rounded-full w-96 h-96 border shadow-lg object-cover "
            />
          )}
          {user && (
            <form className="flex flex-col items-center gap-7 text-lg">
              <label htmlFor="" className="flex flex-col   w-[500px]">
                <div className="flex w-full items-center ">
                  <span className=" w-full text-right ">Email帳號：</span>
                  <input
                    type="email"
                    placeholder={user.email}
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
                    placeholder={user.name}
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
                    placeholder={user.phone}
                    className=" bg-[#E9F6CD]  py-2 px-6 flex  w-full  rounded-lg"
                    disabled
                  />
                </div>
              </label>
              <label htmlFor="" className="flex flex-col    w-[500px]">
                <div className="flex w-full items-center ">
                  <span className="w-full text-right">加入時間：</span>
                  <input
                    type="number"
                    placeholder={user.create_date}
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
                    placeholder={user.last_date_signin}
                    className=" bg-[#E9F6CD]  py-2 px-6 flex  w-full  rounded-lg"
                    disabled
                  />
                </div>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
