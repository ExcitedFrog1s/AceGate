import * as React from 'react'
import { useRef, useState } from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";

import {ProjectOutlined, BarsOutlined, BarChartOutlined, KeyOutlined, RedoOutlined} from '@ant-design/icons';
import { Col, Row } from 'antd';
import {Table} from 'antd';
import {Divider} from 'antd'

import { Progress } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import {Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import {Heading, Text} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import {Icon, SearchIcon} from '@chakra-ui/icons'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import './journal.css';

//antd组件汉化
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


function Title(props) {
    return(
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='title'>
            <Row>
            <ProjectOutlined style={{ fontSize: '42px', color: '#422afb'}}></ProjectOutlined>
            <Heading as='h2' size='xl' style={{marginLeft:'25px', width:'650px'}}>
                {props.name} 
            </Heading>
            </Row>
            <Row>
                <Link href={props.homepage}  isExternal className='link'>
                    前往官网<ExternalLinkIcon mx='2px' />
                </Link>
            </Row>
            <Row className='index'>
                <Col span={8}>
                    <Heading as='h3' size='lg' className='index-data'>{props.work} </Heading>
                    <Text fontSize='xl' className='index-name'>论文</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' size='lg' className='index-data'>{props.cite} </Heading>
                    <Text fontSize='xl' className='index-name'>引用</Text>
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
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='keywords'>
            <Row>
                <KeyOutlined style={{ fontSize: '30px', color: '#422afb'}}></KeyOutlined>
                <Heading  style={{marginLeft:'15px', marginBottom:'15px', fontSize:'24px'}}>领 域</Heading>
            </Row>
            <Row style={{marginTop:'10px'}}>
                <Col span={17}>
                    <Text color='#A0AEC0' mb='10px' fontWeight={'600'} fontSize={'17px'}>名 称</Text>
                    <Divider style={{margin:3}}/>
                    {props.Cname.map((item, index) => (
                        <Row  key={index} style={{height:'45px'}} >
                            <Text fontSize='lg' className='keywordItem'>{item}</Text>
                        </Row>
                    ))}
                </Col>
                <Col span={7}>
                    <Text color='#A0AEC0' mb='10px' fontWeight={'800'} fontSize={'17px'}>相 关 度</Text>
                    <Divider style={{margin:5}} />
                    {props.Vconceptscores.map((item, index) => (
                        <Row  key={index} style={{height:'45px'}} >
                            <Heading style={{margin:'12px 0'}}  as='h6' size='xs'>{item}</Heading>
                            <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            ml='0'
                            borderRadius='10px'
                            w='90px'
                            value={item}/>

                        </Row>
                    ))}
                </Col>
            </Row>
        </Box>
    )
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
            data: [1,2,3,4,5]
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
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
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
                <Avatar name={record.Iname} src={record.Iimage} />
            ),
            width: 100,
        },{
            title: '',
            dataIndex: 'Iname',
            key: 'Iname',
            ...getColumnSearchProps('Iname'),
            sorter: (a, b) => a.Iname.localeCompare(b.Iname),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Link href='/institute' isExternal>
                    {record.Iname} <ExternalLinkIcon mx='2px' />
                </Link>
            ),
            ellipsis: true,
            width: 400
        },{
            title: '国家',
            dataIndex: 'Icountry',
            key: 'Icountry',
            ...getColumnSearchProps('Icountry'),
            sorter: (a, b) => a.Icountry.localeCompare(b.Icountry),
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

function Journal({}) {
    const [data,setData] = React.useState({
        Vfullname:'',
        Vworkscount:'',
        Vcitecount:'',
        Vhomepage:'',
        Cname:[],
        Vconceptscores:[],
        VworksCount:[]
    });
    React.useEffect(() => {
        var config = {
            method: 'post',
            url: 'https://mock.apifox.cn/m1/1955876-0-default/venue',
            headers: { 
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)', 
                'Content-Type': 'application/json'
            },
            data : '0'
        };
        axios(config).then(res => {
            console.log(res.data)
            setData(res.data)
        })

    },[])
    return(
        <html className='journal'>
            <Row>
                <Col span={14}>
                    <Title name={data.Vfullname} cite={data.Vcitecount}
                        work={data.Vworkscount} homepage={data.Vhomepage}></Title>
                </Col>
                <Col span={10}>
                    <Keywords Cname={data.Cname} Vconceptscores={data.Vconceptscores}></Keywords>
                </Col>
            </Row>
            <Row>
                <Col span={5} style={{marginLeft:'80px'}} >
                    <PaperAmount count={data.Vworksyear}></PaperAmount>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <CitationAmount count={data.Vcitesyear}></CitationAmount>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <PaperAmountAcc count={data.VworksAccumulate}></PaperAmountAcc>
                </Col>
                <Col span={5} style={{marginLeft:'50px'}}>
                    <CitationAmountAcc count={data.VcitesAccumulate}></CitationAmountAcc>
                </Col>
            </Row>
            <InstitutionList ></InstitutionList>
        </html>
    )
}

export default Journal;