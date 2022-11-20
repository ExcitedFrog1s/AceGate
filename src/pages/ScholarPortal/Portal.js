import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button, Divider, Tabs, List, Skeleton} from 'antd';
import { UserOutlined, HomeOutlined, BulbOutlined, FormOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text, Link } = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

function Portal() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

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
                    <Row>
                        <Col span={5}>
                            <Avatar size={130} icon={<UserOutlined />} />
                        </Col>
                        <Col span={15}>
                            <Typography>
                                <Title>Name</Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined />
                                    </Space>
                                    <Text> Beihang University - </Text>
                                    <Link>个人主页</Link>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <BulbOutlined />
                                    </Space>
                                    <Link> Computer Vision</Link>
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={4}>
                            <Button
                                type="primary"
                                icon={<FormOutlined />}
                                size="large"
                                shape={"round"}
                                style={{
                                    float: 'right',
                                    margin: '25px 40px 16px 24px',
                                    backgroundColor: '#859dda',
                                    border: 'none',
                                }}
                            >
                                编辑
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Layout>
                <Content
                    style={{
                        padding: '50px 50px 0 200px',
                        width: '50%',
                        backgroundColor: 'rgb(240,242,245)',
                    }}
                >
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: 'white',
                            height: '450px',
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            items={[
                                {
                                    label: `发表文献`,
                                    key: '1',
                                    children: `Content of Tab Pane 1`,
                                },
                                {
                                    label: `数据分析`,
                                    key: '2',
                                    children: `Content of Tab Pane 2`,
                                },
                            ]}
                        />
                    </div>
                </Content>
                <Sider width={450}
                    style={{
                        padding: '50px 200px 0 0',
                        backgroundColor: 'rgb(240,242,245)',
                    }}
                >
                    <div
                        style={{
                            padding: '0',
                            backgroundColor: 'white',
                            height: '450px',
                        }}
                    >
                        <Typography>
                            <Title level={4}
                                style={{
                                    padding: '24px 24px 16px 24px',
                                }}
                            >
                                合著作者
                            </Title>
                            <div
                                id="scrollableDiv"
                                style={{
                                    height: 350,
                                    overflow: 'auto',
                                    padding: '0 16px 0 0',
                                    border: 'none',
                                }}
                            >
                            <InfiniteScroll
                                dataLength={data.length}
                                next={loadMoreData}
                                hasMore={data.length < 50}
                                loader={
                                    <Skeleton
                                        avatar
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        active
                                    />
                                }
                                endMessage={<Divider plain></Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={data}
                                    renderItem={(item) => (
                                        <List.Item
                                            key={item.email}
                                            style={{
                                                padding: '10px 0 10px 0',
                                            }}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.picture.large} />}
                                                title={<a href="https://ant.design">{item.name.last}</a>}
                                                description={item.email}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                    </div>
                        </Typography>
                    </div>

                </Sider>
            </Layout>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
}
export default Portal;