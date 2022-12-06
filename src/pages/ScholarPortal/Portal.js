import "antd/dist/antd.min.css";
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button, Divider, Tabs, List, Skeleton, Table} from 'antd';
import { UserOutlined, HomeOutlined, BulbOutlined, FormOutlined, MailOutlined, SolutionOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

function ScholarPaperList() {
    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            width: '65%',
            render: (_, record) => (
                <div>
                    <Typography>
                        <Row>
                            <Link
                                style={{
                                    fontSize: '20px',
                                }}
                            >{record.name}</Link>
                        </Row>
                        <Row>
                            <Text>{record.authors}</Text>
                        </Row>
                    </Typography>
                </div>
            ),
        },
        {
            title: '发表时间',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => {
                let aDate = new Date(a.date).getTime();
                let bDate = new Date(b.date).getTime();
                console.log("a",a);
                return aDate - bDate;
            },
        },
        {
            title: '引用次数',
            dataIndex: 'cite',
            key: 'cite',
            sorter: {
                compare: (a, b) => a.cite - b.cite,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'paper1',
            authors: 'author1, author2',
            date: '2020-01-01',
            cite: 10,
        },
        {
            key: '2',
            name: 'paper2',
            authors: 'author1, author2',
            date: '2020-01-02',
            cite: 5,
        },
        {
            key: '3',
            name: 'paper3',
            authors: 'author1, author2',
            date: '2020-01-03',
            cite: 15,
        },
        {
            key: '4',
            name: 'paper4',
            authors: 'author1, author2',
            date: '2020-01-04',
            cite: 0,
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    );
}


function Portal() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // hover style
    // homepage
    const [homepageIsHover, setHomepageIsHover] = useState(false)
    const handleMouseEnterHomepage = () => {
        setHomepageIsHover(true)
    }
    const handleMouseLeaveHomepage = () => {
        setHomepageIsHover(false);
    }
    const homepageStyle = {
        color: '#1890ff',
        textDecoration: homepageIsHover ? 'underline' : 'none'
    }
    // area
    const [areaIsHover, setAreaIsHover] = useState(false)
    const handleMouseEnterArea = () => {
        setAreaIsHover(true)
    }
    const handleMouseLeaveArea = () => {
        setAreaIsHover(false);
    }
    const areaStyle = {
        color: '#1890ff',
        textDecoration: areaIsHover ? 'underline' : 'none'
    }

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
                    <Row>
                        <Col span={5}>
                            <Avatar
                                size={130}
                                icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)'
                                }}
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
                                >Name</Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined />
                                    </Space>
                                    <Text> Beihang University - </Text>
                                    <Link
                                        to="/scholarPortal"
                                        component={Typography.Link}
                                        style={homepageStyle}
                                        onMouseEnter={handleMouseEnterHomepage}
                                        onMouseLeave={handleMouseLeaveHomepage}
                                    >个人主页</Link>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <BulbOutlined />
                                    </Space>
                                    <Link
                                        to="/scholarPortal"
                                        component={Typography.Link}
                                        style={areaStyle}
                                        onMouseEnter={handleMouseEnterArea}
                                        onMouseLeave={handleMouseLeaveArea}
                                    > Computer Vision</Link>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <MailOutlined />
                                    </Space>
                                    <Text> 20231183@buaa.edu.cn</Text>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <SolutionOutlined />
                                    </Space>
                                    <Text> 一段个人简介（如果有的话）</Text>
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={4}>
                            <Link
                                to={{
                                    pathname: '/editPortal',
                                }}
                            >
                                <Button
                                    type="primary"
                                    icon={<FormOutlined />}
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
            <Layout>
                <Content
                    style={{
                        padding: '10px 20px 20px 200px',
                        width: '50%',
                        backgroundColor: 'rgb(230,235,247)',
                    }}
                >
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: 'white',
                            height: '550px',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '10px',
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            items={[
                                {
                                    label: `发表文献`,
                                    key: '1',
                                    children: <ScholarPaperList data={data} loading={loading} loadMoreData={loadMoreData}/>,
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
                        padding: '10px 200px 20px 0',
                        backgroundColor: 'rgb(230,235,247)',
                    }}
                >
                    <div
                        style={{
                            padding: '0',
                            backgroundColor: 'white',
                            height: '550px',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '10px',
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
                                    height: 450,
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
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default Portal;