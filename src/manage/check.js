/**
 * 后台管理/审核认领
 */
import { Col, Row, Space, Table, Input, Modal, Form } from 'antd';
import React, { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Highlighter from 'react-highlight-words'
import "./check.css"

var data = [{
      key: '1',
      name: 'doodioi',
      email: '1963213@163ggj.com',
      agency: 'BeiHang University',
      time: '2002/10/11'
    }, 
    {
      key: '3',
      name: 'Syihkncs Y',
      email: '1963213@gsddj.com',
      agency: 'BeiHang University',
      time: '2002/10/11'
    }, 
    {
      key: '14',
      name: 'HFJ OJ',
      email: 'sc@ggj.com',
      agency: 'BeiHang University',
      time: '2002/10/11'
    }, 
    {
      key: '5',
      name: 'DEH HKH',
      email: '1963213@ggj.com',
      agency: 'BeiHang University',
      time: '2002/10/11'
    }
]

function CheckList() {
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    // const [loading, setLoading] = useState(false);
    
    // const start = () => {
    //   setLoading(true);
    //   // ajax request after empty completing
    //   setTimeout(() => {
    //     setSelectedRowKeys([]);
    //     setLoading(false);
    //   }, 1000);
    // };
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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

    const Dialogue = (props) => {
      var text, color;
      const [content, setContent] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      //如果type == 1, 拒绝
      //如果type == 0, 通过
      if(props.type === 0){
        text = '通过';
        color = 'blue';
      }
      else{
        text = '拒绝';
        color = 'red';
      }
      return (
        <><Button size='xs' colorScheme={color} onClick={showModal}>
          {text}
        </Button>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
        title='审核意见' okText="确认" cancelText="取消">
          <Form>
            <Form.Item label={text+'说明'}>
              <Input.TextArea allowClear={true} value={content} onChange={(e) => setContent(e.target.value)}
               autoSize={{minRows: 5, maxRows: 8}} maxLength={300} >
              </Input.TextArea>
            </Form.Item>
          </Form>
        </Modal>
        </>
      )
    }
    const columns = [
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
          title: '申请时间',
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
            <Button size="xs" colorScheme='teal'>详情</Button>
            <Dialogue type={0}></Dialogue>
            <Dialogue type={1}></Dialogue>
          </Space>
        ),
      },
    ];
    return (
        <div>
          <Row gutter={25} style={{marginBottom:20}}>
            <Col>
              <div className='chosen'>已选中{hasSelected ? selectedRowKeys.length : 0}条数据</div>
            </Col>
            <Col> 
              <Button size='sm' colorScheme='blue' 
              disabled={!hasSelected}>
                一键通过
                </Button>
            </Col>
            <Col>
              <Button size='sm' colorScheme='red' 
              disabled={!hasSelected}>
                一键拒绝
              </Button>
            </Col>
          </Row>
          <Table dataSource={data} columns={columns} 
            rowSelection={rowSelection}
            pagination={{
                pageSize: 8,
            }}
          ></Table>
        </div> 
    )
}

/**
 * 通过/拒绝的弹窗，只接受type = 0 / 1, 0表示通过，1表示拒绝
 * @param {*} type 
 */


function Check(){
    return (
        <div className='check'>
            <CheckList />
        </div>
    )
}

export default Check;