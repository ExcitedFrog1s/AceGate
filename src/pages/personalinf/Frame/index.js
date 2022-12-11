import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button, Divider, Tabs, List, Skeleton, Table, Spin} from 'antd';
import { UserOutlined, FormOutlined, MailOutlined, SolutionOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import Left from "../Left";

const { Header, Content, Footer, Sider } = Layout;
const { Title,  } = Typography;



function PersonInfo() {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')
    const [data, setData] = useState([]);

    const getData = ()=>{
        axios({
            method: "post",
            url: "https://mock.apifox.cn/m1/1955876-0-default/personInfo",
            data: {
                RID: params.get('RID'),
            }
        })
            .then(res => {
                    console.log(res.data)
                    setData(res.data)
                }
            )
    }
    useEffect(() => {
        getData();
    }, [])

    // hover style
    // homepage
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
                        padding: '24px',
                        Height: '150px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                    }}
                >
                    <Left/>
                    <Row>
                        <Col span={5}>
                            <Avatar
                                size={130}
                                icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
                                }}
                                src={data?.Uavatar}
                            />
                        </Col>
                        <Col span={15}>
                            <Typography
                                style={{
                                    padding: '0 0 0 10px',
                                }}
                            >
                                <Title
                                    style={{
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                        textAlign: "center",
                                        margin: '100 0 0 0px'
                                    }}
                                >{data.Uname}</Title>
                            </Typography>
                        </Col>
                        <Col span={4}>
                        <Link
                                    to={{
                                        pathname: '/personInfo/edit',
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        icon={<FormOutlined/>}
                                        size="large"
                                        shape={"round"}
                                        style={{
                                            float: 'right',
                                            margin: '25px 40px 16px 24px',
                                            // backgroundColor: '#859dda',
                                            border: 'none',
                                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        编辑
                                    </Button>
                                </Link>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default PersonInfo;