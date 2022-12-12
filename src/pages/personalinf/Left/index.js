import {IdcardOutlined, TeamOutlined, LockOutlined} from '@ant-design/icons';
import { Menu } from "antd";
import { Outlet, useNavigate } from 'react-router-dom'
import React from "react";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon){
    return {
        label,
        key: "/personInfo" + key,
        icon: icon
    }
}

const items = [
    getItem("个人信息", "", <IdcardOutlined />),
    getItem("修改密码", "/accountedit", <LockOutlined />),
]


function Left(){
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

export default Left;