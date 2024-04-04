import React, {useEffect, useState} from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { getUsers } from "../../features/customer/customerSlice";
import { Button } from 'antd';
const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'mobile',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
];
const Customer = () => {
  const dispatch = useDispatch();
  const [unlocked, setBlocked] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].permission !== "admin") {
      data.push({
        key: i + 1,
        name: customerstate[i].fullname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        action: (
          <>
            <Button 
              icon={unlocked ? <AiFillLock className='fs-4' /> : <AiFillUnlock className='fs-4' />}
              className="ms-3 fs-3 text-danger"
              onClick={() => setBlocked(!unlocked)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </>
        )
      });
    }
  }
  return (
    <div>
        <h3 className='mb-4'>Customer</h3>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Customer