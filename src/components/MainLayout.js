import React, {useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUnorderedList,
  AiOutlineFileSearch,
} from 'react-icons/ai'
import {
  SiBrandfolder,
  SiProducthunt,
  SiBlogger
} from 'react-icons/si'
import { RiBillLine, RiNotification2Line, RiCouponLine, RiCoupon3Line } from 'react-icons/ri'
import { ImBlog, ImBlogger } from 'react-icons/im'
import {
  BiCategory,
  BiColorFill
} from 'react-icons/bi'
import { Button, Layout, Menu, theme } from 'antd';
import {Link} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const navigate = useNavigate()
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            {/* <img src='./cbensis.jpg' alt='logo' className='img-fluid' /> */}
          <h2 className='fs-5 text-center py-4 mb-0'>
            <span className='lg-logo'>NQD Store</span>
            <span className='sm-logo'>NQD</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick ={({key}) => {
            if(key === 'signout'){

            }else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customer',
            },
            {
              key: 'catalog',
              icon: <AiOutlineUnorderedList className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <SiProducthunt className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <SiProducthunt className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Add Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <BiColorFill className='fs-4' />,
                  label: 'Add Color',
                },
                {
                  key: 'color-list',
                  icon: <BiColorFill className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <RiBillLine className='fs-4' />,
              label: 'Order',
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <RiCoupon3Line className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon3Line className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: 'blogs',
              icon: <SiBlogger className='fs-4' />,
              label: 'Blog',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <ImBlogger className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <ImBlogger className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <AiOutlineFileSearch className='fs-4' />,
              label: 'Enquiry',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold className='fs-4' /> : <AiOutlineMenuFold className='fs-4' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className='position-relative'>
              <RiNotification2Line className='fs-4'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img width={32} height={32} src='avatar.jpg' alt='' />
              </div>
              <div 
                role='button'
                id='dropdownMenuLink'
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <h5 className='mb-0'>Đông Ngô 69</h5>
                <p className='mb-0'>69conheocon@gmail.com</p>
              </div>
              <div className='dropdown-menu p-0' aria-labelledby='dropdownMenuLink'>
                <li><Link className="dropdown-item py-1 mb-1" to="/">Thông tin người dùng</Link></li>
                <li><Link className="dropdown-item py-1 mb-1" to="/">Đăng xuất</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout