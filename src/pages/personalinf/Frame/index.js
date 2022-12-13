import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button,Image } from 'antd';
import {ReadOutlined, HeartOutlined} from '@ant-design/icons';
import { UserOutlined, FormOutlined, MailOutlined, SolutionOutlined} from '@ant-design/icons';
import React, { useEffect,  } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import Left from "../Left";
import default_avatar from "../../../assets/default_avatar.png";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;



function PersonInfo() {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("username");
    // let RID = params.get('RID')
    const [data, setData] = React.useState([]);
    const getData = ()=>{
        axios({
            method: "post",
            url: "/personInfo",
            headers: {
                token: token
            }
        }).then(res => {
                    setData(res.data.data)
                    console.log(res.data)
                    localStorage.setItem("interest", res.data.data.uinterest);
                    localStorage.setItem("field", res.data.data.ufield);
                }
            )
    }
    useEffect(() => {
        getData();
        document.addEventListener('myEvent', getData)
    },[])

    // hover style
    // homepage
    const optionValue2 = ['中国式现代化', '文献综述', '人工智能',
    '共同富裕', '数字化转型', '作业设计', '课程思政', '粮食安全', '自然辩证法',
    '经济研究', '文化自信', '人类命运共同体', '劳动教育', '管理世界', '绿色金融',
    '盈利能力分析', '工程伦理']
    const optionTest = optionValue2.join(`\u00A0\u00A0`);
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
                                src={
                                    default_avatar
                                }
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
                                >{name}</Title>
                                <Paragraph
                                    style={{
                                        fontSize: '20px',
                                    }}
                                >
                                    <Space>
                                        <MailOutlined />
                                    </Space>
                                    <Text> {data.uemail}</Text>
                                </Paragraph>
                                <Paragraph
                                    style={{
                                        fontSize: '20px',
                                    }}
                                >
                                    <Space>
                                        <ReadOutlined />
                                    </Space>
                                    <Text> {data.ufield}</Text>
                                </Paragraph>
                                <Paragraph
                                    style={{
                                        fontSize: '20px',
                                    }}
                                >
                                    <Space>
                                        <HeartOutlined />
                                    </Space>
                                    <Text> {data.uinterest}</Text>
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
