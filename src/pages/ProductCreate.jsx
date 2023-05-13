import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Import components
import { Header } from "../components";

//Import icons
import { TbUpload } from "react-icons/tb";

const baseURL = "http://localhost:8080";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    name: "",
    category_name: "",
    SKU: "",
    price: "",
    qty_in_stock: "",
    description: "",
    content: "",
    others: "",
  });

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
        const images = products.images?JSON.parse(products.images):[];
        console.log(images);
        const imageUrl = res.data.imageUrl;
        console.log(imageUrl);
          if (id > images.length) {
            images.push(res.data.imageUrl);
          } else {
            images[id] = res.data.imageUrl;
          }
          setProducts({ ...products, images: JSON.stringify(images) });
      });

  };

  const MySwal = withReactContent(Swal);

  const handleCreate = async (id, name) => {
    try {
      //新增判斷，如果使用者沒有輸入form的完整資料，在按下確認發布就會先跳出validation alert 使用者沒有輸入完整資料
      if (!products.name || !products.category_name || !products.SKU || !products.price || !products.qty_in_stock || !products.description || !products.content || !products.others) {
        MySwal.fire({
          title: "請輸入完整資料",
          icon: "warning",
          confirmButtonColor: "#FFCE5D",
        });
        return;
      }
      const result = await MySwal.fire({
        title: "確認新增此產品?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "確認發佈",
        confirmButtonColor: "#FFCE5D",
        cancelButtonColor: "#F58A9E",
      });

      if (result.isConfirmed) {

        // const datatoServer = {
        //   name: products.name,
        //   category_name: products.category_name,
        //   SKU: products.SKU,
        //   price: products.price,
        //   qty_in_stock: products.qty_in_stock,
        //   description: products.description,
        //   content: products.content,
        //   others: products.others,
          
        // };
        // console.log(datatoServer);

        const formResponse = await axios.post(baseURL + `/product`,
        products);

        console.log(formResponse);

        // const imageDatatoServer = {
        //   images: JSON.parse(products.images),
        // };

        // const imageResponse = await axios.post(
        //   baseURL + `/product/image`,
        //   imageDatatoServer,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        // console.log(imageResponse);

        // axios.get(baseURL + "/product/植感選物").then((res) => {
        //   setProducts(res.data[0]);
        // });

        MySwal.fire({
          title: "產品已新增成功！",
          icon: "success",
          confirmButtonColor: "#FFCE5D",
          didClose: () => {
            navigate("/products");
          },
        });
      } else if (result.isDenied) {
        MySwal.fire({
          title: "新增失敗",
          text: `產品新增失敗，請稍後再試`,
          icon: "error",
          confirmButtonColor: "#FFCE5D",
        });
      }
    } catch (error) {
      console.log(error);
      MySwal.fire({
        title: "新增失敗",
        text: `產品新增失敗，請稍後再試`,
        icon: "error",
        confirmButtonColor: "#FFCE5D",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto ">
      <Header title="植感選物 → 新增產品" />

      <div className=" w-full max-w-screen-2xl mx-auto mt-10 animate-slideup ">
        <div className=" sm:justify-start justify-center h-[780px] overflow-scroll bg-white rounded-[10px] shadow-md py-4 px-10 ">
          <div className="flex flex-col items-center w-full mt-10 gap-8">
            <div className="flex items-center justify-between w-full mb-4 space-x-4">
              <NavLink
                to="/products"
                className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg flex items-center"
              >
                <span>返回上一頁</span>
              </NavLink>
              <form className="flex items-center space-x-4 ml-auto">
                <input
                  type="button"
                  value="確認發佈"
                  onClick={() => handleCreate(products.id, products.name)}
                  className="bg-[#FFCE5D] text-white py-2 px-4 rounded-lg cursor-pointer"
                />
              </form>
            </div>

            <div className="flex sm:justify-start justify-center h-[600px] items-center  w-full max-w-screen-2xl mx-auto mt-3  overflow-scroll">
              <div className="flex flex-col w-[750px] mr-10 h-full  ">
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
                      {products.images ? (
                          <img
                            src={
                              JSON.parse(products.images)[0].includes("imgur")
                                ? JSON.parse(products.images)[0]
                                : `${baseURL}/${JSON.parse(products.images)[0]}`
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
                  )}
                </Dropzone>
                <div className="flex justify-center w-full  mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-3 w-full mx-auto">
                    {/* 設判斷有圖的話就顯示，沒圖的話就顯示上傳符號 */}
                    {products.images ? (
                      <div className="flex w-full  rounded-xl gap-3">
                        {JSON.parse(products.images).map((image, index) => (
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
                          length: 4 - JSON.parse(products.images).length,
                        }).map((_, index) => (
                          <Dropzone
                            key={index}
                            accept={"image/*"}
                            onDrop={
                              (acceptedFiles) =>
                                handleOnDrop(
                                  acceptedFiles,
                                  JSON.parse(products.images).length + index
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
                        {Array.from({ length: 4 }).map((_, index) => (
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

              <div className="h-full flex flex-col justify-start items-center   w-[524.88px]  justify-self-start  overflow-scroll   ">
                <form className="flex flex-wrap  flex-col items-center gap-5 w-full ">
                  <label
                    htmlFor="product_name"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">產品名稱：</span>
                    <input
                      type="text"
                      name="product_name"
                      value={products.name}
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          name: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor="SKU"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 pl-5 w-[90px]">SKU：</span>
                    <input
                      type="text"
                      name="SKU"
                      value={products.SKU}
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          SKU: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor="category_name"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="flex  mb-2 w-[90px]">產品分類：</span>
                    <select

                      type="text"
                      name="category_name"
                      className="border-none text-black py-2 px-6 flex bg-[#E9F6CD] rounded-lg w-[400px]"
                      value={products.category_name}
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          category_name: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">選擇分類</option>
                      <option value="多肉植物">多肉植物</option>
                      <option value="瓶中生態">瓶中生態</option>
                      <option value="不凋花">不凋花</option>
                      <option value="DIY材料">DIY材料</option>
                      <option value="限定商品">限定商品</option>
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
                      value={products.price}
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          price: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor="qty_in_stock"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-2 w-[90px] text-center">
                      庫存數量：
                    </span>
                    <input
                      name="qty_in_stock"
                      value={products.qty_in_stock}
                      type="number"
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px]"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          qty_in_stock: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor="description"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-16 w-[90px] text-center">
                      產品描述：
                    </span>
                    <textarea
                      name="description"
                      value={products.description}
                      className="bg-[#E9F6CD]  py-2 px-6 flex rounded-lg w-[400px] h-[80px] resize-none"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label
                    htmlFor="content"
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <span className="mb-36 w-[90px] text-center">
                      產品內容：
                    </span>
                    <textarea
                      name="content"
                      value={products.content}
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[150px] resize-none"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          content: e.target.value,
                        })
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
                      value={products.others}
                      className="bg-[#E9F6CD] py-2 px-6 flex rounded-lg w-[400px] h-[100px] resize-none"
                      onChange={(e) =>
                        setProducts({
                          ...products,
                          others: e.target.value,
                        })
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

export default ProductCreate;


