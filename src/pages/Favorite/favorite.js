import {Row,Col, Menu} from 'antd'
import * as React from "react";
import axios from "axios";
import MyHeader from '../../components/header/header'
import { Layout,message } from 'antd';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'

import './favorite.css';
import { useRef, useState } from 'react';
import {FolderOpenOutlined  ,StarFilled ,RedoOutlined} from '@ant-design/icons';
import {Table} from 'antd';
import {Divider} from 'antd'
import { IconButton, Alert, AlertIcon} from '@chakra-ui/react'
import {HStack,Tag, TagLabel,Image, Tooltip} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import {Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import {Heading, Text} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import {Icon, SearchIcon, AddIcon} from '@chakra-ui/icons'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Chart from 'react-apexcharts'
import { useToast } from '@chakra-ui/react'
const { Header, Footer, Sider, Content } = Layout;


function PaperList(props){
    React.useEffect(() => {
        if(props.isLoading == 0){
            var x = props.list
            var max= 0
            console.log(props.list)
            x.forEach((item, index)=>{
                item.author = item.pauthorname[0]
                item.field = item.pconcepts[0]
                item.pdate = new Date(item.pdate).getFullYear()+'-'+ new Date(item.pdate).getMonth()+'-'+new Date(item.pdate).getDay()
                if(item.pcite > max){
                    max = item.pcite
                }
            });
            x.forEach((item)=>{
                item.max_cite = max
            });
            setData(x)
        }
    },[props])
        
    const [data, setData]=React.useState();

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
            width: 72
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
            width: 280
        },{
            title: '第一作者',
            dataIndex: 'author',
            key: 'author',
            ...getColumnSearchProps('author'),
            sorter: (a, b) => a.author.localeCompare(b.author),
            sortDirections: ['descend', 'ascend'],
            width: 150,
        },{
            title: '发表时间',
            dataIndex: 'pdate',
            key: 'pdate',
            sorter: (a, b) => a.pdate.localeCompare(b.pdate),
            sortDirections: ['descend', 'ascend'],
            width: 120
        },{
            title: '领域',
            dataIndex: 'field',
            key: 'field',
            render: (_,record) => (
                <HStack spacing={4}>
                    <Tooltip label={record.field} aria-label='A tooltip'>
                    <Tag size='md'  variant='subtle' bg='navy.200' color='white'>
                    <TagLabel>{record.field}</TagLabel>
                    </Tag>
                    </Tooltip>
                    
                </HStack>
            ),
            width: 130
        },{
            title: '引用量',
            dataIndex: 'pcite',
            key: 'pcite',
            sorter: (a, b) => a.pcite - b.pcite,
            sortDirections: ['descend', 'ascend'],
            width: 160,
            render:(_,record) =>(
                <Row>
                        <Text>{record.pcite}</Text>
                        <Progress
                            style={{margin:'auto'}}
                            colorScheme='frog'
                            h='7px'
                            borderRadius='10px'
                            w='70px'
                            value={100 * record.pcite / record.max_cite}/>
                </Row>
            )
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width:110,
            render:(_,record) =>(
                <Button leftIcon={<StarFilled />} variant='solid' size='xs' colorScheme='frog'>
                    取消收藏
                </Button>
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
        colors:['#90cdf4'],
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: '引用量',
          align: 'left'
        },
        xaxis: {
            categories: [2017,2018,2019,2020,2021]
        },
    }
    return(
        <Box  rounded='md' bg='white' mt='30px'
            box-shadow='4px 4px 15px 0 rgba(0,0,0,0.1)'
            borderRadius='20px' 
            >
            <Row >
                <StarFilled style={{ fontSize: '28px', color: '#422afb', marginTop:'20px',marginLeft:'20px'}}></StarFilled>
                <Text className='paperlist-Title'>我的收藏</Text>
            </Row>
            {/* <Text mt='20px' ml='20px' color='gray.500' fontSize='md'>共有 {data.length} 篇论文</Text> */}
            <Table dataSource={data} columns={columns} 
                    pagination={{
                        onChange: page => setCurrent(page)
                    }}
                    className='paperlist'
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
                                                <Text fontSize='sm' mr='25px' mt='5px' color='blue.200'>{value}</Text>
                                            );})
                                    }
                                    </Row>
                                    <Text fontSize='xs' color='gray.400' className='expand' mt='3px' noOfLines={8}>{record.pabstract}</Text>
                                    <Row>
                                    {
                                        record.pconcepts.map((value, key) => (
                                                key<8? (
                                                    <Tag size='sm' mt='3px' variant='subtle' bg='navy.200' color='white' mr='20px'>
                                                    <TagLabel>{value}</TagLabel>
                                                </Tag>
                                                ):(<p></p>)
                                        ))
                                    }
                                    </Row>
                                </Col>
                                <Col span={5} style={{marginLeft:'20px'}}>
                                <Chart options={options} 
                                    series={[{data:record.pcitednum}]} 
                                    type="area" height={250} />
                                </Col>
                            </Row>
                        ),
                    }}>
            </Table>
        </Box>
    )
}



function Favorite(){
    const [names, setNames] = React.useState([]);
    const [papers, setPapers] = React.useState([{list:[{}]}]);
    const [ids, setIds] = React.useState([]);
    const [items, setItems] = React.useState([])
    const [show, setShow] = React.useState(0)
    const [isLoading, setIsLoading] =React.useState(1)
    const [newName, setNewName] = React.useState('')
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()


    React.useEffect(() => {
        var config = {
            method: 'post',
            url: '/user/viewCollectPaper',
            headers: { 
                token: localStorage.getItem("userToken")
            }
        };
        axios(config)
            .then(res => {
            console.log(res.data.data);
            var x = []
            res.data.data.forEach((item, index)=>{
               x.push({label:item.name, key:item.id, icon: <FolderOpenOutlined />,})
            });
            setPapers(res.data.data)
            setItems(x)
            setIsLoading(0)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    },[])

    const onClick = (e) => {
        console.log('click ', e.key);
        setShow(e.key)
      };

    const add =() => {
        if(newName == ''){
            toast({
                title: '收藏夹名不能为空',
                status: 'error',
                isClosable: true,
                position:'top'
              })
              return
        }
        const formData = new FormData()
            formData.append('CTname', newName)
            let UID = window.localStorage.getItem('userToken')
            axios.post("/user/AddCollect",formData,{
                headers:{
                    'token':UID
                }
            })
            .then(function (res){
                console.log(res)
                if(res.status !== 200){
                   
                }
                else{
                    setNewName('')
                    onClose();
                    message.success('新建成功')
                }
            })
            
    }

    return (
        <Box className='collect'>
        <MyHeader></MyHeader>
        <Layout>
            <Sider>
                <Row>
                    <Col>
                        <Text mt = '15px' ml='15px' fontWeight='550' fontSize='md'>收藏夹</Text>
                    </Col>
                    <Col offset='12'>
                        <IconButton aria-label='Search database' icon={<AddIcon />} size='sm' mt='10px'
                        onClick={onOpen}/>
                    </Col>
                </Row>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>新建收藏夹</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input placeholder='收藏夹名字'
                            value={newName}
                            onChange={(e) => {setNewName(e.target.value)}} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={add}>
                        确认
                        </Button>
                        <Button onClick={onClose}>取消</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                <Menu
                    style={{marginTop:'8px'}}
                    onClick={onClick}
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    >
                    {items.map((item, index) => (
                        <Menu.Item key={index}> {item.label} </Menu.Item>
                     ))}
                </Menu>
            </Sider>
            <Content style={{backgroundColor:'rgb(230,235,247)' ,height:'100vh',padding:'30px'}}>
                <PaperList list={papers[show].list} isLoading={isLoading} ></PaperList>
            </Content>
        </Layout>
            

        </Box>

    )
}




export default Favorite;
