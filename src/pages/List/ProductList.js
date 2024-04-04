import React, {useEffect, useState} from 'react'
import { Table } from 'antd'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { 
  getProducts,
  resetState,
  deleteAProduct
} from "../../features/product/productSlice"
import { Link } from "react-router-dom"
import CustomModal from "../../components/CustomModal"
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
];
const ProductList = () => {
  //deleted
  const [open, setOpen] = useState(false)
  const [productId, setproductId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setproductId(e)
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts())
  }, [])
  const productState = useSelector((state) => state.product.products)
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i]?.title,
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      color: productState[i]?.color[i].title,
      quantity: productState[i]?.quantity,
      price: `${productState[i]?.price} VNĐ`,
      action: (
        <>
          <Link 
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)} //chuyền id vào biến categoryId ở dòng 30
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    })
  }
  const deleteProduct= (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteAProduct(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getProducts()) // xóa xong load lại danh asch1
    }, 1000)
  }
  return (
    <>
      <div>
        <h3 className='mb-4'>Danh sách sản phẩm</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteProduct(productId);
          }}
          title="Bạn có chắc chắn muốn xóa?"
        />
      </div>
    </>
  )
}

export default ProductList