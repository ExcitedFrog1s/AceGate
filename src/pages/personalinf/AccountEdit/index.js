import "antd/dist/antd.min.css";
import {
    Layout,
    Row,
    Button,
    Form, Input,
    Menu,

} from 'antd';
import MyHeader from '.././../../components/header/header'
import { CheckCircleOutlined, RollbackOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import MyHeader from "../../../components/header/header";



const { Header, Content, Footer} = Layout;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label}为必填项',
    types: {
        email: '请输入有效的${label}!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

function AccountEdit() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem("userToken");

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')

    const getData = ()=>{
        axios({
            method: "post",
            url: "/personInfo/accountedit",
            headers: {
                token: token
            },
        })
            .then(res => {
                    console.log(res.data.data)
                    setData(res.data.data)
                }
            )
    }

    const [form] = Form.useForm();
    const password = Form.useWatch('password', form);
    const changeInfo = () =>{
        axios({
          method: 'POST',
          url: 'personInfo/accountedit2',
          headers: {
            token: token
        },
          data:{
            Upassword : password,
          }
        }).then(response =>{
          console.log(response)
        });
      }

    useEffect(() => {
        getData();
    }, [])


    const onFinish = (values) => {
        console.log(values);
    };

    // save button hover style
    const [saveIsHover, setSaveIsHover] = useState(false)
    const handleMouseEnterSave = () => {
        setSaveIsHover(true)
    }
    const handleMouseLeaveSave = () => {
        setSaveIsHover(false);
    }
    const saveStyle = {
        backgroundColor: saveIsHover ? '#5bc28b' : '#50af78',
        border: 'none',
        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
    }

    return (
<<<<<<< HEAD
        <Layout className="layout">
            <MyHeader></MyHeader>
=======
        <Layout className="layout"
        style={{
            minHeight: '100vh',
        }}
        >
            <MyHeader/>
>>>>>>> 933e57e1b717eaffae292a592aa7338b55a72232
            <Content
                style={{
                    padding: '50px 200px 20px 200px',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                <div
                    style={{
                        padding: '50px 50px 30px 50px',
                        Height: '200px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                    }}
                >
                    
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        style={{
                            padding: '20px 0 0 0',
                        }}
                    >
                    
                        <Form.Item
                            label="密码"
                            name="oldpassword"
                            required
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || data === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('密码错误！');
                                    },
                                }),
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="password"
                            rules={[{
                                pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
                                message: "密码必须为8-16位字符，需包含大小写字母、数字",
                            }]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input.Password placeholder="如需修改密码，则请输入新的密码" />
                        </Form.Item>

                        <Form.Item
                            label="确认密码"
                            name="reNewPassword"
                            dependencies={['password']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('两次输入的新密码不同！');
                                    },
                                }),
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input.Password placeholder="请再次输入新密码" />
                        </Form.Item>
                    </Form>
                    <Row
                        style={{
                            padding: '8px 0 0 0',
                        }}
                    >
                        <Link
                            to={{
                                pathname: '/personInfo',
                            }}
                            style={{
                                margin: "auto",
                            }}
                        >
                            <Button
                                type={"primary"}
                                icon={<CheckCircleOutlined />}
                                size="large"
                                shape={"round"}
                                style={saveStyle}
                                onMouseEnter={handleMouseEnterSave}
                                onMouseLeave={handleMouseLeaveSave}
                                onClick={changeInfo}
                            >
                                保存
                            </Button>
                            <Button className="button2" 
                                icon = {<RollbackOutlined/>}
                                type="primary"
                                size="large"
                                shape={"round"}
                                style={{
                                    margin: '25px 40px 16px 30px',
                                    border: 'none',
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
                                }}
                            >
                                取消
                            </Button>
                        </Link>
                    </Row>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgb(230,235,247)'
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default AccountEdit;