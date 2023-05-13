import React, { useState, useEffect } from "react";
import axios from "axios";

//Imported icons
import { IoEyeSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr"

//Imported components
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPaginate from 'react-paginate';


const MySwal = withReactContent(Swal);

const baseURL = "http://localhost:8080";

const OrderList = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const options = [
    { value: "處理中", label: "處理中" },
    { value: "已發貨", label: "已發貨" },
    { value: "已到貨", label: "已到貨" },
  ];

  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    setName(e.target.value);
  }; 

  const getData = (name, startDate, endDate, status) => {
    const encodedName = encodeURIComponent(name);
    const encodedStartDate = encodeURIComponent(JSON.stringify(startDate));
    const encodedEndDate = encodeURIComponent(JSON.stringify(endDate));
    const encodedOrderStatus = encodeURIComponent(status);
    const dateRangeString = startDate && endDate ? `&startDate=${encodedStartDate}&endDate=${encodedEndDate}` : "";
    const statusString = status ? `&orderStatus=${encodedOrderStatus}` : "";
    axios
      .get(
        `${baseURL}/order?name=${encodedName}${dateRangeString}${statusString}`
      )
      .then((res) => {
        // axios.get(baseURL + "/order").then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setOrders(res.data);
        } else {
          MySwal.fire({
            title: "查無相關資料！",
            icon: "warning",
            confirmButtonColor: "#FFCE5D",
          });
          setOrders([]);
        }
      });
  }
  useEffect(() => {
    getData(name, dateRange[0], dateRange[1], selectedStatus);
  }, []);

  // const tableRows = [...Array(15)].map((_, i) => (
  //   <tr className="text-[#7d7f7e]" key={i}>
  //     <td className="w-1/6">user{3 + i}</td>
  //     <td className="w-1/6">user{3 + i}@example.com</td>
  //     <td className="w-1/6">20230412000{3 + i}</td>
  //     <td className="w-1/6">2023-04-01 10:00:05</td>
  //     <td className="w-1/6">
  //       <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
  //         已發貨
  //       </button>
  //     </td>
  //     <td className="w-1/6  ">
  //       <NavLink to="/order/status/:id">
  //         <button className=" table-cell">
  //           <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
  //         </button>
  //       </NavLink>
  //     </td>
  //   </tr>
  // ));
  return (
    <>
      <div className="flex flex-col items-center w-full mt-10 gap-8 ">
        <div className="flex items-center mb-4  space-x-4 ml-auto relative ">
      
          <input
            type="text"
            placeholder="搜尋"
            value={name}
            className="flex-grow border border-gray-300 py-2 px-4 rounded-lg w-full"
            onChange={handleInputChange}
          />
          {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="" className="bg-blue-200">
                {props.status}
              </option>
              <option value="handle">處理中</option>
              <option value="shipped">已發貨</option>
              <option value="arrive">已到貨</option>
            </select> */}

          {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="">{props.filter1}</option>
              <option value="product-a">Product A</option>
              <option value="product-b">Product B</option>
              <option value="product-c">Product C</option>
            </select> */}

          <Select
            options={options}
            placeholder="訂單狀態"
            isClearable={true}
            className="flex-grow py-2  rounded-lg  w-full "
            onChange={(option) =>
              setSelectedStatus(option ? option.value : null)
            }
          />

          <DatePicker
            selected={dateRange[0]}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => {
              setDateRange(update);
            }}
            selectsRange={true}
            dateFormat="yyyy-MM-dd"
            isClearable={true}
            placeholderText="訂單日期區間"
            className="flex-grow border border-gray-300 py-2 px-4 rounded-lg w-[210px]"
          />

          <button
            type="button"
            className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg w-[150px]"
            onClick={() =>  getData(name, dateRange[0], dateRange[1], selectedStatus)
            }
          >
            搜尋
          </button>
          <GrPowerReset 
           className="w-20 h-20 text-gray-200 cursor-pointer"
           onClick={() => {
            setName("") ;
            setDateRange([null, null]);
            setSelectedStatus(null);
            getData("", null, null, null);
          }}
           />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed mt-1 text-[#252b29] ">
          <thead>
            <tr className="text-[#252b29]">
              <th className="w-1/6">訂購人姓名</th>
              <th className="w-1/6">Email</th>
              <th className="w-1/6">訂單號碼</th>
              <th className="w-1/6">訂購日期</th>
              <th className="w-1/6">訂單狀態</th>
              <th className="w-1/6">詳細</th>
            </tr>
          </thead>
         
          {orders
            // .filter(
            //   (order) =>
            //     selectedStatus === null || order.status === selectedStatus
            // )
            // .filter(
            //   (order) =>
            //     dateRange[0] === null ||
            //     (new Date(order.order_date) >= dateRange[0] &&
            //       (dateRange[1] === null ||
            //         new Date(order.order_date) <= dateRange[1]))
            // )
            .map((order, index) => (
              <tbody key={index} className="text-[#7d7f7e]">
                <tr className="text-[#7d7f7e]">
                  <td className="w-1/6">{order.username}</td>
                  <td className="w-1/6">{order.email}</td>
                  <td className="w-1/6">{order.order_no}</td>
                  <td className="w-1/6">{order.order_date}</td>
                  <td className="w-1/6">
                    {/* <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]"> */}
                    <button
                      className={`table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] ${
                        order.status === "處理中"
                          ? "bg-[#f58a9e]"
                          : order.status === "已發貨"
                          ? " bg-[#5aab8e]"
                          : "bg-[#ffce5d]"
                      }`}
                    >
                      {order.status}
                    </button>
                  </td>
                  <td className="w-1/6">
                    <NavLink to="/order/status/:id">
                      <button className="table-cell">
                        <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                      </button>
                    </NavLink>
                  </td>
                </tr>

                {/* <tr>
                       <td className="w-1/6">user2</td>
                       <td className="w-1/6">user2@example.com</td>
                       <td className="w-1/6">202304120002</td>
                       <td className="w-1/6">2023-04-01 10:00:05</td>
                       <td className="w-1/6">
                         <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#f58a9e]">
                           處理中
                         </button>
                       </td>
                       <td className="w-1/6 align-middle">
                         <NavLink to="/order/status/:id">
                           <button className=" table-cell">
                             <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                           </button>
                         </NavLink>
                       </td>
                     </tr> */}
                {/* {tableRows} */}

                {/* <tr>
                       <td className="w-1/6">user2</td>
                       <td className="w-1/6">user2@example.com</td>
                       <td className="w-1/6">202304120002</td>
                       <td className="w-1/6">2023-04-01 10:00:05</td>
                       <td className="w-1/6">
                         <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#ffce5d]">
                           已到貨
                         </button>
                       </td>
                       <td className="w-1/6 align-middle">
                         <NavLink to="/order/status/:id">
                           <button className=" table-cell">
                             <IoEyeSharp className="icon  icon-selected fill-[#ffce5d] cursor-pointer" />
                           </button>
                         </NavLink>
                       </td>
                     </tr> */}
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
};

export default OrderList;
