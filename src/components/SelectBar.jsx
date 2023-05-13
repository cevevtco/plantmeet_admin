import React from "react";
import { NavLink } from "react-router-dom";


const SelectBar = (props) => {
  let options = null;
  if (props.type === "class") {
    options = (
      <>
        <option value="">{props.option1}</option>
        <option value="">{props.option2}</option>
      </>
    );
  } else if (props.type === "product") {
    options = (
      <>
        <option value="">{props.option1}</option>
        <option value="">{props.option2}</option>
        <option value="">{props.option3}</option>
        <option value="">{props.option4}</option>
        <option value="">{props.option5}</option>
      </>
    );
  }
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
            <option value="0-500">0-500</option>
            <option value="500-1000">500-1000</option>
            <option value="1000-2000">1000-2000</option>
            <option value="2000+">2000+</option>
          </select>
          <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
            <option value="">{props.filter2}</option>
           {options}
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
