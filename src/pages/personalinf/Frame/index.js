import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button,Image } from 'antd';
import {ReadOutlined, HeartOutlined} from '@ant-design/icons';
import { UserOutlined, FormOutlined, MailOutlined, SolutionOutlined} from '@ant-design/icons';
import React, { useEffect,  } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import Left from "../Left";
import default_avatar from "../../../assets/default_avatar.png";
import MyHeader from '../../../components/header/header'

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
        <Layout className="layout"
                style={{
                    minHeight: '100vh',
                }}
        >
            <MyHeader/>
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
                        borderRadius: '20px',
                    }}
                >
                    <Row>
                        <Col span={6}>
                            <Left/>
                        </Col>
                        <Col span={4}>
                            <Avatar
                                size={130}
                                icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
                                    marginTop: '50px',
                                }}
                                src={
                                    default_avatar
                                }

                            />
                        </Col>
                        <Col span={10}>
                            <Typography
                                style={{
                                    padding: '0 0 0 30px',
                                }}
                            >
                                <Title
                                    style={{
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                        margin: '30px 0 30px 0',
                                        fontSize: '50px',
                                    }}
                                >{name}</Title>
                                <Paragraph
                                    style={{
                                        fontSize: '24px',
                                        padding: '20px 0 10px 0',
                                    }}
                                >
                                    <Space>
                                        <MailOutlined />
                                    </Space>
                                    <Text> {data.uemail}</Text>
                                </Paragraph>
                                <Paragraph
                                    style={{
                                        fontSize: '24px',
                                        padding: '20px 0 10px 0',
                                    }}
                                >
                                    <Space>
                                        <ReadOutlined />
                                    </Space>
                                    <Text> {data.ufield}</Text>
                                </Paragraph>
                                <Paragraph
                                    style={{
                                        fontSize: '24px',
                                        padding: '20px 0 10px 0',
                                    }}
                                >
                                    <Space>
                                        <HeartOutlined />
                                    </Space>
                                    <Text> {data.uinterest}</Text>
                                </Paragraph>
                            </Typography>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}
export default PersonInfo;