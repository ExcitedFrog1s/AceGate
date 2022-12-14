import {IdcardOutlined, TeamOutlined, LockOutlined, FormOutlined} from '@ant-design/icons';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom'
import React from "react";
import { Layout } from "antd";
import '../personalinf.css'

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon){
    return {
        label,
        key: "/personInfo" + key,
        icon: icon
    }
}

const items = [
    getItem(<span className={'menuLabel'}>个人信息</span>, "", <IdcardOutlined style={{fontSize: '20px'}}/>),
    getItem(<span className={'menuLabel'}>修改个人信息</span>, "/edit", <FormOutlined style={{fontSize: '20px'}}/>),
    getItem(<span className={'menuLabel'}>修改密码</span>, "/accountedit", <LockOutlined style={{fontSize: '20px'}}/>),

]


function Left(){
    const navigate = useNavigate();
    const onClick = (e) =>{
        console.log(e);
        navigate(e.key);
        console.log(1);
    }
    return(
        <Menu style={{width: 200, height: '100%'}}
        defaultSelectedKeys={[1]}
        theme="light"
        items={items}
        mode="vertical"
        onClick={onClick}
        ></Menu>
    )

}

export default Left;