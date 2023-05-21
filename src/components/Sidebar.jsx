import React from "react";

import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

//Imported Images
import icon from "../assets/icon.svg";

//Imported Icons
import {
  BsHandbag,
  BsCart3,
  BsCashCoin,
  BsBarChartLine,
  BsPerson,
  BsKey,
} from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { RiSettings5Fill } from "react-icons/ri";

const Sidebar = () => {
  //使用了useRef來取得ul元素的參考
  const subMenuRef = useRef(null);

  //設定商品管理link收合sublink
  const [isOpen, setIsOpen] = useState(false);

  // 控制該元素的高度
  const [height, setHeight] = useState(0);

  //當isOpen為true時，將height設為該元素的真實高度；當isOpen為false時，將height設為0，元素就會平滑地收合
  //使用useEffect來監聽isOpen的變化並改變height的值
  useEffect(() => {
    setHeight(isOpen ? subMenuRef.current.scrollHeight : 0);
    //current 屬性則是 React 組件中讀取 DOM 的標準方法
  }, [isOpen]);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-[#fffdf6] grid gap-[3rem] h-full w-[23%] overflow-auto">
      <div className="logoDiv ">
        <NavLink to="/" className="w-fit flex items-center ">
          <img
            src={icon}
            alt="Icon"
            className="max-w-[50px] mt-[1rem] ml-[1.5rem] rounded-sm cursor-pointer "
          />
        </NavLink>
      </div>
      <div className="menuDiv grid  ">
        <ul className="menuLists grid  ">
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <button
              className="menuLink flex font-normal ml-[1rem]"
              onClick={toggleSubMenu}
            >
              <BsHandbag className="icon mr-[1.25rem]" />
              <span className="linkText inline-block">商品管理</span>

              <RxTriangleDown className="icon " />
            </button>
            <ul
              ref={subMenuRef}
              className={` subMenuLists  ${isOpen ? "" : "noshow"}`}
              style={{ height: `${height}px` }}
            >
              <li className="subListItem ml-[1rem] ">
                <NavLink
                  to="./class"
                  className="subMenuLink  hover:text-[#7cb5a5]"
                >
                  體驗課程
                </NavLink>
              </li>
              <li className="subListItem ml-[1rem] ">
                <NavLink
                  to="./products"
                  className="subMenuLink hover:text-[#7cb5a5]"
                >
                  植感選物
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <NavLink
              to="./order"
              className="menuLink flex font-normal ml-[1rem] "
            >
              <BsCart3 className="icon mr-[1.25rem]" />
              <span className="linkText hover:text-[#7cb5a5] inline-block ">
                訂單管理
              </span>
            </NavLink>
          </li>
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <NavLink
              to="./coupon"
              className="menuLink flex font-normal ml-[1rem]"
            >
              <BsCashCoin className="icon mr-[1.25rem]" />
              <span className="linkText hover:text-[#7cb5a5] inline-block">
                優惠管理
              </span>
            </NavLink>
          </li>
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <NavLink
              to="./salesdata"
              className="menuLink flex font-normal ml-[1rem]"
            >
              <BsBarChartLine className="icon mr-[1.25rem]" />
              <span className="linkText hover:text-[#7cb5a5] inline-block">
                數據報表
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* 員工資料 */}
      <div className="settingDiv    ">
        <ul className="menuLists grid">
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <NavLink
              to="./info"
              className="menuLink flex font-normal ml-[1rem]"
            >
              <BsPerson className="icon mr-[1.25rem]" />
              <span className="linkText hover:text-[#7cb5a5] inline-block">
                員工管理
              </span>
            </NavLink>
          </li>
          <li className="listItem py-[0.2rem] px-[3.125rem] w-full relative">
            <NavLink
              to="./setting"
              className="menuLink flex font-normal ml-[1rem]"
            >
              <RiSettings5Fill className="icon_set" />
              <BsKey className="icon mr-[1.25rem]" />
              <span className="linkText hover:text-[#7cb5a5] inline-block ">
                密碼變更
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
