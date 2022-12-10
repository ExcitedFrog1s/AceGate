import Highlighter from 'react-highlight-words'
import { SearchIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Space, Table, Input } from 'antd';
import { Avatar } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';

function List() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    let location = useLocation();
    const toPortal = (rid)=>{
      let params = new URLSearchParams(location.search);
      params.set('RID', rid);
      wait(2)
      navigate('/scholarPortal?' + params.toString())
    }
    const getData = ()=>{
      axios({
        method: "post",
        url:"https://mock.apifox.cn/m1/1955876-0-default/institute/scholarlist"
      })
      .then(res => {
          console.log(res.data)
          setData(res.data)
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
          <Button type='primary'
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="small"
              style={{height:30}} 
            >
              <SearchIcon />
            </Button>
          </Col>
          <Col span={3}>
          <Button type='primary'
              onClick={() => clearFilters && handleReset(clearFilters, dataIndex, confirm)}
              size="small"
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
          <Avatar name={record.Rname} src={record.RImage} />
        ),
        width: 30
      },
      {
        title: '姓名',
        dataIndex: 'Rname',
        key: 'Rname',
        ...getColumnSearchProps('Rname'),
        sorter: (a, b) => a.Rname.localeCompare(b.Rname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '联系方式',
        dataIndex: 'Rcontact',
        key: 'Rcontact',
        ...getColumnSearchProps('Rcontact'),
      },
      {
        title: '被引次数',
        dataIndex: 'Rcitescount',
        key: 'Rcitescount',
        ...getColumnSearchProps('Rcitescount'),
        sorter: (a, b) => a.Rcitescount - b.Rcitescount,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发表论文数',
        dataIndex: 'Rworkscount',
        key: 'Rworkscount',
        sorter: (a, b) => a.Rworkscount - b.Rworkscount,
        sortDirections: ['descend', 'ascend'],
      },
      {
          title: '研究领域',
          dataIndex: 'Rconcepts',
          key: 'Rconcepts',
          ...getColumnSearchProps('Rconcepts'),
          sorter: (a, b) => a.Rconcepts.localeCompare(b.Rconcepts),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type='primary' onClick={()=>toPortal(record.RID)}>跳转学者门户</Button>
          </Space>
        ),
      },
    ];
      return (
          <div className="list" style={{marginTop:30}}>
              <Table dataSource={data} columns={columns} rowKey="RID"
            pagination={{
              pageSize: 8,
            }}
          ></Table>
          </div> 
      )
  }

export default List;