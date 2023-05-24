import React,{ useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

//Imported components
import { Sidebar } from "./components";

//Imported pages
import {
  Dashboard,
  ProductSelect,
  ProductCreate,
  ClassSelect,
  ClassEdit,
  OrderSelect,
  OrderStatus,
  CouponSelect,
  CouponCreate,
  SalesData,
  Info,
  ChangePassword,
  Login,
} from "./pages";

const baseURL = "http://localhost:8080";

const App = () => {
  // 判斷是否在登入頁面
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const cookie = cookies.get("x-access-token");
    if (cookie) {
      axios.get(baseURL + "/user/isAuth", 
       { withCredentials: true }).then((res) => {
        //必須要在發出請求前帶上 withCredentials: true 的設定，在跨域請求時才會正常發出附帶 Cookie 的 header
        if(res.data.id){
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
    }else{
      setIsAuth(false);
    }

   
  }, []);
  return (
    <>
      {/* 如果不是登入頁面，則渲染  Sidebar */}
      {isAuth ? (
        <div className="containerr">
          <Sidebar />
          <div className="w-[77%] h-full p-[2rem] overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductSelect />} />
              <Route path="/products/create" element={<ProductCreate />} />
              <Route path="/class" element={<ClassSelect />} />
              <Route path="/class/edit/:id" element={<ClassEdit />} />
              <Route path="/order" element={<OrderSelect />} />
              <Route path="/order/status/:id" element={<OrderStatus />} />
              <Route path="/coupon" element={<CouponSelect />} />
              <Route path="/coupon/create" element={<CouponCreate />} />
              <Route path="/salesdata" element={<SalesData />} />
              <Route path="/info" element={<Info />} />
              <Route path="/setting" element={<ChangePassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
