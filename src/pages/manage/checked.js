/**
 * 后台管理/入驻学者
 */
import "./checked.css"
import { Col, Row, Space, Table, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { Button, Avatar } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Highlighter from 'react-highlight-words'

const data = [
    {
      key: '1',
      name: 'John Brown',
      email: 'sc45j@163.com',
      agency: 'New York No. 1 Lake Park',
      papers: 12,
      time: "2022/10/16", 
      picUrl: 'https://bit.ly/dan-abramov'
    },
    {
      key: '2',
      name: 'AAA Brown',
      email: '13256@qq.com',
      agency: 'New York No. 1 Lake Park',
      papers: 8,
      time: "2022/11/16"
    },
    {
      key: '3',
      name: 'John joks',
      email: 'hgihho@buaa.com',
      agency: 'New York No. 1 Lake Park',
      papers: 1,
      time: "2022/12/16"
    },{
      key: '4',
      name: 'John Brown',
      email: 'sc45j@163.com',
      agency: 'New York No. 1 Lake Park',
      papers: 12,
      time: "2022/10/16", 
      picUrl: 'https://bit.ly/dan-abramov'
    },
    {
      key: '5',
      name: 'AAA Brown',
      email: '13256@qq.com',
      agency: 'New York No. 1 Lake Park',
      papers: 8,
      time: "2022/11/16"
    },
    {
      key: '6',
      name: 'hah mic',
      email: 'hgihho@buaa.com',
      agency: 'New York No. 1 Lake Park',
      papers: 1,
      time: "2022/12/16"
    },
    {
      key: '7',
      name: 'nkkj hk joks',
      email: 'hgihho@buaa.com',
      agency: 'New York No. 1 Lake Park',
      papers: 1,
      time: "2022/12/16"
    },
    {
      key: '8',
      name: 'AA joks',
      email: 'hgihho@buaa.com',
      agency: 'New York No. 1 Lake Park',
      papers: 1,
      time: "2022/12/16"
    },
    {
      key: '9',
      name: 'cos',
      email: 'hgihho@buaa.com',
      agency: 'New York No. 1 Lake Park',
      papers: 1,
      time: "2022/12/16"
    }

];


function List() {
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
            size="xs" colorScheme='blue'
            style={{marginTop:3}}
          >
            <SearchIcon />
          </Button>
        </Col>
        <Col span={3}>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
            size="xs" colorScheme='blue'
            style={{marginTop:3}} 
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
      dataIndex: 'picUrl',
      key: 'picUrl',
      render: (_, record) => (
        <Avatar name={record.name} src={record.picUrl} />
      ),
      width: 30
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '联系方式',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: '所属机构',
      dataIndex: 'agency',
      key: 'agency',
      ...getColumnSearchProps('agency'),
      sorter: (a, b) => a.agency.localeCompare(b.agency),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '已发表论文数',
      dataIndex: 'papers',
      key: 'papers',
      sorter: (a, b) => a.papers - b.papers,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: '入驻时间',
        dataIndex: 'time',
        key: 'time',
        ...getColumnSearchProps('time'),
        sorter: (a, b) => a.time.localeCompare(b.time),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="xs" colorScheme='blue'>详情</Button>
        </Space>
      ),
    },
  ];
    return (
        <div>
          <div className="sum">
                <span className="text">当前入驻学者共</span>
                <span className="number">{data.length}</span>
                <span className="text">位</span>
            </div>
            <Table dataSource={data} columns={columns}
          pagination={{
            pageSize: 8,
          }}
        ></Table>
        </div> 
    )
}

function Checked(){
    return (
        <div className="checked">
            <List />
        </div>
    )
}
export default Checked;