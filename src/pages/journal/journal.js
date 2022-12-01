import * as React from 'react'
import { useRef, useState } from 'react';
import Chart from 'react-apexcharts'


import {ProjectOutlined, BarsOutlined, BarChartOutlined, KeyOutlined, RedoOutlined} from '@ant-design/icons';
import { Col, Row } from 'antd';
import {Table} from 'antd';

import { Progress } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import {List,ListItem,ListIcon} from '@chakra-ui/react'
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


function Title({}) {
    return(
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='title'>
            <Row>
            <ProjectOutlined style={{ fontSize: '42px', color: '#422afb'}}></ProjectOutlined>
            <Heading as='h2' size='xl' style={{marginLeft:'25px', width:'650px'}}>
                IEEE Transactions on Information Forensics and Security 
            </Heading>
            </Row>
            <Row>
                <Link href='/' isExternal className='link'>
                    前往官网<ExternalLinkIcon mx='2px' />
                </Link>
            </Row>
            <Row className='index'>
                <Col span={8}>
                    <Heading as='h3' size='lg' className='index-data'>3,369</Heading>
                    <Text fontSize='xl' className='index-name'>Papers</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' size='lg' className='index-data'>115,988</Heading>
                    <Text fontSize='xl' className='index-name'>Citations</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' size='lg' className='index-data'>143</Heading>
                    <Text fontSize='xl' className='index-name'>H-index</Text>
                </Col>
            </Row>
        </Box>
    )
}

function Keywords({}) {
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
                <Heading  style={{marginLeft:'15px', marginBottom:'15px', fontSize:'25px'}}>Keywords </Heading>
            </Row>
            <List spacing={3}>
                <ListItem>
                    <Row>
                        <ListIcon as={CircleIcon} color='frog.500' />
                        <Text fontSize='xl' className='keywordItem'>Computer network</Text>
                    </Row>
                </ListItem>
                <ListItem>
                    <Row>
                        <ListIcon as={CircleIcon} color='frog.500' />
                        <Text fontSize='xl' className='keywordItem'>Theoretical computer science</Text>
                    </Row>
                </ListItem>
                <ListItem>
                    <Row>
                        <ListIcon as={CircleIcon} color='frog.500' />
                        <Text fontSize='xl' className='keywordItem'>Pattern recognition</Text>
                    </Row>
                </ListItem>
            </List>
        </Box>
    )
}

function HIndex({}) {
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2012,'',2014,'',2016,'',2018,'',2020,'']
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
            name: "H-index",
            data: [47,53,63,74,84,96,107,122,135,143]
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>H-index Statistics</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}    
function PaperAmount({}) {
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2012,'',2014,'',2016,'',2018,'',2020,'']
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
            name: "Paper Amount",
            data: [205,218,250,225,291,339,261,472,261,234]
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>Paper Amount Statistics</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}    
function CitationAmount({}) {
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2012,'',2014,'',2016,'',2018,'',2020,'']
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
            name: "New Citation Amount",
            data: [3292,4260,6569,7950,9458,12023,14683,18090,18722,13111]
        }]
    );
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='chart'>
            <Row>
                <BarChartOutlined className='chart-icon'  />
                <Heading className='chart-head'>New Citation Amount Statistics</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}    

function InstitutionList({}) {
    const max_count = 7026;
    const max_citation = 737;
    const max_hindex = 12;
    const data = [
        {
          name: 'Chinese Academy of Sciences',
          country: 'china',
          count: '7026',
          citation: '737',
          h_index: '4',
          link:'/',
          picUrl: 'https://bit.ly/dan-abramov',
        },
        {
            name: 'Nanyang Technological University',
            country: 'Australia',
            count: '3428',
            citation: '719',
            h_index: '12',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
        {
            name: 'Peking University',
            country: 'Germany',
            count: '3369',
            citation: '364',
            h_index: '2',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },{
            name: 'New York University',
            country: 'china',
            count: '1682',
            citation: '267',
            h_index: '5',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
        {
            name: 'Tsinghua University',
            country: 'Australia',
            count: '690',
            citation: '101',
            h_index: '12',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
        {
            name: 'Purdue University',
            country: 'Canada',
            count: '2287',
            citation: '85',
            h_index: "6",
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
        {
            name: 'Katholieke Universiteit Leuven',
            country: 'Germany',
            count: '1357',
            citation: '33',
            h_index: '3',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
        {
            name: 'Massachusetts Institute of Technology',
            country: 'Canada',
            count: '2736',
            citation: '21',
            h_index: '1',
            link:'/',
            picUrl: 'https://bit.ly/dan-abramov'
        },
    
    ];
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
            title: 'name',
            dataIndex: 'picUrl',
            key: 'picUrl',
            render: (_, record) => (
                <Avatar name={record.name} src={record.picUrl} />
            ),
            width: 100,
        },{
            title: '',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <Link href={record.link} isExternal>
                    {record.name} <ExternalLinkIcon mx='2px' />
                </Link>
            ),
            ellipsis: true,
            width: 400
        },{
            title: 'country',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
            sorter: (a, b) => a.country.localeCompare(b.country),
            sortDirections: ['descend', 'ascend'],
            width: 200
        },{
            title: 'paper count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count-b.count,
            sortDirections: ['descend', 'ascend'],
            width: 210,
            render:(_,record) =>(
                <Row>
                        <Text>{record.count}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='70px'
                            value={record.count/max_count*100}/>
                </Row>
            ),
        },{
            title: 'citation',
            dataIndex: 'citation',
            key: 'citation',
            sorter: (a, b) => a.citation - b.citation,
            sortDirections: ['descend', 'ascend'],
            width: 210,
            render:(_,record) =>(
                <Row>
                        <Text>{record.citation}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='70px'
                            value={record.citation/max_citation*100}/>
                </Row>
            )
        },{
            title: 'H-index',
            dataIndex: 'h_index',
            key: 'h_index',
            sorter: (a, b) => a.h_index - b.h_index,
            sortDirections: ['descend', 'ascend'],
            width: 210,
            render:(_,record) =>(
                <Row>
                        <Text>{record.h_index}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='70px'
                            value={record.h_index/max_hindex*100}/>
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
                <Heading  as='h3' size='lg' style={{marginLeft:'20px'}}>Institution List</Heading>
            </Row>
            <Table dataSource={data} columns={columns} pagination={false} className='institutionList'>
            </Table>
        </Box>
    )
}    

function Journal({}) {
    return(
        <html >
            <Row>
                <Col span={16}>
                    <Title ></Title>
                </Col>
                <Col span={8}>
                    <Keywords></Keywords>
                </Col>
            </Row>
            <Row>
                <Col span={7} style={{marginLeft:'80px'}}>
                    <HIndex></HIndex>
                </Col>
                <Col span={7} style={{marginLeft:'50px'}}>
                    <PaperAmount></PaperAmount>
                </Col>
                <Col span={7} style={{marginLeft:'50px'}}>
                    <CitationAmount></CitationAmount>
                </Col>
                
            </Row>
            <InstitutionList></InstitutionList>
        </html>
    )
}

export default Journal;