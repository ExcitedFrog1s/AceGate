import Highlighter from 'react-highlight-words'
import { SearchIcon } from '@chakra-ui/icons'
import { Box} from '@chakra-ui/react'
import './scholarlist.css'
import { IoSchoolSharp} from "react-icons/io5"
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Space, Table, Input } from 'antd';
import { Avatar, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';
import { Heading } from '@chakra-ui/react'

function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function List() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    let location = useLocation();
    let params = new URLSearchParams(location.search)
    var IID;
    if(params.has('IID')){
        IID = params.get('IID')
    }
    console.log('IID:' + IID)
    const toPortal = (rid)=>{
      let params = new URLSearchParams(location.search);
      params.set('RID', rid);
      wait(2)
      navigate('/scholarPortal?' + params.toString())
    }
    const getData = ()=>{
      axios({
        method: "post",
        url:"/institute/scholarlist",
        data: {
          IID: IID
        },
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res => {
          console.log(res.data)
          setData(res.data.data)
        }
      )
    }
    useEffect(() =>{
      getData()
    }, [])
    
    
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
            ref={searchInput}
            placeholder={`请输入关键词`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          />
          </Col>
          <Col span={3}>
          <Button colorScheme={'frog'}
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="xs"
              style={{height:30}} 
            >
              <SearchIcon />
            </Button>
          </Col>
          <Col span={3}>
          <Button colorScheme={'frog'}
              onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
              size="xs"
              style={{height:30}} 
            >
              重置
            </Button>
          </Col>
          </Row>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchIcon
          style={{
            color: filtered ? '#1890ff' : undefined,
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
      
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
      {
        title: '',
        dataIndex: 'RImage',
        key: 'RImage',
        render: (_, record) => (
          <Avatar name={record.rname} src={record.RImage} bg="rgb(230,235,247)" />
        ),
        width: 80
      },
      {
        title: '姓名',
        dataIndex: 'rname',
        key: 'rname',
        ...getColumnSearchProps('rname'),
        sorter: (a, b) => a.rname.localeCompare(b.rname),
        sortDirections: ['descend', 'ascend'],
        render: (_, record) => (
          <Text fontWeight="bold" color="#4A5568">{record.rname}</Text>
        ),
      },
      {
        title: '联系方式',
        key: 'rcontact',
        ...getColumnSearchProps('rcontact'),
        width: 200,
        render: (_, record) => (
          <Text fontWeight="bold" color="#4A5568">{record.rcontact}</Text>
        ),
      },
      {
        title: '发表论文数',
        key: 'rworkscount',
        sorter: (a, b) => a.rworkscount - b.rworkscount,
        sortDirections: ['descend', 'ascend'],
        render: (_, record) => (
          <Text fontWeight="bold" color="#4A5568">{separator(record.rworkscount)}</Text>
        ),
        width: 120
      },
      {
        title: '被引次数',
        key: 'rcitescount',
        ...getColumnSearchProps('rcitescount'),
        sorter: (a, b) => a.rcitescount - b.rcitescount,
        sortDirections: ['descend', 'ascend'],
        render: (_, record) => (
          <Text fontWeight="bold" color="#4A5568">{separator(record.rcitescount)}</Text>
        ),
        width: 120
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button colorScheme="frog" size="sm" onClick={()=>toPortal(record.rID)}>前往门户</Button>
          </Space>
        ),
        width: 120
      },
    ];
      return (
          <div className="ischolarlist" >
            <Box boxShadow="4px 4px 15px 0 rgba(0,0,0,0.1)" rounded='md' backgroundColor="#ffffff"
        borderRadius='20px' paddingTop={30}
        className='box'
        >
          <Row>
            <IoSchoolSharp className="chart-icon"/>
            <Heading className='chart-head'>机构下部分学者</Heading>
            </Row>
                <Table dataSource={data} columns={columns} rowKey="rID"
              pagination={false} scroll={{
                y: 400,
              }} className="table"
              ></Table>
            </Box>
          </div> 
      )
  }

export default List;