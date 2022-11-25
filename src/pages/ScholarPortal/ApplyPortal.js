import "antd/dist/antd.min.css";
import Info from './info';
import { Typography, Layout, Menu, Button, Divider, Steps, message, Input, Col, Row} from 'antd';
import { FormOutlined, CheckCircleOutlined, IdcardOutlined, CheckCircleFilled} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Header, Content, Footer} = Layout;
const { Title, Paragraph, Text, Link } = Typography;

const onChange = (key) => {
    console.log(key);
};
const onFinish = (values) => {
    console.log(values);
};
const steps = [
    {
        title: '个人信息',
        status: 'finish',
        icon: <FormOutlined />,
        content: (
            <div>
                <Info/>
            </div>
        ),
    },
    {
        title: '选择门户',
        status: 'finish',
        icon: <IdcardOutlined />,
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
        icon: <CheckCircleOutlined />,
        content: (
            <div>
                <Row>
                        <CheckCircleFilled
                            style={{
                                fontSize: '100px',
                                color: '#8fbd72',
                            }}
                        />

                </Row>
            </div>
        ),
    },
];
function Portal() {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
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
                    padding: '50px 200px 0 200px',
                    backgroundColor: 'rgb(240,242,245)',
                }}
            >
                <div
                    style={{
                        padding: '24px',
                        Height: '150px',
                        backgroundColor: 'white',
                    }}
                >
                    <Steps
                        current={current}
                        items={items}
                        style={{
                            padding: '24px',
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
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current === 1 && (
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => prev()}
                            >
                                返回修改
                            </Button>

                        )}
                        {current === 1 && (
                            <Button type="primary" onClick={() => next()}>
                                确定
                            </Button>
                        )}
                        {current ===2 && (
                            <Button type="primary" onClick={() => message.success('即将返回首页!')}>
                                返回
                            </Button>
                        )}
                    </div>
                </div>
            </Content>

            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default Portal;