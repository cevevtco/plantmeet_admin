import React, { useState, useEffect } from "react";
import axios from "axios";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


//Import components
import { Header, SelectBar } from "../components";

//Imported icons
import { BsPencilSquare, BsTrash } from "react-icons/bs";


const baseURL = "http://localhost:8080";

const ProductSelect = () => {
  const [products, setProducts] = useState([]);
  const MySwal = withReactContent(Swal)
  useEffect(() => {
    axios.get(baseURL + "/product/植感選物").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  const handleDelete = async (id, name) => {
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
          Swal.fire({
            title: '刪除失敗',
            text: `產品"${name}"刪除失敗，請稍後再試`,
            icon: 'error',
            confirmButtonColor: '#FFCE5D'
          });
        } else {
           axios.get(baseURL + "/product/植感選物").then((res) => {
            setProducts(res.data);
          });
          Swal.fire({
            title: '此產品已刪除!',
            text: `產品"${name}"已成功刪除!`,
            icon: 'success',
            confirmButtonColor: '#FFCE5D'
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: '刪除失敗',
        text: `產品"${name}"刪除失敗，請稍後再試`,
        icon: 'error',
        confirmButtonColor: '#FFCE5D'
      });
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="商品管理 → 植感選物" />
      <SelectBar
        navLink="/products/create"
        type="product"
        addBtn="新增產品"
        filter1="價格篩選"
        filter2="商品種類"
        option1="多肉植物"
        option2="瓶中生態"
        option3="不凋花"
        option4="DIY材料"
        option5="限定商品"
      />
      <div className="w-full max-w-screen-2xl mx-auto mt-3 ">
        <div className="productSection sm:justify-start justify-center bg-[#FFFDF6] rounded-[10px] shadow-md py-4 px-10">
          <div
            className="productList overflow-y-auto py-4 "
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="flex justify-center w-full flex-wrap gap-8 animate-slideup">
              {products.map((data) => (
                <div
                  key={data.id}
                  className="w-[230px] h-[280px] overflow-hidden bg-white rounded-[20px] shadow-md mb-8"
                  style={{ marginBottom: "-12px" }}
                >
                  <div className="w-full h-[180px] relative group">
                    <div className="absolute top-3 right-3 flex justify-center items-center h-10 w-10  rounded-full bg-white">
                      <BsTrash onClick={() => handleDelete(data.id,data.name)} className=" fill-[#F58A9E] h-8 w-8 cursor-pointer" />
                    </div>
                    <img
                      className="w-full h-full object-cover"
                      src={JSON.parse(data.images)[0]}
                      alt=""
                    />
                    <div className="absolute top-3 left-3 flex justify-center items-center h-10 w-10 rounded-full bg-white">
                      <BsPencilSquare className="fill-[#FFCE5D] h-8 w-8 cursor-pointer" />
                    </div>
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

export default ProductSelect;
