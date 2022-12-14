import "antd/dist/antd.min.css";
import './portal.css';
import default_avatar from '../../assets/default_avatar.png';
import papers from '../../assets/portal_papers.png';
import cat from '../../assets/portal_cat.png';
import cite from '../../assets/portal_cite.png';
import coauthor from '../../assets/portal_coauthor.png';
import Chart from 'react-apexcharts'
import {
    Typography,
    Layout,
    Menu,
    Avatar,
    Col,
    Row,
    Space,
    Button,
    Divider,
    Tabs,
    List,
    Skeleton,
    Table,
    Spin,
    Image
} from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    BulbOutlined,
    FormOutlined,
    MailOutlined,
    SolutionOutlined,
    BarChartOutlined, RedoOutlined, BarsOutlined
} from '@ant-design/icons';
import React, { useRef, useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import {Box, Heading, HStack, Input, Link, Progress, Tag, TagLabel, Tooltip} from "@chakra-ui/react";
import {FaQuoteLeft} from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import MyHeader from '../../components/header/header'
import moment from "moment";
// import {useRef} from "@types/react";
import {ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}


// tabs callback
const onChange = (key) => {
    console.log(key);
};


function ScholarPaperList(props) {

    const [RpaperList, setRpaperList] = useState({});
    const [citenum, setCitenum] = useState([]);

    const handlePaper = (url)=>{
        window.open(url)
    }

    useEffect(() =>{
        setRpaperList(props.RpaperList)
        // getData()
    }, [props])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, dataIndex, confirm) => {
        clearFilters();
        handleSearch([], confirm, dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 10,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Row gutter={8}>
                    <Col span={17}>
                        <Input
                            size='sm'
                            focusBorderColor='navy.500'
                            ref={searchInput}
                            placeholder={`请输入关键词`}
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        />
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}}
                        >
                            <SearchIcon />
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
                            size="sm"
                            color='navy.500'
                            style={{marginTop:3}} >
                            <RedoOutlined />
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
                style={{
                    color: filtered ? '#1b3bbb' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });
    const [current, setCurrent]=React.useState(1);


    const htmlDecode = (input) => {
        var e = document.createElement('div');
        e.innerHTML = input;
        console.log(e.childNodes[0]);
        let ret = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        console.log(ret);
        return ret;
    }

    const columns = [
        {
            title: '论文名称',
            dataIndex: 'pname',
            key: 'pname',
            ...getColumnSearchProps('pname'),
            sorter: (a, b) => a.pname.localeCompare(b.pname),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Tooltip label={record.pname} aria-label='A tooltip'>
                    <Link href={"/paperDetails?PID=" + record.pID} isExternal>
                        {record.pname} <ExternalLinkIcon mx='2px' />
                    </Link>
                </Tooltip>
            ),
            ellipsis: true,
            width: 400
        },{
            title: '发表时间',
            dataIndex: 'pdate',
            key: 'pdate',
            sorter: (a, b) => {
                let aDate = new Date(a.pdate).getTime();
                let bDate = new Date(b.pdate).getTime();
                console.log("a",a);
                return aDate - bDate;
            },
            sortDirections: ['descend', 'ascend'],
            width: 150,
            render: (_, record) => (
                <Text>{moment(record.pdate).format("YYYY-MM-DD")}</Text>
            ),
        },{
            title: '引用量',
            dataIndex: 'pcite',
            key: 'pcite',
            sorter: (a, b) => a.pcite - b.pcite,
            sortDirections: ['descend', 'ascend'],
            width: 200,
            render:(_,record) =>(
                <Row>
                    <Text>{record.pcite}</Text>
                    <Progress
                        style={{margin:'auto'}}
                        colorScheme='frog'
                        h='7px'
                        borderRadius='10px'
                        w='110px'
                        value={100 * record.pcite / record.max_cite}/>
                </Row>
            )
        }
    ];
    const options= {
        chart: {
            type: 'area',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors:['#98bcdf'],
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: '引用量',
            align: 'left'
        },
        xaxis: {
            categories: [2018,2019,2020,2021,2022]
        },
    }

    return (
        <div
            style={{
                height: 500,
                overflow: 'auto',
                padding: '0',
                border: 'none',
            }}
        >
            <Box css={{
                height: 450,
                overflow: 'auto',
                padding: '0 10px 0 0',
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cccccc',
                    borderRadius: '24px',
                },
            }}>
            <Table dataSource={props.RpaperList} columns={columns}
                   pagination={false}
                   className='paperList'
                   rowKey={(record) => record.pID}
                   expandable={{
                       expandedRowRender: (record) => (
                           <Row >
                               <Col span={15} offset={1}>
                                   <Heading as='h4' size='md' mb={'10px'}>
                                       <div dangerouslySetInnerHTML={{ __html: record.pname }} />
                                   </Heading>
                                   <Row className='expand'>
                                       {
                                           record.pauthorname.map((value, key) => {
                                               return (
                                                   <Text fontSize='sm' mr='25px' mt='5px' color='#98bcdf'>{value}, </Text>
                                               );})
                                       }
                                   </Row>
                                   <div style={{marginTop: '10px'}} dangerouslySetInnerHTML={{ __html: record.pabstract }} />
                                   <Row>
                                       {
                                           record.pconcepts.map((value, key) => (
                                               key<8? (
                                                   <Tag size='sm' mt='3px' variant='subtle' bg='#627cd177' color='white' mr='20px'>
                                                       <TagLabel>{value}</TagLabel>
                                                   </Tag>
                                               ):(<p></p>)
                                           ))
                                       }
                                   </Row>
                               </Col>
                               <Col span={7} style={{marginLeft:'20px'}}>
                                   <Chart options={options}
                                          series={[{data:record.pcitednum.reverse(), name:'引用量'}]}
                                          type="area" height={250} />
                               </Col>
                           </Row>
                       ),
                   }}>
            </Table>
        </Box>
        </div>
    );
}

function DataChart(props) {
    React.useEffect(() => {
        setSeries([{data:props.count,name:'数量'}])
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
                    gradientToColors: ['#3a3af1'],
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
            css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#cccccc',
                  borderRadius: '24px',
                },
              }}
        >
            <Box
                id="scrollableDataList"
                style={{
                    height: 450,
                    overflow: 'auto',
                    padding: '0 25px',
                    border: 'none',
                }}
                css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#cccccc',
                      borderRadius: '24px',
                    },
                  }}
            >
                <Row>
                    <Col span={12}>
                        <DataChart
                            count={worksyear}
                            title={<Text className={'dark-text'} style={{color :'#4A5568'}}>近五年论文数量</Text>}
                            icon={<IoNewspaperSharp className='chart-icon' />}
                        ></DataChart>
                    </Col>
                    <Col span={12}>
                        <Image
                            src={papers}
                            preview={false}
                            style={{
                                width: '80%',
                                margin: 'auto',
                                marginTop: '50px',
                            }}></Image>
                        {citescount &&
                            <Typography
                                style={{
                                    padding: '0px 0 0 50px',
                                }}
                            >
                                <Text
                                    className={'dark-text'}
                                    style={{
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                        color: '#4A5568',
                                    }}
                                >
                                    发表总论文数为
                                </Text>
                                <Text
                                    style={{
                                        margin: '0 0 0 20px',
                                        color: '#3a3af1',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                    }}
                                >
                                    {separator(workscount)}
                                </Text>
                            </Typography>
                        }
                    </Col>
                </Row>
                <Row
                    style={{
                        marginBottom: '30px',
                    }}
                >
                    <Col span={12}>
                        <Image
                            src={cite}
                            preview={false}
                            style={{
                                width: '80%',
                                margin: 'auto',
                                marginTop: '50px',
                            }}></Image>
                        {citescount &&
                            <Typography
                                style={{
                                    padding: '0px 0 0 0px',
                                }}
                            >
                                <Text
                                    className={'dark-text'}
                                    style={{
                                        margin: '200px 0 0 10px',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                        color: '#4A5568',
                                    }}
                                >
                                    总被引用量为
                                </Text>
                                <Text
                                    style={{
                                        margin: '200px 0 0 20px',
                                        color: '#3a3af1',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        letterSpacing: '3px',
                                    }}
                                >
                                    {separator(citescount)}
                                </Text>
                            </Typography>
                        }
                    </Col>
                    <Col span={12}>
                        <DataChart
                            count={citesyear}
                            title={<Text className={'dark-text'} style={{color :'#4A5568'}}>近五年被引数量</Text>}
                            icon={<FaQuoteLeft className='chart-icon' />}
                        ></DataChart>
                    </Col>
                </Row>

            </Box>
        </div>
    )
}

function Portal() {
    const [data, setData] = useState({});
    let location = useLocation()
    const navigate = useNavigate();
    let params = new URLSearchParams(location.search)
    var RID;
    if(params.has('RID')){
        RID = params.get('RID')
    }else {
        RID = ''
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
                token: localStorage.getItem("userToken")
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
        textDecoration: homepageIsHover ? 'underline' : 'none'
    }

    // institute
    const [instituteIsHover, setInstituteIsHover] = useState(false)
    const handleMouseEnterInstitute = () => {
        setInstituteIsHover(true)
    }
    const handleMouseLeaveInstitute = () => {
        setInstituteIsHover(false);
    }
    const instituteStyle = {
        textDecoration: instituteIsHover ? 'underline' : 'none'
    }

    return (
        <Layout className="portal">
            <MyHeader></MyHeader>
            <Content
                style={{
                    padding: '50px 100px 20px 100px',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                <div
                    style={{
                        padding: '24px',
                        Height: '150px',
                        background: 'linear-gradient(360deg,rgba(255,255,255,1.0), rgba(255,255,255,0.0))',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '20px',
                    }}
                >
                    <Row>
                        <Col span={5}>
                            <Avatar
                                size={130}
                                // icon={<UserOutlined />}
                                style={{
                                    boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
                                    margin: '10px 0 0 30px',
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
                                    className="dark-text"
                                    style={{
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                        color: '#4A5568',
                                    }}
                                >
                                    {data.rname}
                                </Title>
                                <Paragraph>
                                    <Space>
                                        <HomeOutlined style={{color :'#4A5568'}}/>
                                    </Space>
                                    <Link
                                        style={instituteStyle}
                                        onMouseEnter={handleMouseEnterInstitute}
                                        onMouseLeave={handleMouseLeaveInstitute}
                                        href={"/institute?IID=" + data.r_IID} isExternal
                                    > {data.rinstitute} </Link>
                                    {data.rpersonalPage != "none" &&
                                        <Space>
                                            <Text style={{color :'#4A5568'}}>-</Text>
                                            <Link
                                                style={homepageStyle}
                                                onMouseEnter={handleMouseEnterHomepage}
                                                onMouseLeave={handleMouseLeaveHomepage}
                                                href={data.rpersonalPage} isExternal
                                            >
                                                个人主页
                                            </Link>
                                        </Space>
                                    }
                                </Paragraph>
                                <Paragraph>
                                    <Space>
                                        <BulbOutlined style={{color :'#4A5568'}} />
                                    </Space>
                                    <Text style={{color :'#4A5568'}}> {data.rcustomconcepts}</Text>
                                </Paragraph>
                                {data.rcontact != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <MailOutlined style={{color :'#4A5568'}}/>
                                        </Space>
                                        <Text style={{color :'#4A5568'}}> {data.rcontact}</Text>
                                    </Paragraph>
                                }
                                {data.rgateinfo != "none" &&
                                    <Paragraph>
                                        <Space>
                                            <SolutionOutlined style={{color :'#4A5568'}}/>
                                        </Space>
                                        <Text style={{color :'#4A5568'}}> {data.rgateinfo}</Text>
                                    </Paragraph>
                                }
                            </Typography>
                        </Col>
                        <Col span={4}>
                            {data.flag === true &&
                                <div
                                    style={{
                                        width: '130px',
                                    }}
                                >
                                    <Image src={cat} height='80px' preview={false}
                                    ></Image>
                                    <Button
                                        type="primary"
                                        icon={<FormOutlined />}
                                        size="large"
                                        shape={"round"}
                                        style={{
                                            float: 'right',
                                            margin: '-7px 40px 16px 24px',
                                            // backgroundColor: '#859dda',
                                            border: 'none',
                                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
                                            width: '100px',
                                        }}
                                        onClick={() => {
                                            navigate('/editPortal/?RID=' + RID);
                                        }}
                                    >
                                        编辑
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
            </Content>
            <Layout>
                <Content
                    style={{
                        padding: '10px 20px 40px 100px',
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
                            borderRadius: '20px',
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
                        padding: '10px 100px 40px 0',
                        backgroundColor: 'rgb(230,235,247)',
                    }}
                >
                    <div
                        style={{
                            padding: '0',
                            backgroundColor: 'white',
                            height: '550px',
                            boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                            borderRadius: '20px',
                        }}
                    >
                        <Typography>
                            <Row>
                                <Image src={coauthor} preview={false} width='50%'
                                       style={{
                                           padding: '20px 0 0 0',
                                       }}
                                ></Image>
                                <Title level={4}
                                       className={'dark-text'}
                                       style={{
                                           padding: '10px 24px 16px 24px',
                                           color :'#4A5568',
                                           fontSize: '24px',
                                       }}
                                >
                                    合著作者
                                </Title>
                            </Row>
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
                                                    title={<Link href={"/advancedSearch?name=" + item.name} isExternal>{item.name}</Link>}
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
