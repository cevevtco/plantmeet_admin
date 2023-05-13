import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Dropzone, { useDropzone } from "react-dropzone";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Import components
import { Header } from "../components";

//Import icons
import { TbUpload } from "react-icons/tb";

const baseURL = "http://localhost:8080";

const ClassEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const [classes, setClasses] = useState([]);
  // const [image, setImage] = useState(null);

  //ReactDropzone 用於上傳圖片
  const handleOnDrop = (acceptedFiles, id) => {
    console.log(id);
    // Assuming only one file was dropped
    const file = acceptedFiles[0];
    console.log(file);

    // Creating a URL for the dropped image

    axios
      .post(
        baseURL + "/product/imageUpload",
        { image: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      //then方法處理axios請求成功後的回應
      //從後端返回的資料res.send({"imageUrl": imgPath});
      .then((res) => {
        // 獲取上傳的圖片 URL
        const images = JSON.parse(classes.images);
        console.log(images);
        const imageUrl = res.data.imageUrl;
        console.log(imageUrl);
        if (images) {
          //if 檢查 images 陣列是否存在
          if (id > images.length) {
            images.push(res.data.imageUrl);
            //如果存在，則表示它包含了一些已經上傳的圖片 URL，需要將新的圖片 URL 加入到這個陣列中
          } else {
            images[id] = res.data.imageUrl;
            //否則，表示這是第一次上傳圖片，我們需要創建一個新的圖片 URL 陣列 (如果一開始沒圖片的話)
          }
          setClasses({ ...classes, images: JSON.stringify(images) });
        } else {
          setClasses({
            ...classes,
            images: JSON.stringify([res.data.imageUrl]),
          });
        }
      });
  };
  // const onDrop = (acceptedFiles) => {
  //   handleOnDrop(acceptedFiles, 0);
  //   // Assuming only one file was dropped
  //   const file = acceptedFiles[0];

  //   // Creating a URL for the dropped image

  //   axios
  //     .post(baseURL + "/product/imageUpload", {'image': file}, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {

  //       console.log(res);
  //     });

  // Setting the image state to the URL
  // setImage(imageUrl);

  // Revoking URL after image is saved
  // to release memory
  // saveImageToDatabase(imageUrl).then(() => {
  //   URL.revokeObjectURL(imageUrl);
  // });
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: "image/*",
  // });

  //MySwal 用於美化Alert提示
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
        const datatoServer = {
          name: classes.name,
          category_name: classes.category_name,
          price: classes.price,
          qty_in_stock: classes.qty_in_stock,
          description: classes.description,
          content: classes.content,
          others: classes.others,
        };
        const formResponse = await axios.put(
          baseURL + `/product/${id}`,
          datatoServer
        );
        console.log(formResponse);

        const imageDatatoServer = {
          images: JSON.parse(classes.images),
        };

        const imageResponse = await axios.put(
          baseURL + `/product/image/${id}`,
          imageDatatoServer,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(imageResponse);

        axios.get(baseURL + `/product/體驗課程/${id}`).then((res) => {
          setClasses(res.data[0]);
        });

      
        MySwal.fire({
          title: "資料已更新！",
          icon: "success",
          confirmButtonColor: "#FFCE5D",
          didClose: () => {
            navigate("/class");
          }
        });
       
      } else if (result.isDenied) {
        MySwal.fire({
          title: "修改失敗",
          text: `課程"${name}"修改失敗，請稍後再試`,
          icon: "error",
          confirmButtonColor: "#FFCE5D",
        });
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
                  onClick={() => handleChange(classes.id, classes.name)}
                />
              </form>
            </div>

            <div
              key={classes.id}
              className="flex sm:justify-start justify-center  items-center  w-full max-w-screen-2xl mx-auto mt-3  overflow-scroll"
            >
              <div className="flex flex-col w-[750px] mr-10  h-[650px] ">
                <Dropzone
                  accept={"image/*"}
                  onDrop={(files) => handleOnDrop(files, 0)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex  justify-center w-full bg-gray-200  rounded-xl h-[480px] mb-4 hover:opacity-75 cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      {classes.images ? (
                        <>
                          {/* {classes.images ? (
                        <img
                          src={classes.images}
                          alt="Uploaded image"
                          className=" object-cover w-[750px]  h-[480px] object-center   rounded-xl"
                        />
                      ) : ( */}
                          <img
                            src={
                              JSON.parse(classes.images)[0].includes("imgur")
                                ? JSON.parse(classes.images)[0]
                                : `${baseURL}/${JSON.parse(classes.images)[0]}`
                            }
                            alt="larger picture"
                            className=" object-cover w-[750px]  h-[480px] object-center   rounded-xl"
                          />
                          {/* )} */}
                        </>
                      ) : (
                        <div>
                          {/* {image ? (
                        <img
                          src={image}
                          alt="Uploaded image"
                          className=" object-cover w-[750px]  h-[480px] object-center   rounded-xl"
                        />
                      ) : ( */}
                          <TbUpload className="text-8xl text-gray-400" />
                          {/* )} */}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
                <div className="flex justify-center w-full mx-auto">
                  <div className="flex flex-wrap justify-center items-center gap-3 w-full mx-auto">
                    {/* 設判斷有圖的話就顯示，沒圖的話就顯示上傳符號 */}
                    {classes.images ? (
                      <div className="flex w-full  rounded-xl gap-3">
                        {JSON.parse(classes.images).map((image, index) => (
                          <Dropzone
                            key={index}
                            accept={"image/*"}
                            onDrop={(acceptedFiles) =>
                              handleOnDrop(acceptedFiles, index)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                className="flex w-full flex-1"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <img
                                  src={
                                    image.includes("imgur")
                                      ? image
                                      : `${baseURL}/${image}`
                                  }
                                  alt="smaller picture"
                                  className="object-cover object-center rounded-xl flex-1 w-[130px] h-[110px] hover:opacity-75 cursor-pointer"
                                />
                              </div>
                            )}
                          </Dropzone>
                        ))}
                        {Array.from({
                          length: 5 - JSON.parse(classes.images).length,
                        }).map((_, index) => (
                          <Dropzone
                            key={index}
                            accept={"image/*"}
                            onDrop={
                              (acceptedFiles) =>
                                handleOnDrop(
                                  acceptedFiles,
                                  JSON.parse(classes.images).length + index
                                )
                              //classes.images 是一JSON物件，使用 JSON.parse() 可以將 JSON 字符串轉換為對應的 JavaScript 對象或數組
                              //JSON.parse(classes.images).length 表示已存在的文件數量
                              //index 變數表示了新的文件應該插入的位置
                              //兩個值相加，就可以得到新放的文件應當插入的位置
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                                className="flex justify-center items-center rounded-xl flex-1 w-[130px] h-[110px] bg-gray-200 hover:opacity-75 cursor-pointer"
                              >
                                <input {...getInputProps()} />

                                <TbUpload className=" text-4xl text-gray-400" />
                              </div>
                            )}
                          </Dropzone>
                        ))}
                      </div>
                    ) : (
                      <div className="flex w-full  rounded-xl gap-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Dropzone
                            key={index}
                            accept={"image/*"}
                            onDrop={(acceptedFiles) =>
                              handleOnDrop(acceptedFiles, index)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                                className="flex justify-center items-center rounded-xl flex-1 w-[130px] h-[110px] bg-gray-200 hover:opacity-75 cursor-pointer"
                              >
                                <input {...getInputProps()} />

                                <TbUpload className=" text-4xl text-gray-400" />
                              </div>
                            )}
                          </Dropzone>
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
                      onChange={(e) =>
                        setClasses({ ...classes, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClasses({
                          ...classes,
                          category_name: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setClasses({ ...classes, price: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClasses({ ...classes, qty_in_stock: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClasses({ ...classes, description: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClasses({ ...classes, content: e.target.value })
                      }
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
                      onChange={(e) =>
                        setClasses({ ...classes, others: e.target.value })
                      }
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
