import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

const App = () => {
  // 判斷是否在登入頁面
  const isAuth = false;
  return (
    <>
      {/* 如果不是登入頁面，則渲染  Sidebar */}
      {isAuth ? (
        <div className="containerr">
          <Sidebar />
          <div className="w-[77%] h-full p-[2rem] overflow-auto ">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductSelect />} />
              <Route path="/products/create" element={<ProductCreate />} />
              <Route path="/class" element={<ClassSelect />} />
              <Route path="/class/edit" element={<ClassEdit />} />
              <Route path="/order" element={<OrderSelect />} />
              <Route path="/order/status" element={<OrderStatus />} />
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
