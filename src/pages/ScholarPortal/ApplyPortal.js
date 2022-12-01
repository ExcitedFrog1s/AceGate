import "antd/dist/antd.min.css";
import Info from './info';
import { Typography, Layout, Menu, Button, Divider, Steps, message, Input, Col, Row} from 'antd';
import { FormOutlined, CheckCircleOutlined, IdcardOutlined, CheckCircleFilled} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
const { Header, Content, Footer} = Layout;
const { Title, Paragraph, Text} = Typography;

const onChange = (key) => {
    console.log(key);
};
const onFinish = (values) => {
    console.log(values);
};

function Portal() {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            title: '个人信息',
            status: 'finish',
            icon: <FormOutlined
                    style={{
                        color: current>=0 ? '#3a3af1' : undefined }}
                />,
            content: (
                <div>
                    <Info/>
                </div>
            ),
        },
        {
            title: '选择门户',
            status: 'finish',
            icon: <IdcardOutlined
                style={{
                    color: current>0 ? '#3a3af1' : undefined }}
            />,
            content: (
                <div>
                    <Text
                        style={{
                            fontSize: '20px',
                        }}
                    >
                        已根据您的姓名检索出以下门户，请选择：
                    </Text>

                </div>
            ),
        },
        {
            title: '完成',
            status: 'wait',
            icon: <CheckCircleOutlined
                    style={{
                        color: current>1 ? '#3a3af1' : undefined }}
                />,
            content: (
                <div>
                    <Row>
                        <CheckCircleFilled
                            style={{
                                fontSize: '100px',
                                color: '#50af78',
                                margin: "auto",
                            }}
                        />
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: '18px',
                                margin: "auto",
                                padding: '20px',
                            }}
                        >
                            欢迎入驻
                        </Text>
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: '16px',
                                margin: "auto",
                            }}
                        >
                            您的申请将于3天内由管理员审核，请耐心等待。
                        </Text>
                    </Row>
                </div>
            ),
        },
    ];
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
        content: item.content,
    }));
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
                    <Steps
                        current={current}
                        items={items}
                        style={{
                            padding: '24px',
                            color: '#3a3af1',
                        }}
                    />
                    <Divider dashed/>
                    <div
                        className="steps-content"
                        style={{
                            padding: '24px',
                        }}
                    >
                        {steps[current].content}
                    </div>
                    <div className="steps-action">
                        {current === 0 && (
                            <Row>
                                <Button
                                    type="primary"
                                    onClick={() => next()}
                                    shape={"round"}
                                    size="large"
                                    style={{
                                        margin: 'auto',
                                        backgroundColor: '#3a3af1',
                                        border: 'none',
                                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                                    }}
                                >
                                    下一步
                                </Button>
                            </Row>

                        )}
                        {current === 1 && (
                            <Row>
                                <Col span={16}></Col>
                                <Col span={8}>
                                    <Button
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            margin: '0 10px',
                                            color: '#3a3af1',
                                        }}
                                        onClick={() => prev()}
                                    >
                                        返回修改
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => next()}
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            backgroundColor: '#3a3af1',
                                            border: 'none',
                                        }}
                                    >
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        {current ===2 && (
                            <Row>
                                <Link
                                    to={{
                                        pathname: '/',
                                    }}
                                    style={{
                                        margin: 'auto',
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => message.success('即将返回首页!')}
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            backgroundColor: '#3a3af1',
                                            border: 'none',
                                        }}
                                    >
                                        返回
                                    </Button>
                                </Link>
                            </Row>
                        )}
                    </div>
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
export default Portal;