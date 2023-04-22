import React from "react";

// Imported Icons
import { BsSearch, BsMoonFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";

//Imported Image
import img from "../assets/pikachu.png";

const Header = (props) => {
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
          <IoNotificationsSharp className="icon w-12 h-12 bg-[#fffdf6] rounded-lg p-2.5 fill-[#ffce5d]" />
          <BsMoonFill className="icon w-12 h-12 bg-[#fffdf6] rounded-lg p-2.5 fill-[#ffce5d]" />
          <div className="adminImage ml-5 cursor-pointer rounded-full mr-auto w-24 h-24 overflow-hidden bg-white flex justify-center items-center">
            <img
              src={img}
              alt="Admin Image"
              className="max-w-full mx-auto block rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
