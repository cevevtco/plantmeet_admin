import React, { useState, useEffect } from "react";
import axios from "axios";
import ExcelJs from "exceljs";

//Imported components
import { Header, LineChart, PieChart } from "../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Imported icons
import { BsFillPrinterFill } from "react-icons/bs";

const baseURL = "http://localhost:8080";
const MySwal = withReactContent(Swal);

const SalesData = () => {
  const [dateRange, setDateRange] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const options = [
    { value: "訂單匯總報表", label: "訂單匯總報表" },
    { value: "即時銷售報表", label: "即時銷售報表" },
    { value: "商品銷售報表", label: "商品銷售報表" },
    { value: "庫存報表", label: "庫存報表" },
  ];

  const [orders, setOrders] = useState([]);
  const getData = (startDate, endDate, orderReport) => {
    const encodedStartDate = encodeURIComponent(JSON.stringify(startDate));
    const encodedEndDate = encodeURIComponent(JSON.stringify(endDate));
    const dateRangeString =
      startDate && endDate
        ? `&startDate=${encodedStartDate}&endDate=${encodedEndDate}`
        : "";
    const encodedOrderReport = encodeURIComponent(orderReport);
    const orderReportString = orderReport
      ? `&orderReport=${encodedOrderReport}`
      : "";
    axios
      .get(`${baseURL}/order?${dateRangeString}${orderReportString}`)
      .then((res) => {
        // axios.get(baseURL + "/order").then((res) => {
        console.log(res.data);
        if (res.data.orders) {
          setOrders(res.data.orders);
          //如果篩選資料有值的話，點選搜尋按鈕就會下載篩選後的資料
          if (selectedStatus ) {
            const excel = new ExcelJs.Workbook(); //創建試算表檔案
            const worksheet = excel.addWorksheet("訂單匯總報表"); //創建工作表
            const rows = res.data.orders.map((order) => {
              return [
                order.order_no,
                order.order_date,
                order.status,
                order.username,
                order.email,
                order.order_total,
                order.city,
                order.address_line,
                order.value,
                order.name,
              ];
            });
            // 把rows加到工作表
            // worksheet.addRows(rows);

            worksheet.addTable({
              name: "訂單匯總報表",
              ref: "A1",
              headerRow: true,
              columns: [
                { name: "訂單編號", ref: "B1" },
                { name: "訂單日期", ref: "C1" },
                { name: "訂單狀態", ref: "D1" },
                { name: "訂購人姓名", ref: "E1" },
                { name: "訂購人email", ref: "F1" },
                { name: "訂單總金額", ref: "G1" },
                { name: "訂購人地址縣市", ref: "H1" },
                { name: "訂購人地址街道", ref: "I1" },
                { name: "付款方式", ref: "J1" },
                { name: "取貨方式", ref: "K1" },
              ],
              rows: rows,
            });

            // 表格裡面的資料都填寫完成之後，訂出下載的callback function
            // 異步的等待他處理完之後，創建url與連結，觸發下載
            excel.xlsx.writeBuffer().then((content) => {
              const link = document.createElement("a");
              const blobData = new Blob([content], {
                type: "application/vnd.ms-excel;charset=utf-8;",
              });
              link.download = "訂單匯總報表.xlsx";
              link.href = URL.createObjectURL(blobData);
              link.click();
            });
          }
        } else {
          MySwal.fire({
            title: "查無相關資料！",
            icon: "warning",
            confirmButtonColor: "#FFCE5D",
          });
          setOrders([]);
        }
      });
  };
  useEffect(() => {
    getData(dateRange[0], dateRange[1], selectedStatus?.value);
    //name, dateRange[0], dateRange[1], selectedStatus?.value, 1 //state取得的值，丟到getData function
  }, []);

  // const handlePrint = () => {
  //   const excel = new ExcelJs.Workbook(); //創建試算表檔案
  //   const worksheet = excel.addWorksheet("訂單匯總報表"); //創建工作表

  //   const rows = orders.map((order) => {
  //     return [
  //       order.order_no,
  //       order.order_date,
  //       order.status,
  //       order.username,
  //       order.email,
  //       order.order_total,
  //       order.city,
  //       order.address_line,
  //       order.value,
  //       order.name,
  //     ];
  //   });

  //   // 把rows加到工作表
  //   // worksheet.addRows(rows);

  //   worksheet.addTable({
  //     name: "訂單匯總報表",
  //     ref: "A1",
  //     headerRow: true,
  //     columns: [
  //       { name: "訂單編號", ref: "B1" },
  //       { name: "訂單日期", ref: "C1" },
  //       { name: "訂單狀態", ref: "D1" },
  //       { name: "訂購人姓名", ref: "E1" },
  //       { name: "訂購人email", ref: "F1" },
  //       { name: "訂單總金額", ref: "G1" },
  //       { name: "訂購人地址縣市", ref: "H1" },
  //       { name: "訂購人地址街道", ref: "I1" },
  //       { name: "付款方式", ref: "J1" },
  //       { name: "取貨方式", ref: "K1" },
  //     ],
  //     rows: rows,
  //   });

  //   // 表格裡面的資料都填寫完成之後，訂出下載的callback function
  //   // 異步的等待他處理完之後，創建url與連結，觸發下載
  //   excel.xlsx.writeBuffer().then((content) => {
  //     const link = document.createElement("a");
  //     const blobData = new Blob([content], {
  //       type: "application/vnd.ms-excel;charset=utf-8;",
  //     });
  //     link.download = "訂單匯總報表.xlsx";
  //     link.href = URL.createObjectURL(blobData);
  //     link.click();
  //   });
  // };
  // console.log(orders);

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="數據報表" />

      <div className="SalesData w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <div className="flex items-center space-x-2 ml-auto relative ">
                {/* <input
                  type="text"
                  placeholder="搜尋"
                  className="flex-grow border border-gray-300 py-2 px-4 rounded-lg w-full"
                /> */}
                {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
                  <option value="" className="bg-blue-200">
                    日期
                  </option>
                  <option value="handle">處理中</option>
                  <option value="shipped">已發貨</option>
                  <option value="arrive">已到貨</option>
                </select> */}
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
                  placeholderText="日期區間"
                  className="flex-grow border border-gray-300 py-2 px-4 rounded-lg  w-full  z-10"
                />
                {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
                  <option value="">報表分類</option>
                  <option value="product-a">Product A</option>
                  <option value="product-b">Product B</option>
                  <option value="product-c">Product C</option>
                </select> */}
                <Select
                  options={options}
                  placeholder="報表分類"
                  isClearable={true}
                  className="flex-grow py-2  rounded-lg  w-full"
                  value={selectedStatus}
                  onChange={(option) => {
                    setSelectedStatus(option);
                  }}
                />
                {/* <button className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg w-[150px]">
                  搜尋
                </button> */}
                <button
                  // onClick={handlePrint}
                  onClick={() =>
                    getData(dateRange[0], dateRange[1], selectedStatus?.value)
                  }
                  className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg flex items-center w-[250px]"
                >
                  <BsFillPrinterFill className="text-xl mr-2" />
                  <span>報表列印</span>
                </button>
              </div>
            </div>
            <div className="chartSection flex items-center gap-8 w-full ">
              <div className="chartBlock w-[700px] h-[360px] border border-[#DDDFE5] rounded-[10px] bg-white shadow-lg">
                <LineChart />
              </div>
              <div className="chartStatic w-[700px] h-[360px] border border-[#DDDFE5] rounded-[10px] bg-white shadow-lg">
                <PieChart />
              </div>
            </div>
            <div className="flex items-center gap-8 w-full mt-3 ">
              <div className="productSalesBlock border border-[#DDDFE5] w-[700px] h-[210px] rounded-[10px] bg-white shadow-lg overflow-scroll p-6">
                <h2 className="text-2xl font-bold mt-2 ml-6">產品銷售排行</h2>
                <table className="w-full table-fixed mt-4 text-[#252b29]">
                  <thead>
                    <tr>
                      <th>產品名稱</th>
                      <th>銷售數量</th>
                      <th>庫存數量</th>
                      <th>價格</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>紫太陽</td>
                      <td>150</td>
                      <td>30</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>翠綠盆景</td>
                      <td>140</td>
                      <td>20</td>
                      <td>NT $1100</td>
                    </tr>
                    <tr>
                      <td>苔蘚景觀</td>
                      <td>135</td>
                      <td>30</td>
                      <td>NT $1300</td>
                    </tr>
                    <tr>
                      <td>玫瑰之愛</td>
                      <td>120</td>
                      <td>20</td>
                      <td>NT $1200</td>
                    </tr>
                    <tr>
                      <td>生態之旅</td>
                      <td>100</td>
                      <td>10</td>
                      <td>NT $1100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="classSalesBlock border border-[#DDDFE5] w-[700px] h-[210px] rounded-[10px] bg-white shadow-lg overflow-scroll p-6">
                <h2 className="text-2xl font-bold mt-2 ml-6">課程銷售排行</h2>
                <table className="w-full table-fixed mt-4 text-[#252b29]">
                  <thead>
                    <tr>
                      <th>課程名稱</th>
                      <th>銷售數量</th>
                      <th>庫存數量</th>
                      <th>價格</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>手作鮮花</td>
                      <td>70</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>工業風永生花</td>
                      <td>65</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>手作盆栽</td>
                      <td>50</td>
                      <td>20</td>
                      <td>NT $1200</td>
                    </tr>
                    <tr>
                      <td>多肉栽培</td>
                      <td>45</td>
                      <td>20</td>
                      <td>NT $1200</td>
                    </tr>
                    <tr>
                      <td>蕨類植物</td>
                      <td>40</td>
                      <td>10</td>
                      <td>NT $1200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesData;
