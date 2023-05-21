import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { RxSlash } from "react-icons/rx";

//Imported components
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPaginate from "react-paginate";

const baseURL = "http://localhost:8080";

const CouponList = () => {
 
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useEffect(() => {
  //   axios.get(baseURL + "/coupon").then((res) => {
  //     console.log(res.data);
  //     setCoupons(res.data.coupons);
  //   });
  // }, []);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const couponStatus = [
    { value: "開放中", label: "開放中" },
    { value: "關閉中", label: "關閉中" },
  ];

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const couponCategories = [
    { value: "多肉植物", label: "多肉植物" },
    { value: "瓶中生態", label: "瓶中生態" },
    { value: "不凋花", label: "不凋花" },
    { value: "DIY材料", label: "DIY材料" },
    { value: "限定商品", label: "限定商品" },
    { value: "現場體驗", label: "現場體驗" },
    { value: "線上課程", label: "線上課程" },
    { value: "全店通用", label: "全店通用" },
  ];

  const MySwal = withReactContent(Swal);
  const handleChangeStatus = async (id, status) => {

    try {
      const result = await MySwal.fire({
        title: "確認更改優惠狀態?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確認更改",
        confirmButtonColor: "#FFCE5D",
        cancelButtonColor: "#F58A9E",
      });
      if (result.isConfirmed) {
        
        let newStatus;

        if(status === "開放中"){
          newStatus = "關閉中";
        }else if(status === "關閉中"){
          newStatus = "開放中";
        }

        const datatoServer = {
          status: newStatus,
        };

        console.log(datatoServer);   
        

        const statusResponse = await axios.put(
          baseURL + `/coupon/status/${id}`,
          datatoServer
        );
     
        console.log(statusResponse.data);

        axios.get(baseURL + `/coupon`).then((res) => {
  
          setCoupons(res.data.coupons);
          // getData(currentPage);
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
          title: "更改失敗",
          text: "優惠狀態更改失敗，請稍後再試",
          icon: "error",
          confirmButtonColor: "#FFCE5D",
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: "更改失敗",
        text: "優惠狀態更改失敗，請稍後再試",
        icon: "error",
        confirmButtonColor: "#FFCE5D",
      });
    }
  };


  const getData = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
    const limit = 14; // 每頁顯示的筆數
    const offset = (pageNumber - 1) * limit; // 偏移量
    axios
      .get(
        `${baseURL}/coupon?&offset=${offset}&limit=${limit}`
      )
      .then((res) => {
        // axios.get(baseURL + "/order").then((res) => {
        console.log(res.data);
        if (res.data.coupons) {
          setCoupons(res.data.coupons);
          setTotalPages(Math.floor(res.data.total_count/limit));
          //res.data.total_count總筆數 (14) / limit每頁顯示的筆數 (14) = 總頁數 (1) -->Math.ceil 向上取整數(1)
          console.log(res.data.total_count)
        } else {
          MySwal.fire({
            title: "查無相關資料！",
            icon: "warning",
            confirmButtonColor: "#FFCE5D",
          });
          setTotalPages(1);
          setCurrentPage(1);
        }
      });
  };
  useEffect(() => {
    getData(1);
    //name, dateRange[0], dateRange[1], selectedStatus?.value, 1 //state取得的值，丟到getData function
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    console.log(selectedPage);
    getData(selectedPage);
  };
  // const tableRows = [...Array(15)].map((_, i) => (
  //   <tr className="text-[#7d7f7e]" key={i}>
  //     <td className="w-1/6">情人節企劃</td>
  //     <td className="w-1/6">限時優惠折扣30%</td>
  //     <td className="w-1/6">期間限定</td>
  //     <td className="w-1/6">~2023/03/31</td>
  //     <td className="w-1/6">
  //       <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#919192] bg-[#D4D9DB]">
  //         關閉中
  //       </button>
  //     </td>
  //     <td className="w-1/6  ">
  //       <button className=" table-cell ">
  //         <BsPencilSquare className="  icon  icon-selected fill-[#ffce5d] cursor-pointer  " />
  //       </button>
  //       <button className=" table-cell  ">
  //         <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
  //       </button>
  //       <button className=" table-cell ">
  //         <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer  " />
  //       </button>
  //     </td>
  //   </tr>
  // ));

  return (
    <>
      <div className="flex flex-col items-center w-full mt-10 gap-8">
        <div className="flex items-center justify-between w-full mb-4 space-x-4">
          <NavLink
            to="/coupon/create"
            className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg"
          >
            新增活動
          </NavLink>
          <div className="flex items-center space-x-4 ml-auto">
            <input
              type="text"
              placeholder="搜尋促銷活動"
              className="flex-grow border border-gray-300 py-2 px-4 rounded-lg"
            />
            {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="" className="bg-blue-200">
                {props.status}
              </option>
              <option value="handle">處理中</option>
              <option value="shipped">已發貨</option>
              <option value="arrive">已到貨</option>
            </select> */}
            <Select
              options={couponStatus}
              placeholder="開放狀態"
              isClearable={true}
              className="flex-grow  py-2 rounded-lg "
              value={selectedStatus}
              onChange={(option) => {
                setSelectedStatus(option);
              }}
            />
            {/* <select className="flex-grow border border-gray-300 py-2 px-4 rounded-lg">
              <option value="">{props.filter1}</option>
              <option value="product-a">Product A</option>
              <option value="product-b">Product B</option>
              <option value="product-c">Product C</option>
            </select> */}
            <Select
              options={couponCategories}
              placeholder="優惠分類"
              isClearable={true}
              className="flex-grow  py-2  rounded-lg"
              value={selectedCoupon}
              onChange={(option) => {
                setSelectedCoupon(option);
              }}
            />
            <button className="bg-[#5AAB8E] text-white py-2 px-4 rounded-lg">
              搜尋
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full table-fixed mt-1 text-[#252b29] ">
          <thead>
            <tr className="text-[#252b29]">
              <th className="w-1/6">促銷活動</th>
              <th className="w-1/6">優惠券</th>
              <th className="w-1/6">優惠分類</th>
              <th className="w-1/6">效期</th>
              <th className="w-1/6">開放狀態</th>
              <th className="w-1/6">編輯/刪除</th>
            </tr>
          </thead>

          {coupons.map((coupon, index) => (
            <tbody key={index}>
              <tr className="text-[#7d7f7e]">
                <td className="w-1/6">{coupon.activity_name}</td>
                <td className="w-1/6">{coupon.coupon_name}</td>
                <td className="w-1/6">
                  {coupon.use_type === "指定類型"
                    ? coupon.category_name
                    : coupon.use_type}
                </td>
                <td className="w-1/6">~{coupon.expiry_date}</td>
                <td className="w-1/6">
                  <button
                    onClick={() => {
                      handleChangeStatus(coupon.id, coupon.coupon_status);
                    }}
                    className={`status_ship table-cell rounded-[10px] py-[1px] px-[45px] h ${
                      coupon.coupon_status === "開放中"
                        ? "text-[#FFFDF6] bg-[#5aab8e] hover:bg-[#4a8e76] active:bg-[#3c725f]"
                        : "text-[#919192] bg-[#D4D9DB] hover:bg-[#b6bbbedb] active:bg-[#6266688a]"
                    }`}
                  >
                    {coupon.coupon_status}
                    
                  </button>
                  {/* text-[#919192] bg-[#D4D9DB] */}
                </td>
                <td className="w-1/6  ">
                  <button className=" table-cell ">
                    <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                  </button>
                  <button className=" table-cell  ">
                    <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                  </button>
                  <button className=" table-cell ">
                    <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
                  </button>
                </td>
              </tr>

              {/* <tr className="text-[#7d7f7e]">
               <td className="w-1/6">全店促銷</td>
               <td className="w-1/6">滿2000折100</td>
               <td className="w-1/6">全店通用</td>
               <td className="w-1/6">~2023/12/31</td>
               <td className="w-1/6">
                 <button className="status_ship table-cell rounded-[10px] py-[1px] px-[45px] text-[#FFFDF6] bg-[#5aab8e]">
                   開放中
                 </button>
               </td>
               <td className="w-1/6  ">
                 <button className=" table-cell ">
                   <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                 </button>
                 <button className=" table-cell  ">
                   <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                 </button>
                 <button className=" table-cell ">
                   <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
                 </button>
               </td>
             </tr>
         
             <tr className="text-[#7d7f7e]">
               <td className="w-1/6">射手座企劃</td>
               <td className="w-1/6">限時優惠折扣30%</td>
               <td className="w-1/6">多肉植物、乾燥花</td>
               <td className="w-1/6">~2023/12/22</td>
               <td className="w-1/6">
                 <button className="status_handle table-cell rounded-[10px] py-[1px] px-[45px] text-[#919192] bg-[#D4D9DB]">
                   關閉中
                 </button>
               </td>
               <td className="w-1/6  ">
                 <button className=" table-cell ">
                   <BsPencilSquare className=" table-cell icon  icon-selected fill-[#ffce5d] cursor-pointer " />
                 </button>
                 <button className=" table-cell  ">
                   <RxSlash className="  fill-[#ffce5d] cursor-pointer h-6 w-6 " />
                 </button>
                 <button className=" table-cell ">
                   <BsTrash className="icon  icon-selected fill-[#F58A9E] cursor-pointer" />
                 </button>
               </td>
             </tr> */}
              {/* {tableRows} */}
            </tbody>
          ))}
        </table>
        <ReactPaginate
          forcePage={currentPage}
          nextLabel=">"
          previousLabel="<"
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center my-4"
          pageClassName="mr-2"
          pageLinkClassName="px-3 py-1 rounded text-gray-700 hover:bg-gray-300"
          activeLinkClassName="px-3 py-1 bg-[#e9f6cd] text-gray-700 rounded"
          previousLinkClassName="px-3 py-1 rounded text-gray-700 hover:bg-gray-300 text-2xl font-bold"
          nextLinkClassName="px-3 py-1 rounded text-gray-700 hover:bg-gray-300 text-2xl font-bold"
        />
      </div>
    </>
  );
};

export default CouponList;
