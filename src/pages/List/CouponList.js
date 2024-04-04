import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  deleteACoupon, 
  getCoupons, 
  resetState
} from "../../features/coupon/couponSlice";
import CustomModal from "../../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },

  {
    title: "Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = (e) => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
    dispatch(resetState());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      title: couponState[i].title,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <AiOutlineEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (values) => {
    dispatch(deleteACoupon(values));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 1000);
  };
  return (
    <div>
      <h3 className="mb-4">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default CouponList;