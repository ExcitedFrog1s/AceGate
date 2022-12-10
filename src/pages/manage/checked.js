/**
 * 后台管理/入驻学者
 */
import "./checked.css"
import { Card, Col, Row, Space, Table, Input, Modal, Form, Button, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Highlighter from 'react-highlight-words'
import axios from 'axios';

function List() {
  const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const toast = useToast();
    useEffect(() => {
      const getData = ()=>{
        axios({
          method: "post",
          url:"https://mock.apifox.cn/m1/1955876-0-default/manage/checkedlist"
        })
        .then(res => {
            console.log(res.data)
            setData(res.data)
          }
        )
      }
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
    const Detail = (props) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      return(
        <><Button onClick={showModal} type='primary'>详情</Button>
        <Modal open={isModalOpen} className="modal" footer={null}
        title='认领详情' width={900} onCancel={handleCancel}>
          <div className='detailForm'>
          <Row>
            <Col span={12}>
              <Card title="认领者信息" style={{width:400}}>
                <Form labelCol={{span:8}}>
                  <Form.Item label='申请者用户名'>
                    <div>{props.A.AA_Uname}</div>
                  </Form.Item>
                  <Form.Item label='入驻申请类型'>
                    {props.A.AAtype == 1 && <div>认领学者门户</div> || props.A.AAtype == 2 && <div>新建学者门户</div>}
                  </Form.Item>
                  <Form.Item label='申请者联系方式'>
                    <div>{props.A.AAemail}</div>
                  </Form.Item>
                  <Form.Item label='申请者个人简介'>
                    <div>{props.A.AAintroduction}</div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="学者信息" style={{width:400}}>
                <Form labelCol={{span:8}}>
                  <Form.Item label='学者姓名'>
                    <div>{props.A.AAname}</div>
                  </Form.Item>
                  <Form.Item label='研究领域'>
                    <div>{props.A.AAinterestedareas}</div>
                  </Form.Item>
                  <Form.Item label='所属机构'>
                    <div>{props.A.AAinstitution}</div>
                  </Form.Item>
                  <Form.Item label='个人主页链接'>
                    <div>{props.A.AAhomepage}</div>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            </Row>
            <Row>
              <Card title="审核结果" style={{width:850}}>
                <Form>
                  <Form.Item label="结果">
                    {props.A.AAccept == 1 && <Tag color='green'>通过</Tag> || props.A.AAccept == 2 && <Tag color='red'>拒绝</Tag>}
                  </Form.Item>
                  <Form.Item label="说明">
                    {props.A.AOpinion}
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          </div>
        </Modal>
        </>
      )
    }

    const columns = [
      {
        title: '申请者用户名',
        dataIndex: 'AA_Uname',
        key: 'AA_Uname',
        ...getColumnSearchProps('AA_Uname'),
        sorter: (a, b) => a.AA_Uname.localeCompare(b.AA_Uname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '学者姓名',
        dataIndex: 'AAname',
        key: 'AAname',
        ...getColumnSearchProps('AAname'),
        sorter: (a, b) => a.AAname.localeCompare(b.AAname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '申请类型',
        dataIndex: 'AAtype',
        key: 'AAtype',
        render: (_, record)=>(
          record.AAtype == 1 && <Tag color='purple'>认领</Tag> || record.AAtype == 2 && <Tag color='blue'>新建</Tag>
        )
      },
      {
        title: '联系方式',
        dataIndex: 'AAemail',
        key: 'AAemail',
        ...getColumnSearchProps('AAemail'),
      },
      {
          title: '审核时间',
          dataIndex: 'AAtime',
          key: 'AAtime',
          ...getColumnSearchProps('AAtime'),
          sorter: (a, b) => a.AAtime.localeCompare(b.AAtime),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '审核结果',
        dataIndex: 'AAccept',
        key: 'AAccept',
        render: (_, record)=>(
          record.AAccept == 1 && <Tag color='green'>通过</Tag> || record.AAccept == 2 && <Tag color='red'>拒绝</Tag>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Detail A={record} />
        ),
      },
    ];


    return (
        <div>
          <div className='count'>未审核申请共{data.length}条</div>
          <Table dataSource={data} columns={columns} rowKey="AAID"
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