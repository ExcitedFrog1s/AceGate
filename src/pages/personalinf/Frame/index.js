import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button, } from 'antd';
import {ReadOutlined, HeartOutlined} from '@ant-design/icons';
import { UserOutlined, FormOutlined, MailOutlined, SolutionOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import Left from "../Left";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;



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
    const optionValue2 = ['中国式现代化', '文献综述', '人工智能',
    '共同富裕', '数字化转型', '作业设计', '课程思政', '粮食安全', '自然辩证法',
    '经济研究', '文化自信', '人类命运共同体', '劳动教育', '管理世界', '绿色金融',
    '盈利能力分析', '工程伦理']
    optionValue2.map((value, index)=>{
        optionValue2[index] = `${value}\u00A0\u00A0\u00A0` ;
    })
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
                                src="https://img1.baidu.com/it/u=3345281312,1299187552&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"
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
                                    }}
                                >{data.Uname}</Title>
                                <Paragraph>
                                    <Space>
                                        <MailOutlined />
                                    </Space>
                                    <Text> {data?.Uemail}</Text>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <ReadOutlined />
                                    </Space>
                                    <Text> {optionValue2}</Text>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <HeartOutlined />
                                    </Space>
                                    <Text> {optionValue2}</Text>
                                </Paragraph>
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