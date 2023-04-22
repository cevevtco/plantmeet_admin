import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

//Import components
import { Header } from "../components";

const ClassEdit = () => {
  const [courseName, setCourseName] = useState("台中手作課程 | 工業風永生花");
  const [price, setPrice] = useState("NT$ 1,500");

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="體驗課程 → 課程編輯" />

      <div className=" w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <NavLink
                to="/class"
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
                    <span className="flex  mb-2 w-[90px]">課程名稱：</span>
                    <input
                      type="text"
                      value={courseName}
                      onChange={handleCourseNameChange}
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">價格：</span>
                    <input
                      type="text"
                      value={price}
                      onChange={handlePriceChange}
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">數量：</span>
                    <input
                      type="text"
                      value="20"
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-20 w-[90px] text-center">
                      課程描述：
                    </span>
                    <textarea
                      value="想要美化自己的小書桌嗎？讓自己在工作時也能有好心情，快來跟我們一起討論，你想要的永生花是長怎樣?我們手作老師，過程中會帶領著你，挑選出自己喜歡的主花與配花，教你初學著也能做出來的方式 。"
                      className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-44 w-[90px] text-center">
                      課程內容：
                    </span>
                    <textarea
                      value="►課程技巧鐵細繩綁花技巧人人都是插花大師永生花的知識與認識配色設計自己的花
                    ►課程內容基礎綁花製作老師介紹永生花如何正確插花IG打卡美照教學 ►活動資訊・日期：・2023/04/29 (六) 1530-1730・2023/05/27 (六) 1530-1730・人數：6-10 人/場（最低開課人數：6人）・包含：體驗活動、現場工具與耗材、包裝提袋..."
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[200px] resize-none"
                    />
                  </label>
                  <label
                    htmlFor=""
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-20 w-[90px] text-center">
                      其他資訊：
                    </span>
                    <textarea
                      value="►活動資訊・日期：・2023/04/29 (六) 1530-1730・2023/05/27 (六) 1530-1730・人數：6-10 人/場（最低開課人數：6人）・包含：體驗活動、現場工具與耗材、包裝提袋..."
                      className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none"
                    />
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

export default ClassEdit;
