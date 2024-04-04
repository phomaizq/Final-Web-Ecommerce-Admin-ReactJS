import React, { useEffect } from 'react'
import { Table } from 'antd';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  getOrders, 
  updateOrderStatus,
  resetState  
} from "../../features/auth/authSlice";
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
      title: 'Tổng giá',
      dataIndex: 'amount',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'date',
      sorter: (a, b) => a.date - b.date
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const OrderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(resetState());
  }, []);
  const orderState = useSelector((state) => state.auth.orders); //auth.order vì lấy ra đơn hàng của từng auth
  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i]?.user?.fullname,
      amount: orderState[i]?.totalPriceAfterDiscount,
      address: `${orderState[i]?.shippingInfo?.address} ${orderState[i]?.shippingInfo?.city}`, 
      date: new Date(orderState[i].createdAt).toLocaleString(),
      status:(
        <>
          <select
            name=""
            defaultValue={orderState[i].orderStatus ? orderState[i].orderStatus : "Not Processed"}
            className="form-control form-select"
            id=""
            onChange={(e) => setOrderStatus(e.target.value, orderState[i]._id)}
          >
            <option value="Đã đặt hàng">Đã đặt hàng</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đã gửi hàng">Đã gửi hàng</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link 
            to={`/admin/order/${orderState[i]._id}`} 
            className=" fs-3 text-danger">
            <AiOutlineEye />
          </Link>
          {/* <Link className="ms-3 fs-3 text-danger" to="/">
            <AiOutlineDelete />
          </Link> */}
        </>
      ),
    });
  }
  const setOrderStatus = (e, i) => {
    const data = { id: i, status: e };
    dispatch(updateOrderStatus(data));
  };
  return (
    <div>
        <h3 className='mb-4'>Order List</h3>
        <div>
          {<Table columns={columns} dataSource={data} />}
        </div>
    </div>
  )
}

export default OrderList