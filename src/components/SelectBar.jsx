import React from "react";
import { NavLink } from "react-router-dom";

const SelectBar = (props) => {
  return (
    <div className="flex flex-col items-center w-full mt-10 gap-8">
      <div className="flex items-center justify-between w-full mb-4 space-x-4">
        <NavLink
          to={props.navLink}
          className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg"
        >
          {props.addBtn}
        </NavLink>

        <div className="flex items-center space-x-4 ml-auto">
          <input
            type="text"
            placeholder="搜尋"
            className="flex-grow border border-gray-300 py-2 px-4 rounded-lg"
          />
          <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
            <option value="" className="bg-blue-200">
              {props.filter1}
            </option>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-200">100-200</option>
            <option value="200+">200+</option>
          </select>
          <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
            <option value=""> {props.filter2}</option>
            <option value="product-a">Product A</option>
            <option value="product-b">Product B</option>
            <option value="product-c">Product C</option>
          </select>
          <button className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg">
            搜尋
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBar;
