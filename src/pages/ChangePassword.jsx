import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";


//Imported components
import { Header } from "../components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseURL = "http://localhost:8080";
const MySwal = withReactContent(Swal);

const ChangePassword = () => {

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const cookie = cookies.get("x-access-token");
    if (cookie) {
      axios.get(baseURL + "/user/isAuth", 
       { withCredentials: true }).then((res) => {
        if(res.data.id){
          setIsAuth(true);
          setEmail(res.data.email);
          setUserId(res.data.id);

       
          console.log(res.data.email);
        } else {
          setIsAuth(false);

        }
      })
    }else{
      setIsAuth(false);
    }

   
  }, []);

  // const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (newPassword !== confirmPassword) {
  //     setPasswordMatch(false);
  //     return;
  //   }
  //   // 提交表單
  //   setPasswordMatch(true);
  // };

  const handleSubmit = async (id) => {
    try {
      if( !newPassword || !confirmPassword){
        MySwal.fire({
          title: "請輸入密碼",
          icon: "warning",
          confirmButtonColor: "#FFCE5D",
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordMatch(false);
        MySwal.fire({
          title: "新密碼輸入不一致，請重新輸入",
          icon: "warning",
          confirmButtonColor: "#FFCE5D",
        });
        return;
      }
      //輸入的原密碼如果不等於資料的密碼，就會出錯
      // if(oldPassword !== password){
      //   MySwal.fire({
      //     title: "原密碼輸入不一致，請重新輸入",
      //     icon: "warning",
      //     confirmButtonColor: "#FFCE5D",
      //   });
      //   return;
      // }
      
      const result = await MySwal.fire({
        title: "確認修改密碼?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確認修改",
        confirmButtonColor: "#FFCE5D",
        cancelButtonColor: "#F58A9E",
      });
      if (result.isConfirmed) {
        const datatoServer = {
          password: newPassword,
        };
        console.log(datatoServer);
        const formResponse = await axios.put(
          baseURL + `/user/${id}`,
          datatoServer
        );
        console.log(formResponse);

        setPasswordMatch(true);

        MySwal.fire({
          title: "密碼已更新！",
          icon: "success",
          confirmButtonColor: "#FFCE5D",
          // didClose: () => {
          //   navigate("/class");
          // }
        });
      } else if (result.isDenied) {
        MySwal.fire({
          title: "更新失敗",
          text: `密碼更新失敗，請稍後再試`,
          icon: "error",
          confirmButtonColor: "#FFCE5D",
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: "更新失敗",
        text: `密碼更新失敗，請稍後再試`,
        icon: "error",
        confirmButtonColor: "#FFCE5D",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header title="密碼變更" />
      <div className="Info w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className="flex justify-center items-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md  ">
          <form
            className="flex flex-col items-center gap-12 text-2xl "
          >
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="flex mb-2 w-[150px]">Email帳號：</span>
              {isAuth && (
                <input
                  type="email"
                  placeholder={email}
                  className="border-none text-black py-2 px-6 flex bg-slate-200 rounded-lg w-[400px]"
                  disabled
                />
              )}
            </label>
            {/* <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[150px] text-center">原密碼：</span>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
              />
            </label> */}
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[150px] text-center">新密碼：</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
              />
            </label>
            <label
              htmlFor=""
              className="flex justify-center items-center flex-shrink-0"
            >
              <span className="mb-2 w-[150px] text-center">確認新密碼：</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
              />
            </label>
            {!passwordMatch && <div className="text-red-500">新密碼輸入不一致</div>}
            <input
              type="button"
              value="變更密碼"
              onClick={() => handleSubmit(userId)}
              className="rounded-[100px] bg-[#5aab8e] text-white px-40 py-4 mt-8 cursor-pointer "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
