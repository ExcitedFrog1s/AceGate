import * as React from 'react'
import { useRef, useState } from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";

import MyHeader from '../../components/header/header';

import {useLocation, useNavigate} from "react-router-dom";

import {ProjectOutlined, BarsOutlined, BarChartOutlined, KeyOutlined, RedoOutlined} from '@ant-design/icons';
import { Col, Row } from 'antd';
import {Table} from 'antd';
import {Divider} from 'antd'

import {HStack, Tag, TagLabel, Image, Tooltip, Spinner} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import {Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import {Heading, Text} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import {Icon, SearchIcon} from '@chakra-ui/icons'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import moment from "moment";
import './journal.css';



function Title(props) {
    const dealNumber = (num) => {
        if (num != 0 && num) {
            num = num + "";
            let decimalsStr = "";
            let splitList = num.split(".");
            //先处理小数部分
            if (splitList[1]) {
                //如果有2位小数则保留2位，只有1位则添0
                decimalsStr = decimalsStr.substring(0, 2).length == 2 ? decimalsStr.substring(0, 2) : decimalsStr.substring(0, 2) + "0";
            }
            //整数部分
            //将整数部分拆解为单个数字的数组倒序，然后拼装为新的数组，每3位数字进行一次匹配
            let intStrList = splitList[0].split("").reverse().join('').match(/(\d{1,3})/g);
            //将匹配后的数组用，拼接，再拆解为单个数字的数组，反转为原先数组形式，拼接为完整数字
            let intStr = intStrList.join(',').split('').reverse().join('');
            return intStr + decimalsStr;
        }
        return num;
    }
    return(
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
            className='title'>
            <Row>
            <ProjectOutlined style={{ marginLeft:'45px', fontSize: '36px', color: '#422afb'}}></ProjectOutlined>
            <Heading as='h3' size='lg' style={{marginLeft:'20px', width:'580px'}}>
                {props.name}
            </Heading>
            </Row>
            <Row>
                {/* <Link href={props.homepage}  isExternal className='link'>
                    前往官网<ExternalLinkIcon mx='2px' />
                </Link> */}
            </Row>
            <Row className='index'>
                <Col span={8}>
                <Image src={require('../../assets/journal.png')} height='160px'/>
                </Col>
                <Col span={8}>
                    <Heading as='h3' fontSize='26px' className='index-data'>{dealNumber(props.work)} </Heading>
                    <Text fontSize='lg' className='index-name'>论文</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' fontSize='26px'  className='index-data'>{dealNumber(props.cite)} </Heading>
                    <Text fontSize='lg' className='index-name'>引用</Text>
                </Col>
            </Row>
        </Box>
    )
}

function Keywords(props) {
    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props} style={{marginTop:'20px',marginLeft:'20px'}}>
          <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          />
        </Icon>
    )
    return(
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='keywords' >
            <Row>
                <KeyOutlined style={{ fontSize: '25px', color: '#422afb'}}></KeyOutlined>
                <Heading  style={{marginLeft:'15px', marginBottom:'10px', fontSize:'20px'}}>领 域</Heading>
            </Row>
            <Box className='concepts' css={{
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
            <Row>
                <Col span={16}>
                    <Text color='#A0AEC0' mb='10px' fontWeight={'600'} fontSize={'15px'}>名 称</Text>
                    <Divider style={{margin:3}}/>
                    {props.Cname.map((item, index) => (
                        <Row  key={index} style={{height:'45px'}} >
                            <Text fontSize='md' className='keywordItem'>{item}</Text>
                        </Row>
                    ))}
                </Col>
                <Col span={7}>
                    <Text color='#A0AEC0' mb='10px' fontWeight={'800'} fontSize={'15px'}>相 关 度</Text>
                    <Divider style={{margin:5}} />
                    {props.Vconceptscores.map((item, index) => (
                        <Row  key={index} style={{height:'45px'}} >
                            <Text style={{margin:'12px 2px'}} fontSize='sm' color='gray.400'>{item}</Text>
                            <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            ml='0'
                            borderRadius='10px'
                            w='80px'
                            value={item}/>

                        </Row>
                    ))}
                </Col>
            </Row>
            </Box>
        </Box>
    )
}

function PaperAmount(props) {
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
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>论文数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}
function CitationAmount(props) {
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
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>被引数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}
function PaperAmountAcc(props) {
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
            data: props.count,
            name:'数量'
        }]
    );
    return(
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>累计论文数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}
function CitationAmountAcc(props) {
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
            data: props.count,
            name:'数量'
        }]
    );
    return(
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>累计被引数量</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}


function InstitutionList(props) {
    React.useEffect(() => {
        var data = props.vid;
        var config = {
            method: 'post',
            url: 'https://mock.apifox.cn/m1/1955876-0-default/venue/institute',
            headers: {
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config).then( res => {
            setData(res.data.institute)
            res.data.institute.forEach((item)=>{
                if(item.Icount>max_work)
                    setMaxWork(item.Icount)
                if(item.Icited>max_cite)
                    setMaxCite(item.Icited)
            });
        });
    },[])
    const [max_work, setMaxWork] = React.useState(0);
    const [max_cite, setMaxCite] = React.useState(0);
    const [data, setData] = React.useState([])

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
    const columns = [
        {
            title: '序号',
            dataIndex: '',
            key: '',
            render: (text,record,index) => (
                <Text>{index+1}</Text>
            ),
            width: 80
        },{
            title: '名称',
            dataIndex: 'Iimage',
            key: 'Iimage',
            render: (_, record) => (
                <Avatar name={record.pname} src={record.Iimage} />
            ),
            width: 100,
        },{
            title: '',
            dataIndex: 'pname',
            key: 'name',
            ...getColumnSearchProps('Pname'),
            sorter: (a, b) => a.Pname.localeCompare(b.Pname),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Link href='/institute' isExternal>
                    {record.Pname} <ExternalLinkIcon mx='2px' />
                </Link>
            ),
            ellipsis: true,
            width: 400
        },{
            title: '国家',
            dataIndex: 'Pauthor',
            key: 'Pauthor',
            ...getColumnSearchProps('Pauthor'),
            sorter: (a, b) => a.Pauthor.localeCompare(b.Pauthor),
            sortDirections: ['descend', 'ascend'],
            width: 180
        },{
            title: '类别',
            dataIndex: 'Itype',
            key: 'Itype',
            width: 180
        },{
            title: '论文数量',
            dataIndex: 'Icount',
            key: 'Icount',
            sorter: (a, b) => a.Icount-b.Icount,
            sortDirections: ['descend', 'ascend'],
            width: 240,
            render:(_,record) =>(
                <Row>
                        <Text>{record.Icount}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='90px'
                            value={record.Icount/max_work*100}/>
                </Row>
            ),
        },{
            title: '引用数量',
            dataIndex: 'Icited',
            key: 'Icited',
            sorter: (a, b) => a.Icited - b.Icited,
            sortDirections: ['descend', 'ascend'],
            width: 240,
            render:(_,record) =>(
                <Row>
                        <Text>{record.Icited}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='90px'
                            value={record.Icited/max_cite*100}/>
                </Row>
            )
        }
    ];
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='list'>
            <Row>
                <BarsOutlined style={{ fontSize: '36px', color: '#422afb', marginTop:'3px'}}></BarsOutlined>
                <Text className='institution-Title'>相关机构</Text>
            </Row>
            <Table dataSource={data} columns={columns} pagination={false} className='institutionList'>
            </Table>
        </Box>
    )
}

function PaperList(props) {
    React.useEffect(() => {
        var config = {
            method: 'post',
            url: '/venue/paper',
            data :{
                VID: props.vid,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(config).then( res => {
            console.log(res.data)
            setData(res.data.data.list)
            var max = 0
            res.data.data.list.forEach((item)=>{
                item.author = item.pauthorname[0]
                item.field = item.pconcepts[0]
                item.pdate = moment(item.pdate).format("YYYY-MM")
                if(item.pcite > max){
                    max = item.pcite
                }
            });
            res.data.data.list.forEach((item)=>{
                item.max_cite = max
            });

        });
    },[])

    const [data, setData] = React.useState([])

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
    const columns = [
        {
            title: '序号',
            dataIndex: '',
            key: '',
            render: (text,record,index) => (
                <Text>{(current- 1) * 10 + index +1}</Text>
            ),
            width: 80
        },{
            title: '名称',
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
            title: '第一作者',
            dataIndex: 'author',
            key: 'author',
            ...getColumnSearchProps('author'),
            sorter: (a, b) => a.author.localeCompare(b.author),
            sortDirections: ['descend', 'ascend'],
            width: 200
        },{
            title: '发表时间',
            dataIndex: 'pdate',
            key: 'pdate',
            sorter: (a, b) => a.pdate.localeCompare(b.pdate),
            sortDirections: ['descend', 'ascend'],
            width: 150
        },{
            title: '领域',
            dataIndex: 'field',
            key: 'field',
            render: (_,record) => (
                <HStack spacing={4}>
                    <Tooltip label={record.field} aria-label='A tooltip'>
                    <Tag size='lg'  variant='subtle' bg='#627cd177' color='white'>
                    <TagLabel>{record.field}</TagLabel>
                    </Tag>
                    </Tooltip>

                </HStack>
            ),
            width: 150
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
    return(
        <Box bg='white'
        boxShadow='4px 4px 15px 0 rgba(0,0,0,0.1)' rounded='md'
        borderRadius='20px' border='2px' borderColor='gray.200'
        className='list'>
            <Row>
                <BarsOutlined style={{ fontSize: '28px', color: '#422afb', marginTop:'3px'}}></BarsOutlined>
                <Text className='institution-Title'>论文</Text>
            </Row>
            {/* <Text mt='20px' ml='20px' color='gray.500' fontSize='md'>共有 {data.length} 篇论文</Text> */}
            <Table dataSource={data} columns={columns}
                    pagination={{
                        onChange: page => setCurrent(page)
                    }}
                    className='institutionList'
                    rowKey={(record) => record.pID}
                    expandable={{
                        expandedRowRender: (record) => (
                            <Row >
                                <Col span={17} offset={1}>
                                    <Heading as='h4' size='md'>{record.pname}</Heading>
                                    <Row className='expand'>
                                    {
                                        record.pauthorname.map((value, key) => {
                                            return (
                                                <Text fontSize='sm' mr='25px' mt='5px' color='#98bcdf'>{value}</Text>
                                            );})
                                    }
                                    </Row>
                                    <Text fontSize='xs' color='gray.400' className='expand' mt='3px'>{record.pabstract}</Text>
                                    <Row>
                                    {
                                        record.pconcepts.map((value, key) => (
                                                key<8 && value[0]!='C'? (
                                                    <Tag size='sm' mt='3px' variant='subtle' bg='#627cd177' color='white' mr='20px'>
                                                    <TagLabel>{value}</TagLabel>
                                                </Tag>
                                                ):(<p></p>)
                                        ))
                                    }
                                    </Row>
                                </Col>
                                <Col span={5} style={{marginLeft:'20px'}}>
                                <Chart options={options}
                                    series={[{data:record.pcitednum, name:'引用量'}]}
                                    type="area" height={250} />
                                </Col>
                            </Row>
                        ),
                    }}>
            </Table>
        </Box>
    )
}

function Journal({}) {
    const [data,setData] = React.useState({
        Vfullname:'',
        Vworkscount:'',
        Vcitecount:'',
        Vhomepage:'',
        cnames:[],
        scores:[],
        Vconceptscores:[],
        VworksCount:[]
    });
    const [isLoading,setIsLoading] = React.useState(true)
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let vid = params.get('VID')
    React.useEffect(() => {
        var config = {
            method: 'post',
            url: '/venue/view',
            data :{
                VID: vid,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config).then(res => {
            var data = res.data.data
            data.cnames=[]
            data.scores=[]
            data.VConcepts.forEach((item,index)=>{
                if(item.cname != ""){
                    data.cnames.push(item.cname);
                    data.scores.push(res.data.data.vconceptscores[index])
                }
            });
            setData(data)
            setIsLoading(false)
        }).catch(err =>{
            console.log(err)
        })

    },[])

    if(isLoading) {
        return (
            <Spinner
                ml={'47%'}
                mt={'25%'}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        )
    }

    return(
        <Box className='journal' bg='rgb(230,235,247)'>
            <Row>
                <MyHeader></MyHeader>
            </Row>

            <Row>
                <Col span={15}>
                    <Title name={data.vfullname} cite={data.vcitecount}
                        work={data.vworksCount} homepage={data.vhomepage}></Title>
                </Col>
                <Col span={7}>
                    <Keywords Cname={data.cnames} Vconceptscores={data.scores}></Keywords>
                </Col>
            </Row>
            <Row>
                <Col span={5} style={{marginLeft:'50px'}} >
                    <PaperAmount count={data.vworksyear}></PaperAmount>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <CitationAmount count={data.vcitesyear}></CitationAmount>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <PaperAmountAcc count={data.vworksAccumulate}></PaperAmountAcc>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <CitationAmountAcc count={data.vcitesAccumulate}></CitationAmountAcc>
                </Col>
            </Row>
            {/* <InstitutionList ></InstitutionList> */}
            <PaperList vid = {vid}></PaperList>
        </Box>
    )
}

export default Journal;
