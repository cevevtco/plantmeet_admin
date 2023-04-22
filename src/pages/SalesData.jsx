import React from "react";

//Imported components
import { Header, LineChart, PieChart } from "../components";

//Imported icons
import { BsFillPrinterFill } from "react-icons/bs";

const SalesData = () => {
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="銷售數據" />

      <div className="SalesData w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <button className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg flex items-center">
                <BsFillPrinterFill className="text-xl mr-2" />
                <span>報表列印</span>
              </button>
              <div className="flex items-center space-x-4 ml-auto">
                <input
                  type="text"
                  placeholder="搜尋"
                  className="flex-grow border border-gray-300 py-2 px-4 rounded-lg"
                />
                <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
                  <option value="" className="bg-blue-200">
                    日期
                  </option>
                  <option value="handle">處理中</option>
                  <option value="shipped">已發貨</option>
                  <option value="arrive">已到貨</option>
                </select>
                <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
                  <option value="">報表分類</option>
                  <option value="product-a">Product A</option>
                  <option value="product-b">Product B</option>
                  <option value="product-c">Product C</option>
                </select>
                <button className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg">
                  搜尋
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
                      <td>歡欣鼓舞</td>
                      <td>500</td>
                      <td>30</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>歡欣鼓舞</td>
                      <td>300</td>
                      <td>310</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>歡欣鼓舞</td>
                      <td>300</td>
                      <td>310</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>歡欣鼓舞</td>
                      <td>300</td>
                      <td>310</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>歡欣鼓舞</td>
                      <td>300</td>
                      <td>310</td>
                      <td>NT $1500</td>
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
                      <td>工業風永生花</td>
                      <td>150</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>工業風永生花</td>
                      <td>150</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>工業風永生花</td>
                      <td>150</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>工業風永生花</td>
                      <td>150</td>
                      <td>10</td>
                      <td>NT $1500</td>
                    </tr>
                    <tr>
                      <td>工業風永生花</td>
                      <td>150</td>
                      <td>10</td>
                      <td>NT $1500</td>
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
