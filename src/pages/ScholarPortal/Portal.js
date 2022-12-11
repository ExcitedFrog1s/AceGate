import "antd/dist/antd.min.css";
import './portal.css';
import Chart from 'react-apexcharts'
import { Typography, Layout, Menu, Avatar, Col, Row, Space, Button, Divider, Tabs, List, Skeleton, Table, Spin} from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    BulbOutlined,
    FormOutlined,
    MailOutlined,
    SolutionOutlined,
    BarChartOutlined
} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import {Box, Heading} from "@chakra-ui/react";


const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

function ScholarPaperList({props}) {
    const columns = [
        {
            title: '',
            dataIndex: 'Pname',
            key: 'Pname',
            width: '65%',
            render: (_, record) => (
                <div>
                    <Typography>
                        <Row>
                            <Link
                                style={{
                                    fontSize: '20px',
                                }}
                            >{record.Pname}</Link>
                        </Row>
                        <Row>
                            <Text>{record.Pauthor}</Text>
                        </Row>
                    </Typography>
                </div>
            ),
        },
        {
            title: '发表时间',
            dataIndex: 'Pdate',
            key: 'Pdate',
            sorter: (a, b) => {
                let aDate = new Date(a.Pdate).getTime();
                let bDate = new Date(b.Pdate).getTime();
                console.log("a",a);
                return aDate - bDate;
            },
        },
        {
            title: '引用次数',
            dataIndex: 'Pcite',
            key: 'Pcite',
            sorter: {
                compare: (a, b) => a.Pcite - b.Pcite,
                multiple: 1,
            },
        },
    ];

    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <div
                id="scrollablePaperList"
                style={{
                    height: 450,
                    overflow: 'auto',
                    padding: '0 16px 0 0',
                    border: 'none',
                }}
            >
                {/*<InfiniteScroll*/}
                {/*    // dataLength={props.length}*/}
                {/*    endMessage={<Divider plain></Divider>}*/}
                {/*    scrollableTarget="scrollablePaperList"*/}
                {/*>*/}
                    <Table
                        columns={columns}
                        dataSource={props}
                        pagination={false}
                    />
                {/*</InfiniteScroll>*/}
            </div>
        </div>
    );
}

function PaperAmount(props) {
    React.useEffect(() => {
        setSeries([{data:props.count}])
    },[props])
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2018,2019,2020,2021,2022]
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    borderRadius: 6
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    gradientToColors: ['#1b3bbb'],
                    opacityFrom: 0.96,
                    opacityTo: 0.2,
                    stops:[0,100]
                }
            },
        }
    )
    const [series, setSeries] = React.useState(
        [{
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
             borderRadius='25px' border='2px' borderColor='gray.200'
             className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>论文数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar"
                   style={{
                       marginTop:'0px',
                   }}
            />
        </Box>
    )
}

function CitationAmount(props) {
    React.useEffect(() => {
        setSeries([{data:props.count}])
    },[props])
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2017,2018,2019,2020,2021]
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    borderRadius: 6
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    gradientToColors: ['#1b3bbb'],
                    opacityFrom: 0.96,
                    opacityTo: 0.2,
                    stops:[0,100]
                }
            },
        }
    )
    const [series, setSeries] = React.useState(
        [{
            data: props.count
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
             borderRadius='25px' border='2px' borderColor='gray.200'
             className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>被引数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'0px'}}/>
        </Box>
    )
}

function ScholarDataList({props}) {
    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <div
                id="scrollableDataList"
                style={{
                    height: 450,
                    overflow: 'auto',
                    padding: '0 16px 0 0',
                    border: 'none',
                }}
            >
                <div
                    style={{
                        width: '60%',
                        margin: 'auto',
                    }}
                >
                    <PaperAmount count={props.Vworksyear}></PaperAmount>
                </div>
                <div
                    style={{
                        width: '60%',
                        margin: 'auto',
                    }}
                >
                    <CitationAmount count={props.Vcitesyear}></CitationAmount>
                </div>
            </div>
        </div>
    )
}
function Portal() {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')
    const [data, setData] = useState([]);

    const getData = ()=>{
        axios({
            method: "post",
            url: "https://mock.apifox.cn/m1/1955876-0-default/scholarPortal",
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

    return (
        <Layout className="portal">
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
                                // icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)'
                                }}
                                src={data?.Ravatar}
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
                                >{data.Rname}</Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined />
                                    </Space>
                                    <Text> {data.Rinstitute} </Text>
                                    {data.RpersonalPage &&
                                        <Space>
                                            <Text>-</Text>
                                            <Link
                                            to="/scholarPortal"
                                            component={Typography.Link}
                                            style={homepageStyle}
                                            onMouseEnter={handleMouseEnterHomepage}
                                            onMouseLeave={handleMouseLeaveHomepage}
                                            >{data.RpersonalPage}</Link>
                                        </Space>
                                    }
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
                                    > {data?.Rconcepts}</Link>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <MailOutlined />
                                    </Space>
                                    <Text> {data?.Rcontact}</Text>
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <SolutionOutlined />
                                    </Space>
                                    <Text> {data?.Rgateinfo}</Text>
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={4}>
                            {data.Rapplied === true &&
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
                            }
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
                                    children: <ScholarPaperList props={data.RpaperList}/>,
                                },
                                {
                                    label: `数据分析`,
                                    key: '2',
                                    children: <ScholarDataList props={data}/>,
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
                                {/*<InfiniteScroll*/}
                                {/*    dataLength={data.RcoauthorList.length}*/}
                                {/*    loader={*/}
                                {/*        <Skeleton*/}
                                {/*            avatar*/}
                                {/*            paragraph={{*/}
                                {/*                rows: 1,*/}
                                {/*            }}*/}
                                {/*            active*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    endMessage={<Divider plain></Divider>}*/}
                                {/*    scrollableTarget="scrollableDiv"*/}
                                {/*>*/}
                                    <List
                                        dataSource={data.RcoauthorList}
                                        renderItem={(item) => (
                                            <List.Item
                                                key={item.Rinstitute}
                                                style={{
                                                    padding: '10px 0 10px 0',
                                                }}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.Ravatar.large} />}
                                                    title={<a href="http://localhost:3000/scholarPortal">{item.Rname}</a>}
                                                    description={item.Rinstitute}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                {/*</InfiniteScroll>*/}
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