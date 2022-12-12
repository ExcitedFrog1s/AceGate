import "antd/dist/antd.min.css";
import './portal.css';
import default_avatar from '../../assets/default_avatar.png';
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
import {FaQuoteLeft} from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

const handleLink = (url)=>{
    window.open(url)
}

function ScholarPaperList(props) {
    const [RpaperList, setRpaperList] = useState({});

    useEffect(() =>{
        setRpaperList(props.RpaperList)
        // getData()
    }, [props])
    // console.log(props)
    // console.log(RpaperList)
    // console.log(RpaperList[1].pname)
    function authors(list) {
        var str = "";
        for (let i = 0; i < (list.length-1); i++) {
            str += list[i] + ', '
        }
        str += list[list.length-1]
        // console.log(str)
        return str;
    }

    const columns = [
        {
            title: '',
            dataIndex: 'pname',
            key: 'pname',
            width: '74%',
            sorter: (a, b) => a.pname.localeCompare(b.pname),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <div>
                    <Typography>
                        <Row>
                            <Link
                                onClick={() => handleLink(record.dOI)}
                                style={{
                                    fontSize: '16px',
                                }}
                            >{record.pname}</Link>
                        </Row>
                        <Row>
                            <Text
                                style={{
                                    fontSize: '12px',
                                }}
                            >{authors(record.pauthorname)}</Text>
                        </Row>
                    </Typography>
                </div>
            ),
        },
        {
            title: '发表时间',
            dataIndex: 'pdate',
            key: 'pdate',
            width: '13%',
            sorter: (a, b) => {
                let aDate = new Date(a.pdate).getTime();
                let bDate = new Date(b.pdate).getTime();
                console.log("a",a);
                return aDate - bDate;
            },
            render: (_, record) => (
                <Text>{new Date(record.pdate).getFullYear()+'-'+ new Date(record.pdate).getMonth()+'-'+new Date(record.pdate).getDay()}</Text>
            ),
        },
        {
            title: '引用次数',
            dataIndex: 'pcite',
            key: 'pcite',
            width: '13%',
            sorter: {
                compare: (a, b) => a.pcite - b.pcite,
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
                <Table
                    columns={columns}
                    dataSource={props.RpaperList}
                    pagination={false}
                    rowKey="pid"
                />
            </div>
        </div>
    );
}

function DataChart(props) {
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
                {props.icon}

                <Heading className='chart-head'>{props.title}</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'0px'}}/>
        </Box>
    )
}

function ScholarDataList(props) {
    const [workscount, setWorkscount] = useState();
    const [citescount, setCitescount] = useState();
    const [worksyear, setWorksyear] = useState([]);
    const [citesyear, setCitesyear] = useState([]);

    useEffect(() =>{
        setWorkscount(props.workscount);
        setCitescount(props.citescount);
        setWorksyear(props.worksyear);
        setCitesyear(props.citesyear);
    }, [props])
    console.log(workscount)
    console.log(citescount)
    console.log(worksyear)
    console.log(citesyear)
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
                <Row>
                    <Col span={12}>
                        <DataChart
                            count={worksyear}
                            title="近五年论文数量"
                            icon={<IoNewspaperSharp className='chart-icon' />}
                        ></DataChart>
                    </Col>
                    <Col span={12}>
                        <Typography
                            style={{
                                padding: '300px 0 0 16px',
                            }}
                        >
                            <Text
                                className={'dark-text'}
                                style={{
                                    margin: '200px 0 0 30px',
                                    fontSize: '36px',
                                    fontWeight: 'bold',
                                    letterSpacing: '3px',
                                }}
                            >
                                发表总论文数为
                            </Text>
                            <Text
                                style={{
                                    margin: '200px 0 0 20px',
                                    color: '#728fea',
                                    fontSize: '36px',
                                    fontWeight: 'bold',
                                    letterSpacing: '3px',
                                }}
                            >
                                {workscount}
                            </Text>
                        </Typography>
                    </Col>
                </Row>
                <Row
                    style={{
                        marginBottom: '30px',
                    }}
                >
                    <Col span={12}>
                        <Typography
                            style={{
                                padding: '300px 0 0 0px',
                            }}
                        >
                            <Text
                                className={'dark-text'}
                                style={{
                                    margin: '200px 0 0 10px',
                                    fontSize: '36px',
                                    fontWeight: 'bold',
                                    letterSpacing: '3px',
                                }}
                            >
                                总被引用量为
                            </Text>
                            <Text
                                style={{
                                    margin: '200px 0 0 20px',
                                    color: '#728fea',
                                    fontSize: '36px',
                                    fontWeight: 'bold',
                                    letterSpacing: '3px',
                                }}
                            >
                                {citescount}
                            </Text>
                        </Typography>
                    </Col>
                    <Col span={12}>
                        <DataChart
                            count={citesyear}
                            title="近五年被引数量"
                            icon={<FaQuoteLeft className='chart-icon' />}
                        ></DataChart>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

function Portal() {
    const [data, setData] = useState({});

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    var RID;
    if(params.has('RID')){
        RID = params.get('RID')
    }
    console.log('RID:' + RID)

    const getData = ()=>{
        axios({
            method: "post",
            url: "/scholarPortal",
            data: {
                RID: RID,
            },
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            setData(res.data.data)
            console.log(res.data.data)
        })
    }
    useEffect(() => {
        getData();
    }, [])

    const institute_name = (institute) => {
        var name = institute.split('|')[0]
        return name
    }

    const reformCoauthor = (coauthors) => {
        for (var i = 0; i < coauthors.length; i++) {
            coauthors[i].institute = institute_name(coauthors[i].institute);
        }
        return coauthors
    }

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
                                src={default_avatar}
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
                                >
                                    {data.rname}
                                </Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined />
                                    </Space>
                                    <Link
                                        component={Typography.Link}
                                        style={homepageStyle}
                                        onMouseEnter={handleMouseEnterHomepage}
                                        onMouseLeave={handleMouseLeaveHomepage}
                                        to={"/institute?IID="+data.r_IID}
                                    > {data.rinstitute} </Link>
                                    {data.rpersonalPage != "none" &&
                                        <Space>
                                            <Text>-</Text>
                                            <Link
                                            component={Typography.Link}
                                            style={homepageStyle}
                                            onMouseEnter={handleMouseEnterHomepage}
                                            onMouseLeave={handleMouseLeaveHomepage}
                                            onClick={handleLink(data.rpersonalPage)}
                                            >
                                                个人主页
                                            </Link>
                                        </Space>
                                    }
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <BulbOutlined />
                                    </Space>
                                    <Text> {data.Cname}</Text>
                                </Paragraph>
                                {data.rcontact != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <MailOutlined />
                                        </Space>
                                        <Text> {data.rcontact}</Text>
                                    </Paragraph>
                                }
                                {data.rgateinfo != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <SolutionOutlined/>
                                        </Space>
                                        <Text> {data.rgateinfo}</Text>
                                    </Paragraph>
                                }
                            </Typography>
                        </Col>
                        <Col span={4}>
                            {data.flag === true &&
                                <Link
                                    to={{
                                        pathname: '/editPortal/',
                                        search: '?RID=' + RID,
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
                                    children: <ScholarPaperList RpaperList={data.RpaperList}/>,
                                },
                                {
                                    label: `数据分析`,
                                    key: '2',
                                    children: <ScholarDataList
                                                workscount={data.rworkscount}
                                                worksyear={data.rworksyear}
                                                citescount={data.rcitescount}
                                                citesyear={data.rcitesyear}
                                            />,
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
                                   className={'dark-text'}
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
                                {data.RcoauthorList &&
                                    <List
                                        dataSource={reformCoauthor(data.RcoauthorList)}
                                        renderItem={(item) => (
                                            <List.Item
                                                key={item.name}
                                                style={{
                                                    padding: '10px 0 10px 0',
                                                }}
                                            >
                                                <List.Item.Meta
                                                    title={item.name}
                                                    description={item.institute}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                }

                            </div>
                        </Typography>
                    </div>
                </Sider>
            </Layout>
        </Layout>
    );
}
export default Portal;