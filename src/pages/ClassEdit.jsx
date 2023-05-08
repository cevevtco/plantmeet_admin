import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Import components
import { Header } from "../components";

//Import icons
import { TbUpload } from "react-icons/tb";

const baseURL = "http://localhost:8080";

const ClassEdit = () => {
  const { id } = useParams();
  // console.log(id);
  const [classes, setClasses] = useState([]);


  const MySwal = withReactContent(Swal);
  useEffect(() => {
    axios.get(baseURL + `/product/體驗課程/${id}`).then((res) => {
      if (res.data) {
        console.log(res.data);
        console.log(res.data[0].images);
        setClasses(res.data[0]);
      }
    });
  }, [id]);
  //onChange 改變編輯的值
  const handleChange = async (id, name) => {
    try {
      const result = await MySwal.fire({
        title: "確認完成修改並發佈?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確認發佈",
        confirmButtonColor: "#FFCE5D",
        cancelButtonColor: "#F58A9E",
      });
      if (result.isConfirmed) {
        MySwal.fire({
          title: "資料已更新！",
          icon: "success",
          confirmButtonColor: "#FFCE5D",
        });
      } else if (result.isDenied) {
        MySwal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: "修改失敗",
        text: `課程"${name}"修改失敗，請稍後再試`,
        icon: "error",
        confirmButtonColor: "#FFCE5D",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="體驗課程 → 課程編輯" />

      <div className=" w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <NavLink
                to="/class"
                className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg flex items-center"
              >
                <span>返回上一頁</span>
              </NavLink>
              <form className="flex items-center space-x-4 ml-auto">
                <input
                  type="button"
                  value="確認發佈"
                  className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg cursor-pointer"
                  onClick={() => handleChange(id)}
                />
              </form>
            </div>

              <div
                key={classes.id}
                className="flex sm:justify-start justify-center  items-center  w-full max-w-screen-2xl mx-auto mt-3  overflow-scroll"
              >
                <div className="flex flex-col w-[750px] mr-10  h-[650px] ">
                  <div className="flex  justify-center w-full bg-gray-200  rounded-xl h-[480px] mb-4 hover:opacity-75 cursor-pointer">
                    {classes.images ? (
                      <img
                        src={
                          JSON.parse(classes.images)[0].includes("imgur")
                            ? JSON.parse(classes.images)[0]
                            : `${baseURL}/${JSON.parse(classes.images)[0]}`
                        }
                        alt="larger picture"
                        className=" object-cover w-[750px]  h-[480px] object-center   rounded-xl"
                      />
                    ) : (
                      <div>
                        <TbUpload className="text-8xl text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center w-full mx-auto">
                    <div className="flex flex-wrap justify-center items-center gap-3 w-full mx-auto">
                      {/* 設判斷有圖的話就顯示，沒圖的話就顯示上傳符號 */}
                      {classes.images ? (
                        <div className="flex w-full  rounded-xl gap-3">
                          {JSON.parse(classes.images).map((image, index) => (
                            <img
                              key={index}
                              src={
                                image.includes("imgur")
                                  ? image
                                  : `${baseURL}/${image}`
                              }
                              alt="smaller picture"
                              className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                            />
                          ))}
                          {Array.from({
                            length: 5 - JSON.parse(classes.images).length,
                          }).map((_, index) => (
                            <div
                              className="flex justify-center items-center rounded-xl flex-1 w-[130px] h-[110px] bg-gray-200 hover:opacity-75 cursor-pointer"
                              key={index}
                            >
                              <TbUpload className=" text-4xl text-gray-400" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex w-full  rounded-xl gap-3">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div
                              className="flex justify-center items-center rounded-xl flex-1 w-[130px] h-[110px] bg-gray-200 hover:opacity-75 cursor-pointer"
                              key={index}
                            >
                              <TbUpload className=" text-4xl text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col justify-start items-center   w-[524.88px]  justify-self-start  overflow-scroll h-[650px]  ">
                  <form className="flex flex-wrap  flex-col items-center gap-5 w-full ">
                    <label
                      htmlFor="courseName"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="flex  mb-2 w-[90px]">課程名稱：</span>
                      <input
                        type="text"
                        value={classes.name}
                        onChange={(e) => setClasses({ ...classes, name: e.target.value})}
                        name="courseName"
                        className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                      />
                    </label>
                    <label
                      htmlFor="courseCategory"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="flex  mb-2 w-[90px]">課程分類：</span>
                      <select
                        type="text"
                        name="courseCategory"
                        className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                        value={classes.category_name}
                        onChange={(e) => setClasses({ ...classes, category_name: e.target.value})}
                      >
                        <option value="">選擇分類</option>
                        <option value="現場體驗">現場體驗</option>
                        <option value="線上課程">線上課程</option>
                      </select>
                    </label>
                    <label
                      htmlFor="price"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="mb-2 w-[90px] text-center">價格：</span>
                      <input
                        type="number"
                        name="price"
                        value={classes.price}
                        className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                        onChange={(e) => setClasses({ ...classes, price: e.target.value})}

                      />
                    </label>
                    <label
                      htmlFor="qty_in_stock"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="mb-2 w-[90px] text-center">數量：</span>
                      <input
                        type="number"
                        name="qty_in_stock"
                        value={classes.qty_in_stock}
                        className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                        onChange={(e) => setClasses({ ...classes, qty_in_stock: e.target.value})}

                      />
                    </label>
                    <label
                      htmlFor="description"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="mb-20 w-[90px] text-center">
                        課程描述：
                      </span>
                      <textarea
                        name="description"
                        value={classes.description}
                        className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none"
                        onChange={(e) => setClasses({ ...classes, description: e.target.value})}

                      />
                    </label>
                    <label
                      htmlFor="content"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="mb-40 w-[90px] text-center">
                        課程內容：
                      </span>
                      <textarea
                        name="content"
                        value={classes.content}
                        className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[170px] resize-none"
                        onChange={(e) => setClasses({ ...classes, content: e.target.value})}

                      />
                    </label>
                    <label
                      htmlFor="others"
                      className="flex justify-center items-center flex-shrink-0"
                    >
                      <span className="mb-20 w-[90px] text-center">
                        其他資訊：
                      </span>
                      <textarea
                        name="others"
                        value={classes.others}
                        className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none"
                        onChange={(e) => setClasses({ ...classes, others: e.target.value})}

                      />
                    </label>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassEdit;
