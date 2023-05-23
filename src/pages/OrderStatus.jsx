import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

//Imported Components
import { Header } from "../components";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


//Imported Icons
import {
  BsCalendarCheck,
  BsFillPrinterFill,
  BsPersonCircle,
} from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";

const baseURL = "http://localhost:8080";

const OrderStatus = () => {
  const { id } = useParams();

  const [order, setOrder] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log(id);
    axios.get(baseURL + `/order/status/${id}`).then((res) => {
      console.log(res.data);
      // console.log(res.data[0].order_date);
      setOrder(res.data);
      setSelectedOption({
        value: res.data[0].status,
        label: res.data[0].status,
      });
      // console.log(order);
      console.log(res.data[0].status);
    });
  }, []);

  const options = [
    { value: "處理中", label: "處理中" },
    { value: "已發貨", label: "已發貨" },
    { value: "已到貨", label: "已到貨" },
  ];
  const MySwal = withReactContent(Swal);
  const handleChangeStatus = async (status) => {
    try {
      const result = await MySwal.fire({
        title: "確認修改訂單狀態?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確認修改",
        confirmButtonColor: "#FFCE5D",
        cancelButtonColor: "#F58A9E",
      });
      if (result.isConfirmed) {
        const datatoServer = {
          status: selectedOption.value,
        };

        console.log(datatoServer);

        const statusResponse = await axios.put(
          baseURL + `/order/status/${id}`,
          datatoServer
        );
        console.log(statusResponse);

        axios.get(baseURL + `/order/status/${id}`).then((res) => {
          setOrder(res.data);
          setSelectedOption({
            value: res.data[0].status,
            label: res.data[0].status,
          });
        });

        MySwal.fire({
          title: "狀態已更新！",
          icon: "success",
          confirmButtonColor: "#FFCE5D",

          // didClose: () => {
          //   navigate("/class");
          // }
        });
      } else if (result.isDenied) {
        MySwal.fire({
          title: "修改失敗",
          text: "訂單狀態修改失敗，請稍後再試",
          icon: "error",
          confirmButtonColor: "#FFCE5D",
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: "修改失敗",
        text: "訂單狀態修改失敗，請稍後再試",
        icon: "error",
        confirmButtonColor: "#FFCE5D",
      });
    }
  };


  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="訂單管理 → 詳細資料" />
      <div className="flex flex-col items-center w-full mt-10 gap-8">
        <div className="flex items-center justify-between w-full mb-4 space-x-4">
          <NavLink
            to="/order"
            className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg"
          >
            返回上一頁
          </NavLink>
        </div>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="orderSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="orderDetail overflow-y-auto  py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center  mx-auto w-[1184px]  flex-wrap gap-8 animate-slideup overflow-scroll ">
              {order[0] && (
                //&& 若左邊order有值,才會渲染右邊()的資料
                <div className="w-full   h-[647px] rounded-[5px] bg-[#FFFDF7] ">
                  <div className="flex  justify-between   w-full h-[117px] bg-[#5AAB8E] rounded-[5px]  ">
                    <div className="flex flex-col items-center  justify-center">
                      <div className="flex w-full items-center pb-5 pl-7 ">
                        <BsCalendarCheck className="mr-2 fill-white w-[20px] h-[20px]" />
                        <span className="text-white font-semibold mx-2">
                          下單日期：
                        </span>
                        <span className="text-white font-semibold">
                          {order[0].order_date}
                        </span>
                      </div>
                      <span className="text-white font-semibold w-full pl-7 ">
                        訂單編號：{order[0].order_no}
                      </span>
                    </div>
                    <form className="flex  justify-center items-center gap-3 ">
                      <Select
                        options={options}
                        value={selectedOption}
                        onChange={setSelectedOption}
                        placeholder="更改狀態"
                        isClearable={true}
                        className="flex-grow  w-[200px] py-2 px-5 rounded-lg font-semibold"
                      />
                      {/* <select
                         name=""
                         id=""
                         className="flex-grow border border-gray-300 py-2 px-5 rounded-lg"
                       >
                         <option value="" className="font-semibold">
                           更改狀態
                         </option>
                         <option value="">處理中</option>
                         <option value="">已發貨</option>
                         <option value="">已到貨</option>
                       </select> */}
                      <input
                        type="button"
                        value="確定"
                        className="bg-[#FFFDF6] font-semibold text-[#565C5C] py-2 px-4 w-[100px] h-[37px] rounded-lg cursor-pointer"
                        onClick={() => handleChangeStatus(order.status)}
                      />

                      <button  
                        className="flex items-center bg-[#FFFDF6] text-[#565C5C] py-2 px-2 rounded-lg w-[100px] h-[37px] mr-7 ml-4"
                      >
                        <BsFillPrinterFill className="mr-2 w-[20px] h-[20px]" />
                        <span className="font-semibold">訂單列印</span>
                      </button>
                    </form>
                  </div>
                  <div className="totalSection w-full h-[127px] flex flex-col items-center justify-between">
                    <div className="flex items-center w-full mt-10 tracking-[0.2em]">
                      <div className="flex items-center w-full flex-1 mx-10">
                        <BsPersonCircle className="fill-[#FFCE5D] mr-5 w-[40px] h-[40px]" />
                        <div className="flex flex-col">
                          <span className="w-full">
                            客戶姓名：{order[0].username}
                          </span>
                          <span className="">電子郵件：{order[0].email}</span>
                        </div>
                      </div>
                      <div className="flex items-center w-full flex-1 mx-10 ">
                        <FaTruck className="fill-[#5AAB8E] mr-5 w-[40px] h-[40px]" />
                        <div className="flex flex-col">
                          <span className="w-full">
                            運送方式：{order[0].shipping_method}
                          </span>
                          <span className=" ">
                            付款方式：{order[0].payment_method}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center w-full flex-1 ">
                        <IoMdPin className="fill-[#F58A9E] mr-5 w-[40px] h-[40px]" />
                        <div className="flex flex-col">
                          <span className="w-full">
                            運送地址: {order[0].postal_code}
                          </span>
                          <span className="">
                            {order[0].city}
                            {order[0].address_line}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center w-full my-5 justify-between  mt-10 ">
                      <div className="flex items-center gap-2 px-2 py-1 w-28 h-12 bg-yellow-400 rounded-full  ml-24 ">
                        <button className="w-full h-full text-white">
                          訂單確認
                        </button>
                      </div>
                      <div
                        className={`w-[264px] h-[2px] ${
                          order[0].status === "已發貨" ||
                          order[0].status === "已到貨"
                            ? "border-solid"
                            : "border-dashed"
                        } border-[#FFCE5D] border-2`}
                      ></div>
                      <div
                        className={`flex items-center gap-2 px-2 py-1 w-28 h-12 ${
                          order[0].status === "處理中" ? "" : "bg-yellow-400"
                        } border-yellow-400 border-2 rounded-full `}
                      >
                        <button
                          className={`w-full h-full ${
                            order[0].status === "處理中"
                              ? "text-[#FFCE5D]"
                              : "text-white"
                          }`}
                        >
                          商品出貨
                        </button>
                      </div>
                      <div
                        className={`w-[264px] h-[2px] ${
                          order[0].status === "已到貨"
                            ? "border-solid"
                            : "border-dashed"
                        } border-[#FFCE5D] border-2`}
                      ></div>
                      <div
                        className={`flex items-center gap-2 px-2 py-1 w-28 h-12 border-2 ${
                          order[0].status === "已到貨" ? "bg-yellow-400" : ""
                        }  border-yellow-400 rounded-full mr-40 `}
                      >
                        <button
                          className={`w-full h-full  ${
                            order[0].status === "已到貨"
                              ? "text-white"
                              : "text-[#FFCE5D]"
                          } `}
                        >
                          商品送達
                        </button>
                      </div>
                    </div>
                    <div className="w-[1108px]   border-2 border-[#5AAB8E]  ">
                      <div className=" w-full  rounded-[10px]   p-6 ">
                        <table className="w-full table-fixed mt-4 text-[#252b29] ">
                          <thead className=" text-xl ">
                            <tr className="tracking-[0.7em] ">
                              <th className="bg-inherit border-none pr-60 w-[40%] pb-8 ">
                                訂購明細
                              </th>
                              <th className="bg-inherit border-none ">單價</th>
                              <th className="bg-inherit border-none">數量</th>
                              <th className="bg-inherit border-none">總計</th>
                              <th className="bg-inherit border-none">備註</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-none tracking-[0.3em] ">
                                <div className="flex items-center  mx-5">
                                  <img
                                    src={order[0].product_image}
                                    className="w-[79px] h-[55px] "
                                  />
                                  <div className="flex flex-col  justify-start  ml-5 text-left">
                                    <span className="w-full">
                                      {order[0].product_SKU}
                                    </span>
                                    <span>{order[0].product_name}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="border-none">
                                {order[0].product_price}
                              </td>
                              <td className="border-none">{order[0].qty}</td>
                              <td className="border-none">
                                {order[0].subtotal}
                              </td>
                              <td className="border-none"></td>
                            </tr>
                            <tr>
                              <td className="border-none tracking-[0.3em]">
                                <div className="flex items-center w-full flex-1 mx-5">
                                  <img
                                    src={order[1].product_image}
                                    className="w-[79px] h-[55px] "
                                  />
                                  <div className="flex flex-col justify-start   ml-5 text-left">
                                    <span className="w-full">
                                      {order[1].product_SKU}
                                    </span>
                                    <span>{order[1].product_name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="border-none">
                                {order[1].product_price}
                              </td>
                              <td className="border-none">{order[1].qty}</td>
                              <td className="border-none">
                                {order[1].subtotal}
                              </td>
                              <td className="border-none"></td>
                            </tr>
                            <tr>
                              <td className="border-none tracking-[0.3em] ">
                                <div className="flex items-center w-full flex-1 mx-5">
                                  <img
                                    src={order[2].product_image}
                                    className="w-[79px] h-[55px] "
                                  />
                                  <div className="flex flex-col justify-center  ml-5 text-left ">
                                    <span className="w-full">
                                      {order[2].product_SKU}
                                    </span>
                                    <span>{order[2].product_name}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="border-none">
                                {order[2].product_price}
                              </td>
                              <td className="border-none">{order[2].qty}</td>
                              <td className="border-none">
                                {order[2].subtotal}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="total flex w-[1108px]  justify-end tracking-[0.3em] gap-10 mt-3">
                      <span>
                        商品金額：
                        {order[0].subtotal +
                          order[1].subtotal +
                          order[2].subtotal}
                      </span>
                      <span>運費：{order[0].shipping_price}</span>
                      <span>總計：{order[0].order_total}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
