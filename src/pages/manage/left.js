/*
 * 后代管理页面左侧导航栏
 */
import { BarsOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom'
import React from "react";
import { Layout } from "antd";
import './left.css'

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon){
    return {
        label,
        key: "/manage/" + key,
        icon: icon
    }
}

const items = [
    getItem("平台概况", "info", <InfoCircleOutlined />),
    getItem("入驻学者", "scholars", <TeamOutlined />),
    getItem("审核认领", "check", <BarsOutlined />),
]


function LeftMenu(){
    const navigate = useNavigate();
    const onClick = (e) =>{
        console.log(e);
        navigate(e.key);
        console.log(1);
    }
    return(
            <Menu style={{width: 200}}
            defaultSelectedKeys={[1]}
            theme="light"
            items={items}
            mode="vertical"
            onClick={onClick}
            ></Menu>
    )

}

function Manage(){
    return (
        <Layout>
            <Header></Header>
            <Layout>
                <Sider style={{width:200, height:700}}
                theme="light">
                    <div className='left'><LeftMenu/></div>
                </Sider>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default Manage;

