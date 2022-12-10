import "antd/dist/antd.min.css";
import {
    Layout,
    Row,
    Button,
    Form, Input,
    Menu,

} from 'antd';
import { CheckCircleOutlined, RollbackOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
const { Header, Content, Footer} = Layout;



// tabs callback


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

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')

    const getData = ()=>{
        axios({
            method: "post",
            url: "https://mock.apifox.cn/m1/1955876-0-default/personInfo/accountedit",
            data: {
                UID: params.get('UID'),
            }
        })
            .then(res => {
                    console.log(res.data)
                    setData(res.data)
                }
            )
    }

    const [form] = Form.useForm();
    const Uemail = Form.useWatch('Uemail', form);
    const password = Form.useWatch('password', form);
    const changeInfo = () =>{
        axios({
          method: 'POST',
          url: 'https://mock.apifox.cn/m1/1955876-0-default/personInfo/edit',
          data:{
            UID: params.get('UID'),
            Uemail : Uemail,
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
        <Layout className="layout">
            <Header>
                <div/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
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
                            name="Uemail"
                            label="电子邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    required: false,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder='如需修改邮箱，请输入新的邮箱'/>
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="oldpassword"
                            required
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || data.Upassword === value) {
                                            console.log(data.Upassword);
                                            return Promise.resolve();
                                        }
                                        console.log(data.Upassword);
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
                                    /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
                                message: "8-16位字符，必须包括字母和数字",
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
                                pathname: '/personInfo/account',
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