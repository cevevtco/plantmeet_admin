import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cookies from "js-cookie";

// Imported Icons
import { BsSearch, BsMoonFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";

//Imported components
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

//Imported Image
// import img from "../assets/pikachu.png";

const Header = (props) => {
  const [isDotShow, setIsDotShow] = useState(true);

  const handleTooltipShown = (e) => {
    setIsDotShow(false);
  };

  return (
    <div className="topSection">
      <div className="headerSection flex items-center mt-[4.25rem] justify-between mx-auto">
        <h1 className="title text-4xl font-semibold text-[#fffdf6] ">
          {props.title}
        </h1>
        <label className="searchBar relative flex items-center py-[0.8rem] px-[1.5rem] bg-[#fffdf6] rounded-xl w-[480px]">
          <span className="sr-only">Search</span>
          <input
            type="text"
            placeholder="搜尋商品、訂單..."
            className="placeholder-[#bebfbe] text-lg  flex  w-full  border-gray-300  outline-none bg-none  "
            name="search"
          />
          <span>
            <BsSearch className="icon fill-[#bebfbe] hover:fill-[#5aab8e]" />
          </span>
        </label>
        <div className="adminDiv flex items-center ">
          <div className="relative inline-block ">
            <IoNotificationsSharp
              title="notification"
              data-tooltip-id="notification-tooltip"
              data-tooltip-place="bottom"
              className="icon w-12 h-12 bg-white rounded-lg p-2.5 fill-[#ffce5d]"
              onClick={handleTooltipShown}
            />
            {isDotShow && (
              <div>
                <div
                  id="notification-dot"
                  className="absolute top-[-4px] right-4 w-3 h-3 bg-red-500 rounded-full animate-ping"
                ></div>
                <span
                  id="notification-dot-solid"
                  className="absolute top-[-4px] right-4 w-3 h-3 bg-red-400 rounded-full "
                ></span>
              </div>
            )}
          </div>

          <Tooltip
            id="notification-tooltip"
            openOnClick={["click"]}
            clickable
            className="bg-[#fffdf6] border border-gray-400 text-black  text-sm  z-20  p-1  items-center w-72 h-fit rounded-lg font-bold "
            render={() => (
              <>
                <div className="flex flex-col items-center gap-5 p-2 ">
                  <h4 className=" text-black text-xl font-bold left-0">通知</h4>
                  <hr className="bg-black w-full" />
                  <div className="flex flex-row gap-4 hover:bg-[#e7e1cc] rounded-lg px-3 py-3 ">
                      <img
                        className="w-28 h-12 rounded-full object-cover object-center"
                        src="https://i.imgur.com/YQ33LkR.jpg"
                        alt=""
                      />
                      
                    <p className="text-[#7D7F7E] ">
                      <b className="text-black">張小儒</b>
                      &nbsp;已留下評價,訂單號碼202304300001。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      1 分鐘前
                    </p>
                  </div>

                  <div className="flex flex-row gap-4 hover:bg-[#e7e1cc] rounded-lg px-3 py-3 ">
                    <img
                        className="w-28 h-12 rounded-full object-cover object-center"
                        src="https://i.imgur.com/Btt3yOd.jpg"
                      alt=""
                    />
                    <p className="text-[#7D7F7E] ">
                      <b className="text-black">許月月</b>
                      &nbsp;已留下評價,訂單號碼202305120001。
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1
                      分鐘前
                    </p>
                  </div>

                  <div className="flex flex-row gap-4 hover:bg-[#e7e1cc] rounded-lg px-3 py-3 ">
                    <img
                        className="w-12 h-12 rounded-full object-cover object-center"
                        src="https://i.imgur.com/R8VcECT.jpg"
                      alt=""
                    />
                    <p className="text-[#7D7F7E] ">
                      <b className="text-black">陳小美</b>
                      &nbsp;已留下評價,訂單號碼202305120002。
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1
                      分鐘前
                    </p>
                  </div>

                  <div className="flex flex-row gap-4 hover:bg-[#e7e1cc] rounded-lg px-3 py-3 ">
                    <img
                        className="w-28 h-12 rounded-full object-cover object-center"
                        src="https://i.imgur.com/Gd7PQaw.jpg"
                      alt=""
                    />
                    <p className="text-[#7D7F7E] ">
                      <b className="text-black">黃大將</b>
                      &nbsp;已留下評價,訂單號碼202305120003。
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1
                      分鐘前
                    </p>
                  </div>
                  <div className="flex flex-row gap-4 hover:bg-[#e7e1cc] rounded-lg px-3 py-3 ">
                    <img
                        className="w-12 h-12 rounded-full object-cover object-center"
                        src="https://i.imgur.com/QPNqzq2.jpg"
                      alt=""
                    />
                    <p className="text-[#7D7F7E] ">
                      <b className="text-black">陳小明</b>
                      &nbsp;已留下評價,訂單號碼202305120004。
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1
                      分鐘前
                    </p>
                  </div>
                </div>
              </>
            )}
          />
          <BsMoonFill className="icon w-12 h-12 bg-[#fffdf6] rounded-lg p-2.5 fill-[#ffce5d]" />
          <div
            data-tooltip-id="info-tooltip"
            data-tooltip-place="bottom"
            className="adminImage ml-5 cursor-pointer rounded-full mr-auto w-24 h-24 overflow-hidden bg-white flex justify-center items-center"
          >
            <img
              src="https://i.imgur.com/ze2BuFO.jpg"
              alt="Admin Image"
              className="w-full h-full object-cover"
            />
          </div>
          <Tooltip
            id="info-tooltip"
            openOnClick={["click"]}
            clickable
            className="bg-[#fffdf6] border border-gray-400 text-black  text-lg font-bold z-20  p-6 flex items-center w-42 h-fit rounded-lg  "
            render={() => (
              <>
                <div className="flex flex-col items-center">
                  <NavLink
                    to="/info"
                    className="flex py-3 cursor-pointer hover:text-[#7cb5a5]"
                  >
                    個人資訊
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="flex  py-3  cursor-pointer hover:text-[#F58A9E] "
                    onClick={() => {
                      cookies.remove("x-access-token");
                      window.location.href = "/";
                    }}
                  >
                    登出
                  </NavLink>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
