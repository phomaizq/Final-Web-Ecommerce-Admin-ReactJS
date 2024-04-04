import React, { useEffect, useState } from 'react'
import { Select } from "antd"
import CustomInput from '../../components/CustomInput'
import ReactQuill from 'react-quill' //form edit text
import 'react-quill/dist/quill.snow.css'
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Dropzone from "react-dropzone" //upload image
import { getBrands } from "../../features/brand/brandSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getColors } from "../../features/color/colorSlice";
import { 
  createProducts, 
  resetState,
  getAProduct,
  updateAProduct 
} from "../../features/product/productSlice";
import { delImg, uploadImg } from "../../features/upload/uploadSlice"
let schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tên sản phẩm"),
    description: yup.string().required("Vui lòng nhập tên mô tả"),
    price: yup.number().required("Vui lòng nhập giá"),
    brand: yup.string().required("Vui lòng chọn thương hiệu"),
    category: yup.string().required("Vui lòng chọn danh mục"),
    tags: yup.string().required("Vui lòng nhập tag"),
    color: yup
        .array()
        .min(1, "Chọn ít nhất 1 màu sắc")
        .required("Vui lòng chọn màu sắc"),
    quantity: yup.number().required("Vui lòng nhập số lượng"),
});
const AddProduct = () => {
  // khai báo dispatch, useState
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = useState([])
  // lấy dữ liệu 
  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getColors())
  }, [])
  // gấn dữ liệu cho biến
  const getProductId = location.pathname.split("/")[3];
  const brandState = useSelector((state) => state.brand.brands)
  const categoryState = useSelector((state) => state.category.categories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)
  const newProduct = useSelector((state) => state.product) //tạo state newproduct để nhận dữ liệu từ form
  const { 
    isSuccess, 
    isError, 
    isLoading, 
    createdProduct,
    updatedProduct,
    productName,
    productDesc,
    productBrand,
    productCategory,
    productColor,
    productTags,
    productPrice,
    productQuantity,
    productImages 
  } = newProduct
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      color.push(productColor)
      img.push(productImages);
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  // check trạng thái thành công thì toast thông báo và ngược lại
  useEffect(() => {
    if (isSuccess, createdProduct){
      toast.success('🦄 Thêm thành công!')
    }
    if (isSuccess && updatedProduct) {
      toast.success("🦄 Sửa thành công!");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error('🦄 Có lỗi xảy ra! Vui lòng kiểm tra lại')
    }
  }, [isSuccess, isError, isLoading]) // có dependency thì sẽ ngưng sau mỗi lần thực thi
  // do dùng model Select của antdesign nên phải tạo 1 hàm riêng
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  // hàm handle giống antdesign để add được nhiều lựa chọn
  const handleColors = (e) => {
    setColor(e);
  };
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: productName ||"",
      description: productDesc || "",
      price: productPrice ||"",
      brand: productBrand ||"",
      category: productCategory || "",
      tags: productTags || "",
      color: "",
      quantity: productQuantity || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values)) // khi ấn submit sẽ đưa values vào hàm createproduct
        formik.resetForm()
        setColor(null)
        setTimeout(() => {
          dispatch(resetState()) // reset lại trạng thái State của newproduct
        }, 1000)
      }
    },
  })
  
  return (
    <div>
        <h3 className='mb-4'>
         {getProductId !== undefined ? "Sửa" : "Thêm"} sản phẩm
        </h3>
        <div className=''>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput 
                  type='text' 
                  label='Nhập tên sản phẩm' 
                  name = 'title'
                  onChange = {formik.handleChange("title")}
                  onBlur = {formik.handleBlur("title")}
                  value={formik.values.title}
                />
                <div className="error mb-3">
                  {formik.touched.title && formik.errors.title}
                </div>

                <select
                  className='form-control py-3 mb-3'
                  name='brand' 
                  onChange = {formik.handleChange("brand")}
                  onBlur = {formik.handleBlur("brand")}
                  value={formik.values.brand}
                  id=''
                  >
                    <option value=''>Chọn thương hiệu</option>
                    {brandState.map((i, j) => {
                      return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                      );
                    })}
                </select>
                <div className="error mb-3">
                  {formik.touched.brand && formik.errors.brand}
                </div>

                <select 
                  className='form-control py-3 mb-3' 
                  name='' 
                  onChange = {formik.handleChange("category")}
                  onBlur = {formik.handleBlur("category")}
                  value={formik.values.category}
                  id=''>
                    <option value=''>Chọn danh mục</option>
                    {categoryState.map((i, j) => {
                      return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                      );
                    })}
                </select>
                <div className="error mb-3">
                  {formik.touched.category && formik.errors.category}
                </div>

                <select 
                  className='form-control py-3 mb-3'
                  name='tags' 
                  onChange = {formik.handleChange("tags")}
                  onBlur = {formik.handleBlur("tags")}
                  value={formik.values.tags}
                  id=''>
                    <option value=''>Chọn tags</option>
                    <option value="Featured">Featured</option>
                    <option value="Popular">Popular</option>
                    <option value="Special">Special</option>
                </select>
                <div className="error mb-3">
                  {formik.touched.tags && formik.errors.tags}
                </div>
                <CustomInput 
                  type='number' 
                  label='Nhập số lượng sản phẩm' 
                  name = 'quantity'
                  onChange = {formik.handleChange("quantity")}
                  onBlur = {formik.handleBlur("quantity")}
                  value={formik.values.quantity}
                />
                <div className="error mb-3">
                  {formik.touched.quantity && formik.errors.quantity}
                </div>
                <CustomInput 
                  type='number' 
                  label='Nhập giá sản phẩm' 
                  name = 'price'
                  onChange = {formik.handleChange("price")}
                  onBlur = {formik.handleBlur("price")}
                  value={formik.values.price}
                />
                <div className="error mb-3">
                  {formik.touched.price && formik.errors.price}
                </div>
                <Select
                  mode="multiple"
                  allowClear
                  className="w-100 from-control"
                  placeholder="Chọn màu sắc"
                  defaultValue={color}
                  onChange={(i) => handleColors(i)}
                  options={coloropt}
                />
                <div className="error mb-3">
                  {formik.touched.color && formik.errors.color}
                </div>
                <ReactQuill 
                    theme="snow" 
                    value={formik.values.description} 
                    name = 'description' 
                    onChange = {formik.handleChange("description")}
                    // onBlur = {formik.handleBlur("description")}
                />
                <div className="error mb-3">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="bg-white border-1 p-5 text-center mt-3">
                  <Dropzone
                    onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                          Kéo 'và' thả một số tệp vào đây hoặc nhấp để chọn tệp
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className="showimages d-flex flex-wrap gap-3 mt-3">
                  {imgState?.map((i, j) => {
                    return (
                      <div className=" position-relative d-flex col-2" key={j}>
                        <button
                          type="button"
                          onClick={() => dispatch(delImg(i.public_id))}
                          className="btn-close position-absolute"
                          style={{ top: "10px", right: "10px" }}
                        ></button>
                        <img src={i.url} alt="" className='img-fluid' />
                      </div>
                    );
                  })}
                </div>
                <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                  {getProductId !== undefined ? "Sửa" : "Thêm"} sản phẩm
                </button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct