import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  deleteACategory,
  getCategories,
  resetState,
} from "../../features/category/categorySlice";
import CustomModal from "../../components/CustomModal";
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const CategoryList = () => {
  //deleted category
  const [open, setOpen] = useState(false)
  const [categoryId, setcategoryId] = useState('')
  const showModal = (e) => {
    setOpen(true)
    setcategoryId(e)
  }
  const hideModal = (e) => {
    setOpen(false)
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const categoryState = useSelector((state) => state.category.categories);
  const data = [];
  for (let i = 0; i < categoryState.length; i++) {
    data.push({
      key: i + 1,
      name: categoryState[i].title,
      action: (
        <>
          <Link 
            to={`/admin/category/${categoryState[i]._id}`}
            className=" fs-3 text-danger">
            <AiOutlineEdit />
          </Link>
          <button 
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categoryState[i]._id)} //chuyền id vào biến categoryId ở dòng 30
          >
            <AiOutlineDelete />
          </button>
        </>
      )
    });
  }
  const deleteCategory = (values) => { // viết giống hàm validation submit add brand
    dispatch(deleteACategory(values))
    setOpen(false)
    setTimeout(() => {
      dispatch(getCategories()) // xóa xong load lại danh asch1
    }, 1000)
  }
  return (
    <div>
        <h3 className='mb-4'>Danh sách danh mục</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(categoryId);
          }}
          title="Bạn có chắc chắn muốn xóa?"
        />
    </div>
  )
}

export default CategoryList