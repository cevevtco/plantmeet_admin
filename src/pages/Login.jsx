import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import cookies from "js-cookie";

//Inport icons
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import logo from "../assets/login_page_logo.svg";

import smallPlant from "../assets/smallplant.svg";
import bigPlant from "../assets/bigplant.svg";



const baseUrl = "http://localhost:8080";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

 
  const handleSubmit =  (e) => {
    
    e.preventDefault();
    axios.post(baseUrl +`/user/login`, {
      email: email,
      password: password,
    }).then( (res) => {
      if (res.data.err) {
        setLoginStatus(res.data.err);
      } else {
        // setLoginStatus(res.data.token);
        // localStorage.setItem("token", res.data.token);
        cookies.set("x-access-token", res.data.token, {
          expires: Date.parse(res.data.expiresIn),
          path: "/",
          // httpOnly: true,
        });
        window.location.href = "/";
   
      }
    });
  };

  //Onclick let us get what the user has entered

  // document.body.style.backgroundColor = "#5aab8e";
  return (
    <div className="containerr w-screen h-screen bg-[#5aab8e]">
      <div
        style={{
          position: "absolute",
          width: "458px",
          height: "600px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFFDF6",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "161px",
            height: "50px",
            left: "151.05px",
            top: "60.69px",
          }}
        >
          <img src={logo} alt="Logo" />
        </div>

        <div
          style={{
            position: "absolute",
            width: "240px",
            height: "40px",
            left: "109.55px",
            top: "139.69px",
            fontFamily: "Verdana",
            fontSize: "30px",
            lineHeight: "40px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "0.3em",
            color: "#5AAB8E",
          }}
        >
          後台管理系統
        </div>
        <div
          style={{
            position: "absolute",
            width: "165px",
            height: "21px",
            left: "149.55px",
            top: "189.69px",
            fontFamily: "Poppins",
            fontSize: "14px",
            lineHeight: "21px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "0.045em",
            color: "#8B8B8B",
          }}
        >
          Login to your account
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="adminEmail">
            <input
              
              id="adminEmail"
              type="email"
              name="adminEmail"
              onChange={(e) => setEmail(e.target.value)}
              className="absolute w-[325px] h-[62px] left-[69.05px] top-[240.69px] border-none  rounded-[10px] p-10 pl-14 bg-[#E9F6CD] focus:bg-[#90E07C]"
              style={{
                paddingLeft: "50px",
              }}
              required
            />
            <BsFillPersonFill className="fill-[#252B29] mr-3 absolute w-[20px] h-[20px] top-[44.11%] bottom-[53.39%] right-[78.59%] left-[18.13%]" />
          </label>

          <label htmlFor="adminPwd">
            <input
              id="adminPwd"
              type="password"
              name="adminPwd"
              onChange={(e) => setPassword(e.target.value)}
              className="absolute w-[325px] h-[62px] left-[69.05px] top-[319.69px] border-none  rounded-[10px] p-10 pl-14 bg-[#E9F6CD] focus:bg-[#90E07C]"
              style={{
                paddingLeft: "50px",
              }}
              required
            />
            <AiFillLock className="fill-[#252B29] mr-3 absolute w-[20px] h-[20px] left-[83px] top-[344px]" />
          </label>

          <input
            id="RememberMe"
            type="checkbox"
            className=" absolute left-[60%] right-[35.36%] top-[67.8%] bottom-[31.3%] appearance-none w-4 h-4 border border-gray-300 rounded-full checked:bg-green-900 checked:border-green-900 checked:after:block checked:after:content-['\2714'] checked:after:text-xs checked:after:text-white cursor-pointer"
            defaultChecked={true}
          />
          <label
            htmlFor="RememberMe"
            className="absolute w-[100px] h-[18px] left-[290px] top-[405px]  font-medium font-poppins  text-xs text-green-900 items-center flex ml-2 cursor-pointer"
          >
            Remember me
          </label>
          <h1 className="absolute left-[90px] top-[402px] text-[#ba3737]">
            {loginStatus}
          </h1>

          <input
            style={{
              position: "absolute",
              width: "325px",
              height: "50px",
              left: "69.05px",
              top: "435.69px",
              backgroundColor: "#5AAB8E",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "100px",
            }}
            value="Login"
            type="submit"
          />
        </form>

        <img
          src={smallPlant}
          alt="plantImage1"
          style={{
            position: "absolute",
            width: "48.83px",
            height: "77.13px",
            left: "307.57px",
            top: "522.87px",
          }}
        />
        <img
          src={bigPlant}
          alt="plantImage2"
          style={{
            position: "absolute",
            width: "60.83px",
            height: "96.09px",
            left: "378.57px",
            top: "503.91px",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
