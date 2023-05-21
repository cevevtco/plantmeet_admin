import React, { useState, useEffect } from "react";

import axios from "axios";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";

//Imported components
import { Header, SelectBar } from "../components";
import { NavLink } from "react-router-dom";
import Select from "react-select";


const baseURL = "http://localhost:8080";

const ClassSelect = () => {
  const [classes, setClasses] = useState([]);
  
  const MySwal = withReactContent(Swal)
  useEffect(() => {
    axios.get(baseURL + "/product/體驗課程").then((res) => {
      console.log(res.data);
      setClasses(res.data);
    });
  }, []);

  const handleDelete = async (id, name) => {
    //id, name要改變的值
    try {
      const result = await MySwal.fire({
        title: `確認刪除 "${name}" ?`,
        text: "刪除後將無法恢復!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFCE5D',
        cancelButtonColor: '#F58A9E',
        confirmButtonText: '是的, 確定刪除!'
      });
  
      if (result.isConfirmed) {
        const response =  await axios.delete(baseURL + `/product/${id}`);
        console.log(response);
        if(response.err) {
          MySwal.fire({
            title: '刪除失敗',
            text: `課程"${name}"刪除失敗，請稍後再試`,
            icon: 'error',
            confirmButtonColor: '#FFCE5D'
          });
        } else {
           axios.get(baseURL + "/product/體驗課程").then((res) => {
            setClasses(res.data);
          });
          MySwal.fire({
            title: '此課程已刪除!',
            text: `課程"${name}"已成功刪除!`,
            icon: 'success',
            confirmButtonColor: '#FFCE5D'
          });
        }
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: '刪除失敗',
        text: `課程"${name}"刪除失敗，請稍後再試`,
        icon: 'error',
        confirmButtonColor: '#FFCE5D'
      });
    }
  };
 
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="商品管理 → 體驗課程" />
      <SelectBar
        type="class"
        addBtn="新增課程"
        filter1="價格篩選"
        filter2="課程種類"
        option1="現場體驗"
        option2="線上課程"
      />

      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="productSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="productList overflow-y-auto py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center w-full flex-wrap gap-8 animate-slideup">
              {classes.map((data) => (
                //map遍歷每個classes的資料放到data
                <div
                  key={data.id}
                  className="w-[290px] h-[310px] overflow-hidden bg-white rounded-[20px] shadow-md mb-8"
                  style={{ marginBottom: "-12px" }}
                >
                  <div className="w-full h-[210px] relative group">
                    <div className="absolute top-3 right-3 flex justify-center items-center h-10 w-10  rounded-full bg-white">
                      <BsTrash
                        onClick={() => handleDelete(data.id,data.name)}
                        className="fill-[#F58A9E] h-8 w-8 cursor-pointer"
                      />
                    </div>
                  {data.images && (
                      <img
                      className="w-full h-full object-cover "
                      src={
                          JSON.parse(data.images)[0].includes("imgur")
                            ? JSON.parse(data.images)[0]
                            : `${baseURL}/${JSON.parse(data.images)[0]}`
                        }
                      alt="classPicture"
                    />

                  )}
                  
                    <NavLink
                      to={`/class/edit/${data.id}`}
                      className="absolute top-3 left-3 flex justify-center items-center h-10 w-10 rounded-full bg-white"
                    >
                      <BsPencilSquare className="fill-[#FFCE5D] h-8 w-8 " />
                    </NavLink>
                  </div>
                  <div className="p-4 flex flex-col">
                    <p className="font-semibold text-sm text-[#8CABA2] truncate mb-1">
                      {data.SKU}
                    </p>
                    <p className="font-normal text-lg text-black truncate mb-1 tracking-[0.5rem]">
                      {data.name}
                    </p>
                    <p className="text-sm truncate text-black mt-1 tracking-[0.5rem]">
                      NT${data.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassSelect;
